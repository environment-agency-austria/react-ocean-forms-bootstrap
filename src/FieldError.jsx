/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';
import { errorsShape, withForm } from 'react-ocean-forms';

/**
 * Component for displaying bootstrap
 * form feedbacks if there are any errors
 */
function FieldError(props) {
  const {
    id,
    invalid,
    error,
    context: { stringFormatter },
  } = props;

  // If the field isn't invalid do nothing
  if (invalid !== true) return null;

  // Error could be either an string or an array of strings
  const errorArray = !Array.isArray(error) ? [error] : error;
  const errors = errorArray.map((item) => {
    const errorMessage = stringFormatter(item.message_id, item.params);
    return (
      <FormFeedback key={`${id}_${item.message_id}`}>{errorMessage}</FormFeedback>
    );
  });

  return errors;
}

FieldError.displayName = 'FieldError';

FieldError.defaultProps = {
  error: null,
};

FieldError.propTypes = {
  id: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  error: errorsShape,
  context: PropTypes.shape({
    stringFormatter: PropTypes.func.isRequired,
  }),
};

export const BaseFieldError = FieldError;
export default withForm(FieldError);
