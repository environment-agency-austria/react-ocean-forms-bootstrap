import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { ValidatingSpinner } from './ValidatingSpinner';

describe('<ValidatingSpinner />', () => {
  const setup = (isValidating: boolean): ShallowWrapper => shallow((
    <ValidatingSpinner
      isValidating={isValidating}
    />
  ));

  it('should render nothing if isValidating is false', () => {
    const wrapper = setup(false);
    expect(wrapper.find('FontAwesomeIcon').exists()).toBeFalsy();
  });

  it('should render a FontAwesomeIcon if isValidating is true', () => {
    const wrapper = setup(true);
    expect(wrapper.find('FontAwesomeIcon').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
