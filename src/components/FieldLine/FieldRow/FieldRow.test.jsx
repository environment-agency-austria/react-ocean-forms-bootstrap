import React from 'react';
import { shallow } from 'enzyme';

import FieldRow from './FieldRow';
import { createMockFieldMeta } from '../../../test-utils/enzymeFormContext';

describe('<FieldRow />', () => {
  const MOCK_META = createMockFieldMeta();
  const MOCK_CLASS = 'mock-class';

  const wrapper = shallow((
    <FieldRow
      meta={MOCK_META}
      className={MOCK_CLASS}
      id="mock"
    >
      <div id="mock" />
    </FieldRow>
  ));

  const metaCases = [
    ['field is invalid', 'valid', false, 'is-invalid'],
    ['field is touched', 'touched', true, 'is-touched'],
  ];

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe.each(metaCases)('%s', (name, prop, value, className) => {
    it(`should set the class ${className} to the FormGroup if meta.${prop} is ${value}`, () => {
      MOCK_META[prop] = value;
      wrapper.setProps({ meta: MOCK_META });

      const groupClass = wrapper.find('FormGroup').prop('className');
      expect(groupClass).toEqual(expect.stringContaining(className));
      expect(groupClass).toEqual(expect.stringContaining(MOCK_CLASS));
    });

    it(`should NOT set the class ${className} to the FormGroup if meta.${prop} is ${!value}`, () => {
      MOCK_META[prop] = !value;
      wrapper.setProps({ meta: MOCK_META });

      const groupClass = wrapper.find('FormGroup').prop('className');
      expect(groupClass).toEqual(expect.not.stringContaining(className));
      expect(groupClass).toEqual(expect.stringContaining(MOCK_CLASS));
    });
  });
});
