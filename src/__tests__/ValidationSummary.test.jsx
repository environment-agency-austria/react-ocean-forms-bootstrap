import React from 'react';
import { mount } from 'enzyme';

import { createMockFormContext } from '../test-utils/enzymeFormContext';
import BootstrapValidationSummary from '../ValidationSummary';

describe.skip('<ValidationSummary />', () => {
  window.HTMLElement.prototype.scrollIntoView = () => {};
  window.scrollBy = jest.fn();

  const FIELD_COUNT = 3;
  const ERROR_COUNT = 2;
  const validFormContext = createMockFormContext(FIELD_COUNT, 0);
  const invalidFormContext = createMockFormContext(FIELD_COUNT, ERROR_COUNT);

  it('should render nothing if all fields are valid', () => {
    const wrapper = mount((
      <BootstrapValidationSummary context={validFormContext} />
    ));

    expect(wrapper.children()).toHaveLength(0);
  });

  describe('With errors', () => {
    let wrapper = null;
    let validationSummary = null;
    let errorItems = null;

    beforeEach(() => {
      wrapper = mount((
        <BootstrapValidationSummary context={invalidFormContext} />
      ));

      validationSummary = wrapper.find('div.validation-summary.alert');
      errorItems = validationSummary.find('ul li');
    });

    it('should render a validation summary', () => {
      expect(validationSummary).toHaveLength(1);
    });

    it('should have a header', () => {
      const heading = wrapper.find('h4.alert-heading');

      expect(heading.exists()).toBeTruthy();
      expect(heading.text()).toEqual('Errors');
    });

    it('should have two items in the error list', () => {
      expect(errorItems).toHaveLength(ERROR_COUNT);
    });

    it('should display the correct errors', () => {
      for (let i = 0; i < ERROR_COUNT; i += 1) {
        expect(errorItems.at(i).text()).toEqual(`field${i}: This field is mandatory.`);
      }
    });

    it('should focus the input field on click at the error', () => {
      const inputNode = document.createElement('input');
      inputNode.type = 'text';
      inputNode.id = 'field0';

      document.body.appendChild(inputNode);
      const spy = jest.spyOn(inputNode, 'focus');

      errorItems.first().find('a').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should fail without error when the input field couldn\'t be found', () => {
      expect(() => {
        errorItems.first().find('a').simulate('click');
      }).not.toThrow();
    });

    it('should scroll into view', () => {
      invalidFormContext.scrollToVS = true;
      wrapper.setProps({ context: invalidFormContext });

      expect(invalidFormContext.scrollToVSCallback).toHaveBeenCalled();
    });
  });
});
