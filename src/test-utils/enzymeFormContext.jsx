/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createMockFormatter from './createMockFormatter';

/**
 * Components inside the form module require access to the form context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * user definable form context around them.
 */

/**
 * Creates a field state
 * @param {*} index Index of the field
 * @param {*} error Error status
 */
export function createMockFieldState(index, hasError) {
  const name = 'field'.concat(String(index));
  return {
    [name]: {
      label: name,
      touched: false,
      value: 'blubb',
      valid: hasError ? false : undefined,
      error: hasError ? { message_id: 'ojs_error_required', params: { } } : undefined,
      isGroup: false,
      validators: null,
      asyncValidators: null,
      asyncValidationWait: null,
    },
  };
}

/**
 * Creates a form context
 * @param {*} fieldCount Number of fields to be generated
 * @param {*} errorCount Number of fields with errors
 */
export function createMockFormContext(fieldCount, errorCount) {
  const context = {
    fieldPrefix: null,
    fieldStates: {},

    getFieldState: jest.fn(),
    setFieldState: jest.fn(),
    registerField: jest.fn(),
    getValues: jest.fn(),

    scrollToVS: false,
    scrollToVSCallback: jest.fn(),

    stringFormatter: createMockFormatter(),
    asyncValidateOnChange: false,
  };

  for (let i = 0; i < fieldCount; i += 1) {
    context.fieldStates = {
      ...context.fieldStates,
      ...createMockFieldState(i, i < errorCount),
    };
  }

  return context;
}
