import React from 'react';

import { render } from '@testing-library/react'
import { Form } from 'react-ocean-forms';

import { FormButton } from './FormButton';

describe('<FormButton />', () => {
  it('should render without crashing', () => {
    const { asFragment, getByRole, getByText } = render(
      <Form>
        <FormButton>Mock button</FormButton>
      </Form>
    );

    expect(getByRole('button')).toBeInTheDocument();
    expect(getByText('Mock button')).toBeVisible();
    expect(asFragment()).toMatchSnapshot();
  });
});
