/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormText } from 'react-ocean-forms';

import { IInvalidAlertProps } from './InvalidAlert.types';

/**
 * Displays an error icon if valid is false
 */
export const InvalidAlert: React.FC<IInvalidAlertProps> = (props) => {
  const { valid } = props;

  const invalidTitle = useFormText('ojs_field_invalid');

  if (valid) { return null; }

  return (
    <FontAwesomeIcon
      icon={faExclamationCircle}
      className="ico-invalid mr-2"
      title={invalidTitle}
    />
  );
};
