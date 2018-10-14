import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';
import { default as ReactSelect } from 'react-select';

import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
import { FieldLine } from '../FieldLine';
import { BaseSelect } from './Select';
import { ISelectOption, ISelectOptions, ISelectProps } from './Select.types';

describe('<Select />', () => {
  interface ISetupArgs {
    props?: Partial<ISelectProps>;
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

    const wrapper = shallow((
      <BaseSelect
        label={fieldLabel}
        meta={meta}
        field={field}
        options={options}
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
    const { wrapper } = setup();

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    expect(wrapper.find(ReactSelect).exists()).toBeTruthy();
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
      expect(fieldValue.label).toBe('Two');
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
      const { wrapper, field, options } = setup();

      const changeProp = wrapper.find(ReactSelect).prop('onChange');
      changeProp(options[1]);

      expect(field.onChange).toHaveBeenCalledWith({
        target: {
          value: options[1],
        },
      });
    });

    it('should call field.onBlur when there is an input blur', () => {
      const { wrapper, field } = setup();

      const blurProp = wrapper.find(ReactSelect).prop('onBlur');
      blurProp();

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
  });

  it('should set the is-invalid css class to the ReactSelect component if meta.valid is false', () => {
    const { wrapper } = setup({
      metaOverrides: { valid: false },
    });
    expect(wrapper.find(ReactSelect).prop('className')).toBe('react-select-control is-invalid');
  });
});
