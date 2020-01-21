import React from 'react';

import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Form } from 'react-ocean-forms';

import { Check } from './Check';

describe('<Check />', () => {
  it('should render without crashing', () => {
    const { asFragment, getByRole } = render(
      <Form>
        <Check name="mock" label="mock" />
      </Form>
    );

    expect(getByRole('checkbox')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call field.onChange when the input changes', async () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Form>
        <Check name="mock" label="mock" onChange={handleChange} />
      </Form>
    );

    fireEvent.click(getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);

    let checkbox = await waitForElement(() => getByRole('checkbox'));
    expect(checkbox).toBeChecked();

    fireEvent.click(getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(false);

    checkbox = await waitForElement(() => getByRole('checkbox'));
    expect(checkbox).not.toBeChecked();
  });

  it('should add the has-info class to InputGroup if info is present', () => {
    const { asFragment } = render(
      <Form>
        <Check name="mock" label="mock" info="info text" />
      </Form>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display an info message if the info button has been clicked', async () => {
    const { getByRole, getByText } = render(
      <Form>
        <Check name="mock" label="mock" info="info text" />
      </Form>
    );

    fireEvent.click(getByRole('button'));

    const infoText = await waitForElement(() => getByText('info text'));
    expect(infoText).toBeVisible();
  });

  it('should react correctly to plaintext mode', () => {
    const { asFragment, getByRole } = render(
      <Form plaintext>
        <Check name="mock" label="mock" info="info text" />
      </Form>
    );

    expect(getByRole('checkbox')).toBeDisabled();
    expect(asFragment()).toMatchSnapshot();
  });
});
