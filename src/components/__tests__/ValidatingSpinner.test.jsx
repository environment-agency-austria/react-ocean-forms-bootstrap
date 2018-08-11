import React from 'react';
import { shallow } from 'enzyme';

import ValidatingSpinner from '../ValidatingSpinner';

describe('<ValidatingSpinner />', () => {
  const setup = isValidating => shallow((
    <ValidatingSpinner
      isValidating={isValidating}
    />
  ));

  it('should render nothing if isValidating is false', () => {
    const wrapper = setup(false);
    expect(wrapper.exists('FontAwesomeIcon')).toBeFalsy();
  });

  it('should render a FontAwesomeIcon if isValidating is true', () => {
    const wrapper = setup(true);
    expect(wrapper.exists('FontAwesomeIcon')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
