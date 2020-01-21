import React from 'react';

import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { Form } from 'react-ocean-forms';

import { FieldLine } from './FieldLine';
import { IFieldLineProps } from './FieldLine.types';

describe('<FieldLine />', () => {
  function generateMockProps(): IFieldLineProps {
    return {
      fieldProps: {
        id: 'mock',
        name: 'mock',
        value: 'mock',
        disabled: false,
        onChange: jest.fn(),
        onBlur: jest.fn(),
      },
      metaProps: {
        touched: false,
        plaintext: false,
        stringFormatter: jest.fn().mockImplementation((val) => val),
        isRequired: false,
        isValidating: false,
        valid: true,
        error: null,
      },
      label: 'mock',
    };
  }

  it('should render correctly', () => {
    const props = generateMockProps();
    const { asFragment, getByText } = render(
      <Form>
        <FieldLine {...props} />
      </Form>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(getByText('mock')).toBeVisible();
  });

  it('should correctly set custom prop values', () => {
    const props = generateMockProps();
    const { asFragment } = render(
      <Form>
        <FieldLine {...props} labelSize="2" inputSize="10" labelClass="custom" />
      </Form>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('prefix and suffix', () => {
    it('should display a prefix if provided', () => {
      const props = generateMockProps();
      const { getByText } = render(
        <Form>
          <FieldLine {...props} prefix="Prefix" />
        </Form>
      );

      expect(getByText('Prefix')).toBeVisible();
    });

    it('should display a suffix if provided', () => {
      const props = generateMockProps();
      const { getByText } = render(
        <Form>
          <FieldLine {...props} suffix={<div>Suffix</div>} />
        </Form>
      );

      expect(getByText('Suffix')).toBeVisible();
    });
  });

  describe('info handling', () => {
    function generateInfoMockProps(): IFieldLineProps {
      const props = generateMockProps();
      props.info = 'mock info';
      return props;
    }

    it('should display an info button', () => {
      const props = generateInfoMockProps();
      const { getByRole } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByRole('button')).toBeVisible();
    });

    it('should togle info visibility when info button is clicked', async () => {
      const props = generateInfoMockProps();
      const { getByText, queryByText, getByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(queryByText('mock info')).toBeNull();

      fireEvent.click(getByTitle('ojs_show_information'));
      expect(getByText('mock info')).toBeVisible();

      fireEvent.click(getByTitle('ojs_show_information'));
      await waitForElementToBeRemoved(() => getByText('mock info'));
      expect(queryByText('mock info')).toBeNull();
    });
  });
});
