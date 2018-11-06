/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, InputGroupAddon } from 'reactstrap';

import { IInfoAddonButtonProps } from './InfoAddonButton.types';

/**
 * Displays an input addon with an info icon button
 */
export class InfoAddonButton extends React.Component<IInfoAddonButtonProps> {
  public static displayName: string = 'InfoAddonButton';

  public render(): JSX.Element | null {
    const { info, plaintext, onClick } = this.props;

    if (plaintext) { return null; }
    if (info === undefined || info === '') { return null; }

    return (
      <InputGroupAddon addonType="append">
        <Button onClick={onClick} outline>
          <FontAwesomeIcon icon={faExclamationCircle} />
        </Button>
      </InputGroupAddon>
    );
  }
}
