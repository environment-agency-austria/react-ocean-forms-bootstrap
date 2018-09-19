import React from 'react';
import { shallow } from 'enzyme';
import { validators as defaultValidators } from 'react-ocean-forms';

import RequiredMarker from './RequiredMarker';
import { createMockFieldMeta } from '../../../test-utils/enzymeFormContext';

describe('<RequiredMarker />', () => {
  const setup = (plaintext, validators) => {
    const meta = createMockFieldMeta();
    meta.plaintext = plaintext;

    return shallow((
      <RequiredMarker
        meta={meta}
        validators={validators}
      />
    ));
  };

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.exists('.field-required')).toBeFalsy();
  });

  it('should render nothing if there is no required field validator', () => {
    const wrapper = setup(false);
    expect(wrapper.exists('.field-required')).toBeFalsy();
  });

  it('should render the field required marker if there is a required field validator', () => {
    const wrapper = setup(false, [defaultValidators.required]);
    expect(wrapper.exists('.field-required')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
