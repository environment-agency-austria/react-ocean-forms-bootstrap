import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { InvalidAlert } from './InvalidAlert';

describe('<InvalidAlert />', () => {
  const setup = (valid: boolean): ShallowWrapper => shallow((
    <InvalidAlert
      valid={valid}
    />
  ));

  it('should render nothing if valid is true', () => {
    const wrapper = setup(true);
    expect(wrapper.find('FontAwesomeIcon').exists()).toBeFalsy();
  });

  it('should render a FontAwesomeIcon if valid is false', () => {
    const wrapper = setup(false);
    expect(wrapper.find('FontAwesomeIcon').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
