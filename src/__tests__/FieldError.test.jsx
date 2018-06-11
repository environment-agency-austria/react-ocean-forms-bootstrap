import React from 'react';
import { mount } from 'enzyme';

import { createMockFormContext } from '../test-utils/enzymeFormContext';
import { BaseFieldError } from '../FieldError';

describe('<FieldError />', () => {
  const generateError = (msg, params) => ({
    message_id: msg,
    params: params || {},
  });

  const setup = (props) => {
    const formContext = createMockFormContext(3, 0);
    return mount(<BaseFieldError id="unit" context={formContext} {...props} />);
  };

  test('displays nothing when its valid', () => {
    const wrapper = setup({ invalid: false });
    expect(wrapper.find('.invalid-feedback').exists()).toBe(false);
  });

  test('displays a single error correctly', () => {
    const error = generateError('ojs_error_required');
    const wrapper = setup({ invalid: true, error });

    expect(wrapper.find('.invalid-feedback')).toHaveLength(1);
  });

  test('displays a single error with parameters correctly', () => {
    const error = generateError('ojs_error_minLength', { length: 42 });
    const wrapper = setup({ invalid: true, error });

    expect(wrapper.find('.invalid-feedback').text())
      .toBe('ojs_error_minLength');
  });

  test('displays multiple errors correctly', () => {
    const errors = [
      generateError('ojs_error_required'),
      generateError('ojs_error_alphaNumeric'),
    ];
    const wrapper = setup({ invalid: true, error: errors });

    expect(wrapper.find('.invalid-feedback')).toHaveLength(2);
  });
});
