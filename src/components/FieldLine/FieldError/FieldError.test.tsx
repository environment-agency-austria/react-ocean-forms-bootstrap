import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { FormText, IFieldErrorObject, IMessageValues } from 'react-ocean-forms';

import { FieldError } from './FieldError';
import { IFieldErrorProps } from './FieldError.types';

describe('<FieldError />', () => {
  const generateError = (msg: string, params?: IMessageValues): IFieldErrorObject => ({
    message_id: msg,
    params: params === undefined ? { } : params,
  });

  interface ISetupArgs {
    props?: Partial<IFieldErrorProps>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
  }

  const setup = ({
    props,
  }: ISetupArgs = {}): ISetupResult => {
    const wrapper = shallow((
      <FieldError
        id="unit"
        invalid={false}
        error={null}
        {...props}
      />
    ));

    return {
      wrapper,
    };
  };

  test('displays nothing when its valid', () => {
    const { wrapper } = setup();
    expect(wrapper.find('FormFeedback').exists()).toBe(false);
  });

  test('displays a single error correctly', () => {
    const error = generateError('ojs_error_required');
    const { wrapper } = setup({
      props: {
        error,
        invalid: true,
      },
    });

    expect(wrapper.find('FormFeedback')).toHaveLength(1);
  });

  test('displays a single error with parameters correctly', () => {
    const mockError = 'ojs_error_minLength';
    const mockValues = { length: '42' };

    const error = generateError(mockError, mockValues);
    const { wrapper } = setup({ props: { error, invalid: true } });

    expect(wrapper.find(FormText).prop('text')).toBe(mockError);
    expect(wrapper.find(FormText).prop('values')).toBe(mockValues);
  });

  test('displays multiple errors correctly', () => {
    const errors = [
      generateError('ojs_error_required'),
      generateError('ojs_error_alphaNumeric'),
    ];
    const { wrapper } = setup({ props: { invalid: true, error: errors }});

    expect(wrapper.find('FormFeedback')).toHaveLength(2);
  });
});
