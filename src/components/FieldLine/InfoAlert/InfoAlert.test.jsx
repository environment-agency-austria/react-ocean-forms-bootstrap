import React from 'react';
import { shallow } from 'enzyme';
import { FormText } from 'react-ocean-forms';

import { InfoAlert } from './InfoAlert';

describe('<InfoAlert />', () => {
  const setup = (plaintext, info, visible = false, onClose = () => {}) => {
    const wrapper = shallow((
      <InfoAlert
        plaintext={plaintext}
        visible={visible}
        info={info}
        onClose={onClose}
      />
    ));

    return wrapper;
  };

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.exists('Alert')).toBeFalsy();
  });

  it('should render nothing if there is no info', () => {
    const wrapper = setup(false, null);
    expect(wrapper.exists('Alert')).toBeFalsy();
  });

  describe('info present', () => {
    const MOCK_INFO = 'mock-info';
    const MOCK_VISIBLE = true;
    const MOCK_ON_CLOSE = jest.fn();

    const wrapper = setup(false, MOCK_INFO, MOCK_VISIBLE, MOCK_ON_CLOSE);

    it('should wrap the info with a FormText', () => {
      const formText = wrapper.find(FormText);
      expect(formText).toHaveLength(1);
      expect(formText.prop('text')).toBe(MOCK_INFO);
    });

    it('should render an Alert with the correct props', () => {
      expect(wrapper.exists('Alert')).toBeTruthy();

      const alert = wrapper.find('Alert');
      expect(alert.prop('isOpen')).toBe(MOCK_VISIBLE);
      expect(alert.prop('toggle')).toBe(MOCK_ON_CLOSE);
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
