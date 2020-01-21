import React from 'react';

import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Form, Input, FormButton, validators } from 'react-ocean-forms';

import { ValidationSummary } from './ValidationSummary';
import { IValidationFieldErrorProps } from './ValidationFieldError';

describe('<ValidationSummary />', () => {
  it('should render without crashing', () => {
    const { asFragment } = render(
      <Form>
        <ValidationSummary id="validation-summary" />
        <Input name="mock" label="mock" />
      </Form>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should be visible when an error occurs', async () => {
    const { asFragment, getByText } = render(
      <Form>
        <ValidationSummary id="validation-summary" disableFocusOnSubmit />
        <Input name="mock" label="mock" validators={[validators.required]} />
        <FormButton type="submit">Submit</FormButton>
      </Form>
    );

    fireEvent.click(getByText('Submit'));
    const fragment = await waitForElement(() => asFragment());
    expect(fragment).toMatchSnapshot();
  });

  it('should accept custom field error components', async () => {
    const CustomErrorRenderer: React.FC<IValidationFieldErrorProps> = () => {
      return <div>Custom error renderer</div>;
    };

    const { getByText } = render(
      <Form>
        <ValidationSummary id="validation-summary" disableFocusOnSubmit fieldErrorComponent={CustomErrorRenderer} />
        <Input name="mock" label="mock" validators={[validators.required]} />
        <FormButton type="submit">Submit</FormButton>
      </Form>
    );

    fireEvent.click(getByText('Submit'));
    const customError = await waitForElement(() => getByText('Custom error renderer'));
    expect(customError).toBeVisible();
  });
});
