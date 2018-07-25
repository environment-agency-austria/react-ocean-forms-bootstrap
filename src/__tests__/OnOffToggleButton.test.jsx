import React from 'react';
import { shallow } from 'enzyme';
import createMockFormatter from '../test-utils/createMockFormatter';

import { BaseOnOffToggleButton } from '../OnOffToggleButton';

describe('<BaseOnOffToggleButton />', () => {
  const FIELD_ID = 'field0';
  const FIELD_NAME = 'field0';
  const FIELD_LABEL = 'field0';

  const meta = {
    valid: true,
    error: undefined,
    isValidating: undefined,
    stringFormatter: createMockFormatter(),
    plaintext: false,
  };

  const field = {
    value: '',
    invalid: false,
    id: FIELD_ID,
    name: FIELD_NAME,
    disabled: false,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  const setup = props => shallow((
    <BaseOnOffToggleButton
      label={FIELD_LABEL}
      meta={meta}
      field={field}
      onLabel="on"
      offLabel="off"
      {...props}
    />
  ));

  it('should render without crashing', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render plaintext Button', () => {
    meta.plaintext = true;
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  const testButton = (value) => {
    describe(`${value} Button`, () => {
      const wrapper = setup();
      const buttonOn = wrapper.find(`#field0-${value}`).dive();

      it('should render labels for button', () => {
        expect(buttonOn.text()).toBe(value);
      });

      it('should trigger onChange on click', () => {
        buttonOn.simulate('click');
        expect(field.onChange).toHaveBeenCalledWith({ target: { name: FIELD_NAME, value: value === 'on' } });
      });
    });
  };

  testButton('on');

  testButton('off');
});
