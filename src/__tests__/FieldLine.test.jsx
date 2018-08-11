import React from 'react';
import { shallow } from 'enzyme';

import FieldLine from '../FieldLine';
import { createMockFieldMeta, createMockField } from '../test-utils/enzymeFormContext';

describe('<FieldLine />', () => {
  const MOCK_LABEL = 'label';
  const MOCK_META = createMockFieldMeta();
  const MOCK_FIELD = createMockField();
  const MOCK_CHILD = <div id="mock-child" />;

  const wrapper = shallow((
    <FieldLine
      label={MOCK_LABEL}
      meta={MOCK_META}
      field={MOCK_FIELD}
    >
      {MOCK_CHILD}
    </FieldLine>
  ));

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  const metaCases = [
    ['field is invalid', 'valid', false, 'is-invalid'],
    ['field is touched', 'touched', true, 'is-touched'],
  ];

  describe.each(metaCases)('%s', (name, prop, value, className) => {
    it(`should set the class ${className} to the FormGroup if meta.${prop} is ${value}`, () => {
      MOCK_META[prop] = value;
      wrapper.setProps({ meta: MOCK_META });
      expect(wrapper.find('FormGroup').prop('className')).toEqual(expect.stringContaining(className));
    });

    it(`should NOT set the class ${className} to the FormGroup if meta.${prop} is ${!value}`, () => {
      MOCK_META[prop] = !value;
      wrapper.setProps({ meta: MOCK_META });
      expect(wrapper.find('FormGroup').prop('className')).not.toEqual(expect.stringContaining(className));
    });
  });

  describe('info visible toggling', () => {
    const getVisibility = () => wrapper.find('InfoAlert').prop('visible');

    const toggleCases = [
      ['InfoAddonButton', 'onClick'],
      ['InfoAlert', 'onClose'],
    ];

    describe.each(toggleCases)('%s click', (element, prop) => {
      let visibility = getVisibility();

      it(`should toggle the info visibility on ${element} click`, () => {
        for (let i = 0; i < 2; i += 1) {
          wrapper.find(element).prop(prop)();
          const newVisibility = getVisibility();
          expect(newVisibility).toBe(!visibility);
          visibility = newVisibility;
        }
      });
    });
  });
});
