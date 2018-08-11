/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import { ValidationSummary as CoreValidationSummary } from 'react-ocean-forms';

/**
 * Component for displaying a summary of all
 * validation errors of the form this component
 * lives in.
 */
function ValidationSummary(props) {
  const {
    title,
    ...rest
  } = props;

  return (
    <CoreValidationSummary
      title={title}
      {...rest}
      renderFieldError={(id, fieldName, errors, linkCallback) => (
        <li key={id}>
          <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
          <a href="#" onClick={linkCallback}>
            {fieldName}
            :
            {' '}
            {errors}
          </a>
        </li>
      )}

      render={children => (
        <Alert color="danger" className="validation-summary">
          {children}
        </Alert>
      )}
    />
  );
}

ValidationSummary.displayName = 'ValidationSummary';

ValidationSummary.defaultProps = {
  title: 'ojs_form_validationSummaryHeader',
};

ValidationSummary.propTypes = {
  title: PropTypes.string,
};
export default ValidationSummary;
