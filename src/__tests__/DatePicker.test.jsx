import React from 'react';
import Datetime from 'react-datetime';
import { shallow } from 'enzyme';

import createMockFormatter from '../test-utils/createMockFormatter';
import DatePicker from '../DatePicker';
import FieldLine from '../FieldLine';

describe('<DatePicker />', () => {
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
    value: '',
    invalid: false,
    id: FIELD_ID,
    name: FIELD_NAME,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  const setup = props => shallow((
    <DatePicker
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
    expect(wrapper.find(Datetime).exists()).toBeTruthy();
  });
});
