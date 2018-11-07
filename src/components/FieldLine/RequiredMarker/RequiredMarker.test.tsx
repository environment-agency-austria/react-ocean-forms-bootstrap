import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { createMockFieldMeta } from '../../../test-utils/enzymeFormContext';
import { RequiredMarker } from './RequiredMarker';

describe('<RequiredMarker />', () => {
  const setup = (plaintext: boolean, required?: boolean): ShallowWrapper => {
    const meta = createMockFieldMeta();
    meta.plaintext = plaintext;
    if (required !== undefined) {
      meta.isRequired = required;
    }

    return shallow((
      <RequiredMarker
        meta={meta}
      />
    ));
  };

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.find('.field-required').exists()).toBeFalsy();
  });

  it('should render nothing if there is no required field validator', () => {
    const wrapper = setup(false);
    expect(wrapper.find('.field-required').exists()).toBeFalsy();
  });

  it('should render the field required marker if there is a required field validator', () => {
    const wrapper = setup(false, true);
    expect(wrapper.find('.field-required').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
