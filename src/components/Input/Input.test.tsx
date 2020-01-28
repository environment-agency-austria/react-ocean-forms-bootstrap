import React from 'react';

import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Form, validators } from 'react-ocean-forms';

import { Input } from './Input';

describe('<Input />', () => {
  it('should render correctly', () => {
    const { asFragment, getByRole, getByLabelText } = render(
      <Form>
        <Input name="mock" label="mock" />
      </Form>
    );

    expect(getByRole('textbox')).toBeVisible();
    expect(getByLabelText('mock')).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should let the user override the input type', () => {
    const inputType = 'number';
    const { getByLabelText } = render(
      <Form>
        <Input name="mock" label="mock" type={inputType} />
      </Form>
    );

    expect(getByLabelText('mock')).toBeVisible();
    expect(getByLabelText('mock')).toHaveAttribute('type', inputType);
  });

  it('should call field.onChange when the input changes', async () => {
    const changedValue = 'changed value';
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <Form>
        <Input name="mock" label="mock" onChange={handleChange} />
      </Form>
    );

    fireEvent.change(getByLabelText('mock'), { target: { value: changedValue }});
    expect(handleChange).toHaveBeenCalledWith(changedValue);

    const input = await waitForElement(() => getByLabelText('mock'));
    expect(input).toHaveValue(changedValue);
  });

  it('should call field.onBlur when there is an input blur', () => {
    const handleBlur = jest.fn();
    const { getByLabelText } = render(
      <Form>
        <Input name="mock" label="mock" onBlur={handleBlur} />
      </Form>
    );

    fireEvent.blur(getByLabelText('mock'));
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should react on meta.plaintext correctly', () => {
    const { asFragment } = render(
      <Form plaintext>
        <Input name="mock" label="mock" />
      </Form>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should react on meta.valid correctly', () => {
    const { getByRole, getByLabelText, getByText } = render(
      <Form plaintext>
        <Input name="mock" label="mock" validators={[validators.required]} />
      </Form>
    );

    fireEvent.change(getByLabelText('mock'), { target: { value: 'temp value' }});
    fireEvent.change(getByLabelText('mock'), { target: { value: '' }});

    expect(getByRole('textbox')).toHaveClass('is-invalid');
    expect(getByText('This field is mandatory.')).toBeVisible();
  });
});
