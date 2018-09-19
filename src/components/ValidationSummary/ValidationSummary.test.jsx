import React from 'react';
import { shallow } from 'enzyme';
import { ValidationSummary as CoreValidationSummary } from 'react-ocean-forms';

import ValidationSummary from './ValidationSummary';

describe('<ValidationSummary />', () => {
  const wrapper = shallow((
    <ValidationSummary />
  ));

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('render prop', () => {
    const renderProp = wrapper.find(CoreValidationSummary).prop('render');

    it('should set the render prop correctly', () => {
      expect(typeof renderProp).toBe('function');
    });

    it('should correctly render the render prop', () => {
      const mockChildren = <div id="mock" />;
      const renderWrapper = shallow(renderProp(mockChildren));
      expect(renderWrapper).toMatchSnapshot();
    });
  });

  describe('renderFieldError prop', () => {
    const renderFieldErrorProp = wrapper.find(CoreValidationSummary).prop('renderFieldError');

    it('should set the render prop correctly', () => {
      expect(typeof renderFieldErrorProp).toBe('function');
    });

    it('should correctly render the render prop', () => {
      const renderWrapper = shallow(renderFieldErrorProp(
        'mock-id',
        'mock-name',
        'mock-error',
        () => {},
      ));
      expect(renderWrapper).toMatchSnapshot();
    });
  });
});
