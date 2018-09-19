import React from 'react';
import { shallow } from 'enzyme';

import { InfoAddonButton } from './InfoAddonButton';

describe('<InfoAddonButton />', () => {
  const setup = (plaintext, info, onClick = () => {}) => shallow((
    <InfoAddonButton
      plaintext={plaintext}
      info={info}
      onClick={onClick}
    />
  ));

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.exists('InputGroupAddon')).toBeFalsy();
  });

  it('should render nothing if there is no required field validator', () => {
    const wrapper = setup(false);
    expect(wrapper.exists('InputGroupAddon')).toBeFalsy();
  });

  describe('info present', () => {
    const MOCK_INFO = 'mock-info';
    const MOCK_CLICK_HANDLER = jest.fn();
    const wrapper = setup(false, MOCK_INFO, MOCK_CLICK_HANDLER);

    it('should render an InputGroupAddon', () => {
      expect(wrapper.exists('InputGroupAddon')).toBeTruthy();
    });

    it('should contain a Button with the click handler attached', () => {
      expect(wrapper.exists('Button')).toBeTruthy();
      expect(wrapper.find('Button').prop('onClick')).toBe(MOCK_CLICK_HANDLER);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
