import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { Form } from 'react-ocean-forms';
import { OnOffToggleButton } from './OnOffToggleButton';

describe('<OnOffToggleButton />', () => {
  it('should render correctly', () => {
    const { asFragment, getByText, getByLabelText } = render(
      <Form>
        <OnOffToggleButton name="mock" label="mock" />
      </Form>
    );

    expect(getByLabelText('mock')).toBeVisible();

    expect(getByText('ojs_togglebutton_on')).toBeVisible();
    expect(getByText('ojs_togglebutton_on')).toHaveClass('active');

    expect(getByText('ojs_togglebutton_off')).toBeVisible();
    expect(getByText('ojs_togglebutton_off')).not.toHaveClass('active');

    expect(asFragment()).toMatchSnapshot();
  });

  describe('plaintext mode', () => {
    it('should render plaintext Button', () => {
      const { asFragment, getByDisplayValue, queryByDisplayValue, getByLabelText } = render(
        <Form plaintext>
          <OnOffToggleButton name="mock" label="mock" />
        </Form>
      );

      expect(getByLabelText('mock')).toBeVisible();

      expect(getByDisplayValue('ojs_togglebutton_on')).toBeVisible();
      expect(getByDisplayValue('ojs_togglebutton_on')).toHaveAttribute('readonly');

      expect(queryByDisplayValue('ojs_togglebutton_off')).toBeNull();

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render the correct label in plaintext mode', () => {
      const { getByDisplayValue, queryByDisplayValue, getByLabelText } = render(
        <Form plaintext>
          <OnOffToggleButton name="mock" label="mock" onLabel="mock on label" offLabel="mock off label" value={false} />
        </Form>
      );

      expect(getByLabelText('mock')).toBeVisible();

      expect(getByDisplayValue('mock off label')).toBeVisible();
      expect(getByDisplayValue('mock off label')).toHaveAttribute('readonly');

      expect(queryByDisplayValue('mock on label')).toBeNull();
    });
  });

  describe('disabled mode', () => {
    it('should render correctly in disabled mode', () => {
      const { getByText } = render(
        <Form disabled>
          <OnOffToggleButton name="mock" label="mock" />
        </Form>
      );

      expect(getByText('ojs_togglebutton_on')).toBeVisible();
      expect(getByText('ojs_togglebutton_on')).toBeDisabled();

      expect(getByText('ojs_togglebutton_off')).toBeVisible();
      expect(getByText('ojs_togglebutton_off')).toBeDisabled();
    });
  });

  const testButton = (initialValue: boolean): void => {
    describe(`Button with initial value: ${initialValue}`, () => {
      it('should set the correct button as active', () => {
        const { getByText } = render(
          <Form>
            <OnOffToggleButton name="mock" label="mock" value={initialValue} onLabel="on" offLabel="off" />
          </Form>
        );

        const activeButton = initialValue ? 'on' : 'off';
        const inactiveButton = initialValue ? 'off' : 'on';

        expect(getByText(activeButton)).toHaveClass('active');
        expect(getByText(inactiveButton)).not.toHaveClass('active');
      });

      it('should trigger onChange on click', () => {
        const handleChange = jest.fn();
        const { getByText } = render(
          <Form>
            <OnOffToggleButton name="mock" label="mock" value={initialValue} onLabel="on" offLabel="off" onChange={handleChange} />
          </Form>
        );

        const inactiveButton = initialValue ? 'off' : 'on';
        fireEvent.click(getByText(inactiveButton));

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(!initialValue);

        expect(getByText(inactiveButton)).toHaveClass('active');
      });
    });
  };

  testButton(true);
  testButton(false);
});
