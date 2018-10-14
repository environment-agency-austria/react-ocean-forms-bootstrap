import * as  React from 'react';

import { shallow } from 'enzyme';

import { FormButton } from './FormButton';

describe('<FormButton />', () => {
  const wrapper = shallow((
    <FormButton />
  ));

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
