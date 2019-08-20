import * as  React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IValidationFieldErrorProps } from './ValidationFieldError.types';
import { ValidationFieldError } from './ValidationFieldError';

describe('<ValidationFieldError />', () => {
  interface ISetupArgs {
    props?: Partial<IValidationFieldErrorProps>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
  }

  const setup = ({
    props,
  }: ISetupArgs = {}): ISetupResult => {
    const wrapper = shallow((
      <ValidationFieldError
        id="mock-summary"
        fieldName="mock-field-name"
        errors={<div id="mock-errors" />}
        linkCallback={() => {}}
        {...props}
      />
    ));

    return {
      wrapper,
    };
  };

  it('should render without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
