/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { fieldMetaShape } from 'react-ocean-forms';

/**
 * Displays an bootstrap alert containing the parsed
 * info message
 */
function InfoAlert({
  visible,
  info,
  meta,
  onClose,
}) {
  if (meta.plaintext) return null;
  if (!info) return null;

  const infoString = meta.stringFormatter(info);
  return (
    <Alert
      color="success"
      className="mt-2"
      isOpen={visible}
      toggle={onClose}
    >
      {infoString}
    </Alert>
  );
}

InfoAlert.defaultProps = {
  info: undefined,
};

InfoAlert.propTypes = {
  visible: PropTypes.bool.isRequired,
  info: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InfoAlert;
