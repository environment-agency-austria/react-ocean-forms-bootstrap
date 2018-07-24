/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input as StrapInput, Label } from 'reactstrap';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms';

import FieldLine from './FieldLine';

/**
 * Component for displaying bootstrap
 * form groups with an html file input and
 * oForm support
 */
function FileInput(props) {
  const {
    field,
    meta,
  } = props;

  const selectFileString = meta.stringFormatter('ojs_form_select_file');

  if (meta.plaintext) {
    return (
      <FieldLine {...props}>
        <StrapInput {...field} plaintext>{selectFileString}</StrapInput>
      </FieldLine>
    );
  }

  return (
    <FieldLine {...props}>
      <div className="custom-file">
        <StrapInput type="file" {...field} />
        <Label for={field.id} className="custom-file-label">
          {selectFileString}
        </Label>
      </div>
    </FieldLine>
  );
}

FileInput.displayName = 'FileInput';

FileInput.defaultProps = {
  info: undefined,
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
};

export default FileInput;
