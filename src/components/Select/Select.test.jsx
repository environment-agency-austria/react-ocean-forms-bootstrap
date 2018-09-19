import React from 'react';
import { shallow } from 'enzyme';

import mockEvent, { KEYCODE } from '../../test-utils/enzymeEventUtils';
import { createMockFieldMeta, createMockField } from '../../test-utils/enzymeFormContext';
import { Select } from './Select';
import { FieldLine } from '../FieldLine';

describe('<Select />', () => {
  const FIELD_LABEL = 'field0';

  const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ];
  const meta = createMockFieldMeta();
  const field = createMockField();
  field.value = '';

  const setup = props => shallow((
    <Select
      label={FIELD_LABEL}
      meta={meta}
      field={field}
      options={options}
      {...props}
    />
  ));

  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it.skip('should render a field line and a bootstrap input', () => {
    const wrapper = setup();

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    expect(wrapper.find('Select').exists()).toBeTruthy();
  });

  it('should pass the meta props to the field line', () => {
    const wrapper = setup();

    expect(wrapper.find(FieldLine).prop('meta')).toEqual(meta);
  });

  it.skip('should call field.onChange when the input changes', () => {
    const wrapper = setup();
    const event = { target: { name: field.id, value: options[0] } };

    // The react-select element doesn't support direct
    // simulate calls of change / blur types on itself.
    // As a workaround we simulate key presses.
    // https://stackoverflow.com/questions/41991077/testing-react-select-component/46201546#46201546
    const selectElement = wrapper.find('Select').dive().find('.Select-control');
    selectElement.simulate('keyDown', mockEvent({ keyCode: KEYCODE.DOWN_ARROW }));
    selectElement.simulate('keyDown', mockEvent({ keyCode: KEYCODE.ENTER }));

    expect(field.onChange).toHaveBeenCalledWith(event);
  });

  it.skip('should call field.onBlur when there is an input blur', () => {
    const wrapper = setup();
    const event = { target: { name: field.id } };

    const selectElement = wrapper.find('Select').dive().find('.Select-control');
    selectElement.focus();
    selectElement.simulate('keyDown', mockEvent({ keyCode: KEYCODE.DOWN_ARROW }));
    selectElement.simulate('keyDown', mockEvent({ keyCode: KEYCODE.TAB }));

    expect(field.onBlur).toHaveBeenCalledWith(event);
  });

  it('should correctly react to meta.plaintext', () => {
    meta.plaintext = true;
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
