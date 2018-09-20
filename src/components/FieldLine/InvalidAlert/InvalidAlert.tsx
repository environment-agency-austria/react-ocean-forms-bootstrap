/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IInvalidAlertProps } from './InvalidAlert.types';

/**
 * Displays an error icon if valid is false
 */
export class InvalidAlert extends React.Component<IInvalidAlertProps> {
  public static displayName: string = 'InvalidAlert';

  public render(): JSX.Element | null {
    const { valid } = this.props;

    if (valid) { return null; }

    return (
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className="ico-invalid mr-2"
      />
    );
  }
}
