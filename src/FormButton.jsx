import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { withForm } from 'react-ocean-forms';

/**
 * Wrapper for a bootstrap button that will
 * automatically disable the button if the
 * form is busy
 */
function FormButton(props) {
  const {
    context: {
      busy,
      disabled,
    },
    ...rest
  } = props;

  const buttonDisabled = busy || disabled;

  return (
    <Button disabled={buttonDisabled} {...rest} />
  );
}

FormButton.propTypes = {
  context: PropTypes.shape({
    busy: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  }).isRequired,
};

export const BaseFormButton = FormButton;
export default withForm(FormButton);
