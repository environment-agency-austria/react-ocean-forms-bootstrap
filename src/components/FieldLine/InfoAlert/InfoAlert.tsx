/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { FormText } from 'react-ocean-forms';
import { Alert } from 'reactstrap';

import { IInfoAlertProps } from './InfoAlert.types';

/**
 * Displays an bootstrap alert containing the parsed
 * info message
 */
export const InfoAlert: React.FC<IInfoAlertProps> = (props) => {
  const {
    visible,
    info,
    plaintext,
    onClose,
  } = props;

  if (plaintext || info === undefined) { return null; }

  return (
    <Alert
      color="success"
      className="mt-2"
      isOpen={visible}
      toggle={onClose}
    >
      <FormText text={info} />
    </Alert>
  );
};
