/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

/**
 * Displays an error icon if valid is false
 */
function InvalidAlert({ valid }) {
  return !valid && <FontAwesomeIcon icon={faExclamationCircle} className="ico-invalid mr-2" />;
}

InvalidAlert.propTypes = {
  valid: PropTypes.bool,
};

export default InvalidAlert;
