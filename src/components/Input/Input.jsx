/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Input as StrapInput } from 'reactstrap';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms-legacy';

import { FieldLine } from '../FieldLine';

/**
 * Component for displaying bootstrap
 * form groups with an html input and
 * oForm support
 */
function Input(props) {
  const {
    field,
    type,
    meta,
  } = props;

  const invalid = meta.valid === true ? undefined : true;

  return (
    <FieldLine {...props}>
      <StrapInput type={type} {...field} invalid={invalid} plaintext={meta.plaintext}>
        {meta.plaintext ? field.value : undefined}
      </StrapInput>
    </FieldLine>
  );
}

Input.displayName = 'Input';

Input.defaultProps = {
  info: undefined,
  type: 'text',
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
};

export default Input;
