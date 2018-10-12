import React from 'react';
import { shallow } from 'enzyme';
import { Input as StrapInput } from 'reactstrap';

import { createMockFieldMeta, createMockField } from '../../test-utils/enzymeFormContext';
import { BaseInput } from './Input';
import { FieldLine } from '../FieldLine';

describe('<Input />', () => {
  const FIELD_ID = 'field0';
  const FIELD_NAME = 'field0';
  const FIELD_LABEL = 'field0';

  const meta = createMockFieldMeta();
  const field = createMockField();
  field.value = '';
  field.name = FIELD_NAME;

  const setup = props => shallow((
    <BaseInput
      label={FIELD_LABEL}
      meta={meta}
      field={field}
      {...props}
    />
  ));

  afterEach(() => {
    field.onChange.mockClear();
    field.onBlur.mockClear();
  });

  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a field line and a bootstrap input', () => {
    const wrapper = setup();

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    expect(wrapper.find('Input').exists()).toBeTruthy();
  });

  it('should render a text input by default', () => {
    const wrapper = setup();

    expect(wrapper.find('Input').prop('type')).toEqual('text');
  });

  it('should let the user override the input type', () => {
    const INPUT_TYPE = 'number';
    const wrapper = setup({ type: INPUT_TYPE });

    expect(wrapper.find('Input').prop('type')).toEqual(INPUT_TYPE);
  });

  it('should pass the meta props to the field line', () => {
    const wrapper = setup();

    expect(wrapper.find(FieldLine).prop('meta')).toEqual(meta);
  });

  it('should call field.onChange when the input changes', () => {
    const wrapper = setup();
    const event = { target: { name: FIELD_ID, value: 'test_value' } };

    wrapper.find('Input').simulate('change', event);
    expect(field.onChange).toHaveBeenCalledWith(event);
  });

  it('should call field.onBlur when there is an input blur', () => {
    const wrapper = setup();
    const event = { target: { name: FIELD_ID } };

    wrapper.find('Input').simulate('blur', event);
    expect(field.onBlur).toHaveBeenCalledWith(event);
  });

  it('should react on meta.plaintext correctly', () => {
    meta.plaintext = true;
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should react on meta.valid correctly', () => {
    meta.valid = false;
    const wrapper = setup();
    expect(wrapper.find(StrapInput).prop('invalid')).toBe(true);
  });
});
