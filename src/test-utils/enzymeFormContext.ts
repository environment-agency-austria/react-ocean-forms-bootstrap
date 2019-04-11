/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IFieldComponentFieldProps, IFieldComponentMeta, IFieldState, IFormContext, TFormEventListener } from 'react-ocean-forms';

import { createMockFormatter } from './createMockFormatter';

/**
 * Components inside the form module require access to the form context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * user definable form context around them.
 */

/**
 * Creates a form context
 */
export const createMockFormContext = (registerCallback?: Function): IFormContext => ({
  fieldPrefix: null,

  registerField: jest.fn().mockImplementation((name: string, state: IFieldState): void => {
    if (registerCallback) {
      registerCallback(name, state);
    }
  }),
  unregisterField: jest.fn(),
  notifyFieldEvent: jest.fn(),

  registerListener: jest.fn().mockImplementation((name: string, callback: TFormEventListener): void => {
    if (registerCallback) {
      registerCallback(name, callback);
    }
  }),
  unregisterListener: jest.fn(),

  getFieldState: jest.fn(),
  getValues: jest.fn(),

  stringFormatter: createMockFormatter(),
  submit: jest.fn(),

  busy: false,
  disabled: false,
  plaintext: false,

  asyncValidateOnChange: false,
  asyncValidationWait: 400,
  defaultValues: {},
});

/**
 * Creates a mock field meta
 */
export const createMockFieldMeta = (): IFieldComponentMeta => ({
  valid: true,
  error: null,
  isValidating: false,
  isRequired: false,
  touched: false,
  stringFormatter: createMockFormatter(),
  plaintext: false,
});

/**
 * Creates a mock field shape
 */
export const createMockField = (): IFieldComponentFieldProps => ({
  id: 'mock-field',
  name: 'mock-field',
  value: 'mock-value',
  disabled: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
});
