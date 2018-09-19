/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { fieldMetaShape, validators as defaultValidators } from 'react-ocean-forms';

/**
 * Displays a * if the field is required - based on the
 * presence of react-ocean-forms validators.required
 */
function RequiredMarker({ validators, meta }) {
  // Do nothing in plaintext mode
  if (meta.plaintext) return null;

  if (Array.isArray(validators) && validators.includes(defaultValidators.required)) {
    const requiredTitle = meta.stringFormatter('ojs_field_required');
    return (
      <span className="field-required" title={requiredTitle}>
        {' '}
        *
      </span>
    );
  }

  return null;
}

RequiredMarker.defaultProps = {
  validators: undefined,
};

RequiredMarker.propTypes = {
  meta: fieldMetaShape.isRequired,
  validators: PropTypes.arrayOf(PropTypes.func),
};

export default RequiredMarker;
