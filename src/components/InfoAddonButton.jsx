/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroupAddon } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';

/**
 * Displays an input addon with an info icon button
 */
function InfoAddonButton({ info, plaintext, onClick }) {
  if (plaintext) return null;
  if (!info) return null;

  return (
    <InputGroupAddon addonType="append">
      <Button onClick={onClick} outline>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </Button>
    </InputGroupAddon>
  );
}

InfoAddonButton.defaultProps = {
  info: undefined,
};

InfoAddonButton.propTypes = {
  info: PropTypes.string,
  plaintext: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default InfoAddonButton;
