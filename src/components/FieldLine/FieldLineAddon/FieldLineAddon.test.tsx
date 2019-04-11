import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { FormText } from 'react-ocean-forms';

import { FieldLineAddon } from './FieldLineAddon';
import { IFieldLineAddonType } from './FieldLineAddon.types';

describe('<FieldLineAddon />', () => {
  const setup = (
    plaintext: boolean,
    content?: React.ReactNode,
    type: IFieldLineAddonType = 'prepend',
  ): ShallowWrapper => {
    return shallow((
      <FieldLineAddon
        plaintext={plaintext}
        content={content}
        type={type}
      />
    ));
  };

  const checkAddonRender = (wrapper: ShallowWrapper, type: IFieldLineAddonType): void => {
    it('should render an InputGroupAddon', () => {
      expect(wrapper.find('InputGroupAddon').exists()).toBeTruthy();
    });

    it('should pass the correct addon type', () => {
      expect(wrapper.find('InputGroupAddon').prop('addonType')).toBe(type);
    });
  };

  it('should render nothing if meta.plaintext is active', () => {
    const wrapper = setup(true);
    expect(wrapper.find('InputGroupAddon').exists()).toBeFalsy();
  });

  it('should render nothing if there is no content', () => {
    const wrapper = setup(false);
    expect(wrapper.find('InputGroupAddon').exists()).toBeFalsy();
  });

  describe('text content', () => {
    const mockContent = 'mock-string';
    const mockType = 'prepend';
    const wrapper = setup(false, mockContent, mockType);

    describe('render', () => {
      checkAddonRender(wrapper, mockType);

      it('should wrap the text content in a FormText', () => {
        const formText = wrapper.find(FormText);
        expect(formText).toHaveLength(1);
        expect(formText.prop('text')).toBe(mockContent);
      });

      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('custom content', () => {
    const mockContent = <div id="mock-content" />;
    const mockType = 'append';
    const wrapper = setup(false, mockContent, mockType);

    describe('render', () => {
      checkAddonRender(wrapper, mockType);

      it('should wrap the text content in a FormText', () => {
        expect(wrapper.find(FormText)).toHaveLength(0);
      });

      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
