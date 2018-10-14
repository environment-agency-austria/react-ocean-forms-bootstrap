import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';
import { Input as StrapInput } from 'reactstrap';

import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
import { FieldLine } from '../FieldLine';
import { BaseInput } from './Input';
import { IInputProps } from './Input.types';

describe('<Input />', () => {
  const fieldId = 'field0';

  interface ISetupArgs {
    props?: Partial<IInputProps>;
    fieldOverrides?: Partial<IFieldComponentFieldProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
    field: IFieldComponentFieldProps;
    meta: IFieldComponentMeta;
  }

  const setup = ({
    props,
    metaOverrides,
    fieldOverrides,
  }: ISetupArgs = {}): ISetupResult => {
    const fieldName = 'field0';
    const fieldLabel = 'field0';

    const meta = {
      ...createMockFieldMeta(),
      ...metaOverrides,
    };
    const field = {
      ...createMockField(),
      value: '',
      name: fieldName,
      ...fieldOverrides,
    };

    const wrapper = shallow((
      <BaseInput
        label={fieldLabel}
        meta={meta}
        field={field}
        {...props}
      />
    ));

    return {
      wrapper,
      field,
      meta,
    };
  };

  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a field line and a bootstrap input', () => {
    const { wrapper } = setup();

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    expect(wrapper.find('Input').exists()).toBeTruthy();
  });

  it('should render a text input by default', () => {
    const { wrapper } = setup();

    expect(wrapper.find('Input').prop('type')).toEqual('text');
  });

  it('should let the user override the input type', () => {
    const inputType = 'number';
    const { wrapper } = setup({ props: { type: inputType } });

    expect(wrapper.find('Input').prop('type')).toEqual(inputType);
  });

  it('should pass the meta props to the field line', () => {
    const { wrapper, meta } = setup();

    expect(wrapper.find(FieldLine).prop('meta')).toEqual(meta);
  });

  it('should call field.onChange when the input changes', () => {
    const { wrapper, field } = setup();
    const event = { target: { name: fieldId, value: 'test_value' } };

    wrapper.find('Input').simulate('change', event);
    expect(field.onChange).toHaveBeenCalledWith(event);
  });

  it('should call field.onBlur when there is an input blur', () => {
    const { wrapper, field } = setup();
    const event = { target: { name: fieldId } };

    wrapper.find('Input').simulate('blur', event);
    expect(field.onBlur).toHaveBeenCalledWith(event);
  });

  it('should react on meta.plaintext correctly', () => {
    const { wrapper } = setup({
      metaOverrides: { plaintext: true },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should react on meta.valid correctly', () => {
    const { wrapper } = setup({
      metaOverrides: {
        valid: false,
      },
    });
    expect(wrapper.find(StrapInput).prop('invalid')).toBe(true);
  });

  it('should throw an error if the field value is incompatible (not string, number or undefined)', () => {
    expect(() => {
      setup({ fieldOverrides: { value: true } });
    }).toThrowError();
  });
});
