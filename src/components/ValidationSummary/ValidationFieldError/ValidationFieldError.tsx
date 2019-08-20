/**
 * Copyright (c) 2019-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IValidationFieldErrorProps } from './ValidationFieldError.types';

export const ValidationFieldError: React.FC<IValidationFieldErrorProps> = (props) => {
  const { id, linkCallback, fieldName, errors } = props;

  return (
    <li key={id}>
      <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
      <a href={`#${id}`} onClick={linkCallback}>
        {fieldName}
        :
        {' '}
        {errors}
      </a>
    </li>
  );
};
