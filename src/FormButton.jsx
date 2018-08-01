import React from 'react';
import { Button } from 'reactstrap';
import { FormButton as BaseFormButton } from 'react-ocean-forms';

/**
 * Wrapper for a bootstrap button that will
 * automatically disable the button if the
 * form is busy
 */
function FormButton(props) {
  return (
    <BaseFormButton component={Button} {...props} />
  );
}

FormButton.displayName = 'FormButton';

export default FormButton;
