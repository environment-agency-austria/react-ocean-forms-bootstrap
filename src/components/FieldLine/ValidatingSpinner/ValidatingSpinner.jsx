/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

/**
 * Displays an error icon if valid is false
 */
function ValidatingSpinner({ isValidating }) {
  return isValidating && <FontAwesomeIcon icon={faSpinner} spin className="ico-loading mr-2" />;
}

ValidatingSpinner.propTypes = {
  isValidating: PropTypes.bool,
};

export default ValidatingSpinner;
