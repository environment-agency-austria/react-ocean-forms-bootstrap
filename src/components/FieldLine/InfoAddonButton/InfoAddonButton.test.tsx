import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { InfoAddonButton } from './InfoAddonButton';

describe('<InfoAddonButton />', () => {
  const setup = (
    plaintext: boolean,
    info?: string,
    onClick: ((event: React.MouseEvent) => void) = (): void => undefined,
  ): ShallowWrapper => shallow((
    <InfoAddonButton
      plaintext={plaintext}
      info={info}
      onClick={onClick}
    />
  ));

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.find('InputGroupAddon').exists()).toBeFalsy();
  });

  it('should render nothing if there is no required field validator', () => {
    const wrapper = setup(false);
    expect(wrapper.find('InputGroupAddon').exists()).toBeFalsy();
  });

  describe('info present', () => {
    const mockInfo = 'mock-info';
    const mockClickHandler = jest.fn();
    const wrapper = setup(false, mockInfo, mockClickHandler);

    it('should render an InputGroupAddon', () => {
      expect(wrapper.find('InputGroupAddon').exists()).toBeTruthy();
    });

    it('should contain a Button with the click handler attached', () => {
      expect(wrapper.find('Button').exists()).toBeTruthy();
      expect(wrapper.find('Button').prop('onClick')).toBe(mockClickHandler);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
