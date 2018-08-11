import React from 'react';
import { shallow } from 'enzyme';
import { FormText } from 'react-ocean-forms';

import { createMockFieldMeta, createMockField } from '../test-utils/enzymeFormContext';
import { BaseOnOffToggleButton } from '../OnOffToggleButton';

describe('<BaseOnOffToggleButton />', () => {
  const FIELD_LABEL = 'field0';

  const meta = createMockFieldMeta();
  const field = createMockField();

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

  it('should render the correct label in plaintext mode', () => {
    meta.plaintext = true;
    field.value = false;
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  const testButton = (value) => {
    describe(`${value} Button`, () => {
      const wrapper = setup();
      const buttonOn = wrapper.find(`#${field.id}-${value}`);

      it('should render labels for button', () => {
        expect(buttonOn.find(FormText).prop('text')).toBe(value);
      });

      it('should trigger onChange on click', () => {
        buttonOn.simulate('click');
        expect(field.onChange).toHaveBeenCalledWith({ target: { name: field.name, value: value === 'on' } });
      });
    });
  };

  testButton('on');

  testButton('off');
});
