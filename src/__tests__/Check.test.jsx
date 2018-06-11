import React from 'react';
import { shallow } from 'enzyme';

import createMockFormatter from '../test-utils/createMockFormatter';
import Check from '../Check';

describe('<Check />', () => {
  const FIELD_ID = 'field0';
  const FIELD_NAME = 'field0';
  const FIELD_LABEL = 'field0';

  const meta = {
    valid: true,
    error: undefined,
    isValidating: undefined,
    stringFormatter: createMockFormatter(),
  };
  const field = {
    value: true,
    invalid: false,
    id: FIELD_ID,
    name: FIELD_NAME,
    disabled: false,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  const setup = props => shallow((
    <Check
      label={FIELD_LABEL}
      meta={meta}
      field={field}
      {...props}
    />
  ));

  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call field.onChange when the input changes', () => {
    const wrapper = setup();
    const event = { target: { name: FIELD_ID, checked: false } };

    wrapper.find('Input').simulate('click', event);
    expect(field.onChange).toHaveBeenCalledWith({
      target: {
        name: FIELD_ID,
        value: false,
      },
    });
  });
});
