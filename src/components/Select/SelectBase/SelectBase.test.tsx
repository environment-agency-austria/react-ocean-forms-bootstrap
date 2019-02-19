import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

import { createMockField, createMockFieldMeta } from '../../../test-utils/enzymeFormContext';
import { FieldLine } from '../../FieldLine';
import { ISelectOption, ISelectOptions } from '../SelectBase';
import { SelectBase } from './SelectBase';
import { IPreparedSelectProps, ISelectBaseProps } from './SelectBase.types';

describe('<SelectBase />', () => {
  interface ISetupArgs {
    props?: Partial<ISelectBaseProps>;
    fieldOverrides?: Partial<IFieldComponentFieldProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
    field: IFieldComponentFieldProps;
    meta: IFieldComponentMeta;
    options: ISelectOptions;
  }

  const setup = ({
    props,
    metaOverrides,
    fieldOverrides,
  }: ISetupArgs = {}): ISetupResult => {
    const fieldLabel = 'field0';
    const meta = {
      ...createMockFieldMeta(),
      ...metaOverrides,
    };
    const field = {
      ...createMockField(),
      value: '',
      ...fieldOverrides,
    };

    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ];

    const renderSelect = jest.fn((preparedProps: IPreparedSelectProps) => {
      return (
        <div>
          mock select with props
          {JSON.stringify(preparedProps)}
        </div>
      );
    });

    const wrapper = shallow((
      <SelectBase
        label={fieldLabel}
        meta={meta}
        field={field}
        options={options}
        renderSelect={renderSelect}
        {...props}
      />
    ));

    return {
      wrapper,
      field,
      meta,
      options,
    };
  };

  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a field line and a react-select', () => {
    const renderSelect = jest.fn();

    const { wrapper } = setup({
      props: {
        renderSelect,
      },
    });

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    // expect(wrapper.find(ReactSelect).exists()).toBeTruthy();
    expect(renderSelect).toBeCalled();
  });

  it('should pass the meta props to the field line', () => {
    const { wrapper, meta } = setup();

    expect(wrapper.find(FieldLine).prop('meta')).toEqual(meta);
  });

  describe('label edge case', () => {
    it('should update the label of the selected value if it does not match with the label of the item inside options', () => {
      const { field } = setup({
        fieldOverrides: { value: { value: 'two', label: '' } },
      });

      const fieldValue: ISelectOption = field.value as ISelectOption;
      expect(fieldValue.label).toBe('');
    });

    it('should update the label of the selected values if it does not match with the label of the item inside options', () => {
      const { field } = setup({
        props: { multi: true },
        fieldOverrides: { value: [{ value: 'two', label: '' }] },
      });

      const fieldValue: ISelectOptions = field.value as ISelectOptions;
      expect(fieldValue[0].label).toBe('');
    });

    it('should trigger the field.onChange event if the labels mismatch', () => {
      const { field } = setup({
        fieldOverrides: { value: { value: 'two', label: '' } },
      });

      expect(field.onChange).toHaveBeenCalledWith({
        target: {
          value: { value: 'two', label: 'Two' },
        },
      });
    });
  });

  describe('field events', () => {
    it('should call field.onChange when the input changes', () => {
      let changeProp: Function | undefined;
      const renderSelect = jest.fn().mockImplementation((props: IPreparedSelectProps) => {
        changeProp = props.onChange;
      });

      const { field, options } = setup({
        props: { renderSelect },
      });

      expect(changeProp).toBeDefined();
      changeProp && changeProp(options[1]);

      expect(field.onChange).toHaveBeenCalledWith({
        target: {
          value: options[1],
        },
      });
    });

    it('should call field.onChange when the input changes (multi=true)', () => {
      let changeProp: Function | undefined;
      const renderSelect = jest.fn().mockImplementation((props: IPreparedSelectProps) => {
        changeProp = props.onChange;
      });

      const { field, options } = setup({
        props: {
          renderSelect,
          multi: true,
        },
      });

      const selected = [options[0], options[1]];

      expect(changeProp).toBeDefined();
      changeProp && changeProp(selected);

      expect(field.onChange).toHaveBeenCalledWith({
        target: {
          value: selected,
        },
      });
    });

    it('should call field.onBlur when there is an input blur', () => {
      let blurProp: Function | undefined;
      const renderSelect = jest.fn().mockImplementation((props: IPreparedSelectProps) => {
        blurProp = props.onBlur;
      });

      const { field } = setup({
        props: { renderSelect },
      });

      expect(blurProp).toBeDefined();
      blurProp && blurProp();

      expect(field.onBlur).toHaveBeenCalledWith();
    });
  });

  describe('meta.plaintext', () => {
    it('should correctly react to meta.plaintext', () => {
      const { wrapper } = setup({
        metaOverrides: { plaintext: true },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should display the label property of the selected option in plaintext mode', () => {
      const { wrapper } = setup({
        metaOverrides: { plaintext: true },
        fieldOverrides: { value: { value: 'two', label: 'Two' } },
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('should display the label property of the selected option in plaintext mode (multi=true)', () => {
      const { wrapper } = setup({
        props: { multi: true },
        metaOverrides: { plaintext: true },
        fieldOverrides: { value: [
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ] },
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should set the is-invalid css class to the ReactSelect component if meta.valid is false', () => {
    let className: string | undefined;
    const renderSelect = jest.fn().mockImplementation((props: IPreparedSelectProps) => {
      className = props.className;
    });

    setup({
      metaOverrides: { valid: false },
      props: {
        renderSelect,
      },
    });

    expect(className).toBe('react-select-control is-invalid');
  });

  describe('handleChange', () => {
    it('render with handleChange and call handleChange method', () => {
      let changeProp: Function | undefined;
      const renderSelect = jest.fn().mockImplementation((props: IPreparedSelectProps) => {
        changeProp = props.onChange;
      });
      const handleChange = jest.fn();

      const { options } = setup({
        props: {
          renderSelect,
          handleChange,
        },
      });

      const selected = [options[0], options[1]];
      expect(changeProp).toBeDefined();
      changeProp && changeProp(selected);

      expect(handleChange).toBeDefined();
      expect(handleChange).toBeCalled();
    });
  });
});
