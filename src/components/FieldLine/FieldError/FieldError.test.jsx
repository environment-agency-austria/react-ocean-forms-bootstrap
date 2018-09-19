import React from 'react';
import { shallow } from 'enzyme';
import { FormText } from 'react-ocean-forms';

import { createMockFormContext } from '../../../test-utils/enzymeFormContext';
import FieldError from './FieldError';

describe('<FieldError />', () => {
  const generateError = (msg, params) => ({
    message_id: msg,
    params: params || {},
  });

  const setup = (props) => {
    const formContext = createMockFormContext(3, 0);
    return shallow(<FieldError id="unit" context={formContext} {...props} />);
  };

  test('displays nothing when its valid', () => {
    const wrapper = setup({ invalid: false });
    expect(wrapper.find('FormFeedback').exists()).toBe(false);
  });

  test('displays a single error correctly', () => {
    const error = generateError('ojs_error_required');
    const wrapper = setup({ invalid: true, error });

    expect(wrapper.find('FormFeedback')).toHaveLength(1);
  });

  test('displays a single error with parameters correctly', () => {
    const MOCK_ERROR = 'ojs_error_minLength';
    const MOCK_VALUES = { length: 42 };

    const error = generateError(MOCK_ERROR, MOCK_VALUES);
    const wrapper = setup({ invalid: true, error });

    expect(wrapper.find(FormText).prop('text')).toBe(MOCK_ERROR);
    expect(wrapper.find(FormText).prop('values')).toBe(MOCK_VALUES);
  });

  test('displays multiple errors correctly', () => {
    const errors = [
      generateError('ojs_error_required'),
      generateError('ojs_error_alphaNumeric'),
    ];
    const wrapper = setup({ invalid: true, error: errors });

    expect(wrapper.find('FormFeedback')).toHaveLength(2);
  });
});
