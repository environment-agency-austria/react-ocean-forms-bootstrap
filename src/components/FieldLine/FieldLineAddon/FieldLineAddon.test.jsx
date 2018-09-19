import React from 'react';
import { shallow } from 'enzyme';
import { FormText } from 'react-ocean-forms';

import FieldLineAddon from './FieldLineAddon';

describe('<FieldLineAddon />', () => {
  const setup = (plaintext, content, type = 'prepend') => {
    const wrapper = shallow((
      <FieldLineAddon
        plaintext={plaintext}
        content={content}
        type={type}
      />
    ));

    return wrapper;
  };

  const checkAddonRender = (wrapper, type) => {
    it('should render an InputGroupAddon', () => {
      expect(wrapper.exists('InputGroupAddon')).toBeTruthy();
    });

    it('should pass the correct addon type', () => {
      expect(wrapper.find('InputGroupAddon').prop('addonType')).toBe(type);
    });
  };

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.exists('InputGroupAddon')).toBeFalsy();
  });

  it('should render nothing if there is no content', () => {
    const wrapper = setup(false, null);
    expect(wrapper.exists('InputGroupAddon')).toBeFalsy();
  });

  describe('text content', () => {
    const MOCK_CONTENT = 'mock-string';
    const MOCK_TYPE = 'prepend';
    const wrapper = setup(false, MOCK_CONTENT, MOCK_TYPE);

    describe('render', () => {
      checkAddonRender(wrapper, MOCK_TYPE);

      it('should wrap the text content in a FormText', () => {
        const formText = wrapper.find(FormText);
        expect(formText).toHaveLength(1);
        expect(formText.prop('text')).toBe(MOCK_CONTENT);
      });

      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('custom content', () => {
    const MOCK_CONTENT = <div id="mock-content" />;
    const MOCK_TYPE = 'append';
    const wrapper = setup(false, MOCK_CONTENT, MOCK_TYPE);

    describe('render', () => {
      checkAddonRender(wrapper, MOCK_TYPE);

      it('should wrap the text content in a FormText', () => {
        expect(wrapper.find(FormText)).toHaveLength(0);
      });

      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
