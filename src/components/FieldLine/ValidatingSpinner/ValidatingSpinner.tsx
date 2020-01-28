/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormText } from 'react-ocean-forms';

import { IValidatingSpinnerProps } from './ValidatingSpinner.types';

/**
 * Displays an error icon if valid is false
 */
export const ValidatingSpinner: React.FC<IValidatingSpinnerProps> = (props) => {
  const { isValidating } = props;

  const validatingTitle = useFormText('ojs_field_validating');

  if (!isValidating) { return null; }

  return (
    <FontAwesomeIcon
      icon={faSpinner}
      spin
      className="ico-loading mr-2"
      title={validatingTitle}
    />
  );
};
