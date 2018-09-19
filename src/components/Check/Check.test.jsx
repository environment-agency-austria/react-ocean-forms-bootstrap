import React from 'react';
import { shallow } from 'enzyme';

import checkInfoToggling from '../../test-utils/checkInfoToggling';
import { createMockFieldMeta, createMockField } from '../../test-utils/enzymeFormContext';
import { Check } from './Check';

describe('<Check />', () => {
  const FIELD_LABEL = 'field0';

  const MOCK_META = createMockFieldMeta();
  const MOCK_FIELD = createMockField();

  const wrapper = shallow((
    <Check
      label={FIELD_LABEL}
      meta={MOCK_META}
      field={MOCK_FIELD}
    />
  ));

  it('should render correctly', () => {
    expect(wrapper.exists('Input')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call field.onChange when the input changes', () => {
    const event = { target: { name: MOCK_FIELD.name, checked: false } };

    wrapper.find('Input').simulate('click', event);
    expect(MOCK_FIELD.onChange).toHaveBeenCalledWith({
      target: {
        name: MOCK_FIELD.name,
        value: false,
      },
    });
  });

  checkInfoToggling(wrapper);

  it('should add the has-info class to InputGroup if info is present', () => {
    wrapper.setProps({ info: 'mock-info' });
    expect(wrapper.find('InputGroup').prop('className')).toEqual(expect.stringContaining('has-info'));
  });

  it('should not render the checkbox in plaintext mode', () => {
    MOCK_META.plaintext = true;
    wrapper.setProps({ meta: MOCK_META });
    expect(wrapper.exists('Input')).toBeFalsy();
  });
});
