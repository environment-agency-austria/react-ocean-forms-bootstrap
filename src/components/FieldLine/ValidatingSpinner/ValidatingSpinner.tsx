/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IValidatingSpinnerProps } from './ValidatingSpinner.types';

/**
 * Displays an error icon if valid is false
 */
export class ValidatingSpinner extends React.Component<IValidatingSpinnerProps> {
  public static displayName: string = 'ValidatingSpinner';

  public render(): JSX.Element | null {
    const { isValidating } = this.props;

    if (!isValidating) { return null; }

    return (
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className="ico-loading mr-2"
      />
    );
  }
}
