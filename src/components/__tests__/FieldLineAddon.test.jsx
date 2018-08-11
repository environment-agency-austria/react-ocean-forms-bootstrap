import React from 'react';
import { shallow } from 'enzyme';

import FieldLineAddon from '../FieldLineAddon';
import { createMockFieldMeta } from '../../test-utils/enzymeFormContext';

describe('<FieldLineAddon />', () => {
  const setup = (plaintext, content, type = 'prepend') => {
    const meta = createMockFieldMeta();
    meta.plaintext = plaintext;

    const wrapper = shallow((
      <FieldLineAddon
        meta={meta}
        content={content}
        type={type}
      />
    ));

    return { wrapper, meta };
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
    const { wrapper } = setup(true);
    expect(wrapper.exists('InputGroupAddon')).toBeFalsy();
  });

  it('should render nothing if there is no content', () => {
    const { wrapper } = setup(false, null);
    expect(wrapper.exists('InputGroupAddon')).toBeFalsy();
  });

  describe('text content', () => {
    const MOCK_CONTENT = 'mock-string';
    const MOCK_TYPE = 'prepend';
    const { wrapper, meta } = setup(false, MOCK_CONTENT, MOCK_TYPE);

    it('should pass the text content through meta.stringFormatter', () => {
      expect(meta.stringFormatter).toHaveBeenCalledWith(MOCK_CONTENT);
    });

    describe('render', () => {
      checkAddonRender(wrapper, MOCK_TYPE);

      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('custom content', () => {
    const MOCK_CONTENT = <div id="mock-content" />;
    const MOCK_TYPE = 'append';
    const { wrapper, meta } = setup(false, MOCK_CONTENT, MOCK_TYPE);

    it('should not pass the content through meta.stringFormatter', () => {
      expect(meta.stringFormatter).not.toHaveBeenCalledWith(MOCK_CONTENT);
    });

    describe('render', () => {
      checkAddonRender(wrapper, MOCK_TYPE);

      it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
