/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, InputGroupAddon } from 'reactstrap';
import { useFormText } from 'react-ocean-forms';

import { IInfoAddonButtonProps } from './InfoAddonButton.types';

/**
 * Displays an input addon with an info icon button
 */
export const InfoAddonButton: React.FC<IInfoAddonButtonProps> = (props) => {
  const { info, plaintext, onClick } = props;

  const titleText = useFormText('ojs_show_information');

  if (plaintext) { return null; }
  if (info === undefined || info === '') { return null; }

  return (
    <InputGroupAddon addonType="append">
      <Button onClick={onClick} outline title={titleText}>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </Button>
    </InputGroupAddon>
  );
};
