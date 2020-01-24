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
        <FieldLine {...props} labelSize="2" inputSize="10" labelClass="custom" containerClass="custom container" />
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
    it('should not display an info button without info', () => {
      const props = generateMockProps();
      const { queryByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(queryByTitle('ojs_show_information')).toBeNull();
    });

    it('should display an info button', () => {
      const props = generateMockProps();
      const { getByTitle } = render(
        <Form>
          <FieldLine {...props} info="mock info" />
        </Form>
      );

      expect(getByTitle('ojs_show_information')).toBeVisible();
    });

    it('should togle info visibility when info button is clicked', async () => {
      const props = generateMockProps();
      const { getByText, queryByText, getByTitle } = render(
        <Form>
          <FieldLine {...props} info="mock info" />
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

  describe('error handling', () => {
    it('should not have any error roles in default mode', () => {
      const props = generateMockProps();
      const { getByRole } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByRole('form').firstChild).not.toHaveClass('is-invalid');
    });

    it('should correctly display a single error', () => {
      const props = generateMockProps();
      props.metaProps.valid = false;
      props.metaProps.error = { message_id: 'mock error', params: { } };

      const { getByText, getByRole } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByText('mock error')).toBeVisible();
      expect(getByRole('form').firstChild).toHaveClass('is-invalid');
    });

    it('should correctly display multiple errors', () => {
      const props = generateMockProps();
      props.metaProps.valid = false;
      props.metaProps.error = [
        { message_id: 'mock error', params: { } },
        { message_id: 'mock second error', params: { } }
      ];

      const { getByText } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByText('mock error')).toBeVisible();
      expect(getByText('mock second error')).toBeVisible();
    });
  });

  describe('required fields handling', () => {
    it('should not display a required marker on not required fields', () => {
      const props = generateMockProps();
      const { queryByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(queryByTitle('Required')).toBeNull();
    });

    it('should display a required marker on required fields', () => {
      const props = generateMockProps();
      props.metaProps.isRequired = true;

      const { getByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByTitle('Required')).toBeVisible();
    });

    it('should not display a required marker on required fields in plaintext mode', () => {
      const props = generateMockProps();
      props.metaProps.isRequired = true;
      props.metaProps.plaintext = true;

      const { queryByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(queryByTitle('Required')).toBeNull();
    });
  });

  describe('validation handling', () => {
    it('should not display a validating spinner on not validating fields', () => {
      const props = generateMockProps();
      const { queryByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(queryByTitle('ojs_field_validating')).toBeNull();
    });

    it('should display a validating spinner on validating fields', () => {
      const props = generateMockProps();
      props.metaProps.isValidating = true;

      const { getByTitle } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByTitle('ojs_field_validating')).toBeInTheDocument();
    });
  });

  describe('touched handling', () => {
    it('should not have is-touched class by default', () => {
      const props = generateMockProps();
      const { getByRole } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByRole('form').firstChild).not.toHaveClass('is-touched');
    });

    it('should have the is-touched class on touched fields', () => {
      const props = generateMockProps();
      props.metaProps.touched = true;

      const { getByRole } = render(
        <Form>
          <FieldLine {...props} />
        </Form>
      );

      expect(getByRole('form').firstChild).toHaveClass('is-touched');
    });
  });
});
