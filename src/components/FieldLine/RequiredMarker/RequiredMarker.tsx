/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { useFormText } from 'react-ocean-forms';

import { IRequiredMarkerProps } from './RequiredMarker.types';

/**
 * Displays a * if the field is required - based on the
 * presence of react-ocean-forms validators.required
 */
export const RequiredMarker: React.FC<IRequiredMarkerProps> = (props) => {
  const { required, hidden } = props;

  const requiredTitle = useFormText('ojs_field_required');

  // Do nothing in plaintext mode
  if (hidden) { return null; }

  if (required) {
    return (
      <span className="field-required" title={requiredTitle}>
        {' '}
        *
      </span>
    );
  }

  return null;
};
