import React from 'react';
import { shallow } from 'enzyme';

import { BaseFormButton } from '../FormButton';

describe('<FormButton />', () => {
  const wrapper = shallow((
    <BaseFormButton
      context={{ busy: false, disabled: false }}
    />
  ));

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be disabled when the form is busy', () => {
    wrapper.setProps({
      context: {
        busy: true,
        disabled: false,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should be disabled when the form is disabled', () => {
    wrapper.setProps({
      context: {
        busy: false,
        disabled: true,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
