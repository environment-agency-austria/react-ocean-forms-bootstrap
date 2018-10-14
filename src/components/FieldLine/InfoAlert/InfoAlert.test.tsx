import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { FormText } from 'react-ocean-forms';

import { InfoAlert } from './InfoAlert';

describe('<InfoAlert />', () => {
  const setup = (
    plaintext: boolean,
    info?: string,
    visible: boolean = false,
    onClose: (() => void) = (): undefined => undefined,
  ): ShallowWrapper => {
    return shallow((
      <InfoAlert
        plaintext={plaintext}
        visible={visible}
        info={info}
        onClose={onClose}
      />
    ));
  };

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.find('Alert').exists()).toBeFalsy();
  });

  it('should render nothing if there is no info', () => {
    const wrapper = setup(false);
    expect(wrapper.find('Alert').exists()).toBeFalsy();
  });

  describe('info present', () => {
    const mockInfo = 'mock-info';
    const mockVisible = true;
    const mockOnClose = jest.fn();

    const wrapper = setup(false, mockInfo, mockVisible, mockOnClose);

    it('should wrap the info with a FormText', () => {
      const formText = wrapper.find(FormText);
      expect(formText).toHaveLength(1);
      expect(formText.prop('text')).toBe(mockInfo);
    });

    it('should render an Alert with the correct props', () => {
      expect(wrapper.find('Alert').exists()).toBeTruthy();

      const alert = wrapper.find('Alert');
      expect(alert.prop('isOpen')).toBe(mockVisible);
      expect(alert.prop('toggle')).toBe(mockOnClose);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
