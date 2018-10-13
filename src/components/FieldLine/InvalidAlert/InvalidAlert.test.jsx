import React from 'react';
import { shallow } from 'enzyme';

import { InvalidAlert } from './InvalidAlert';

describe('<InvalidAlert />', () => {
  const setup = valid => shallow((
    <InvalidAlert
      valid={valid}
    />
  ));

  it('should render nothing if valid is true', () => {
    const wrapper = setup(true);
    expect(wrapper.exists('FontAwesomeIcon')).toBeFalsy();
  });

  it('should render a FontAwesomeIcon if valid is false', () => {
    const wrapper = setup(false);
    expect(wrapper.exists('FontAwesomeIcon')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
