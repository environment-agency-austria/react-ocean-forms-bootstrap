/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { InputGroupAddon, InputGroupText } from 'reactstrap';
import { FormText } from 'react-ocean-forms';

/**
 * Displays a prefix / suffix addon for the FieldLine
 */
function FieldLineAddon({ plaintext, content, type }) {
  if (plaintext) return null;
  if (!content) return null;

  let child = null;
  if (typeof content === 'string') {
    child = (
      <InputGroupText>
        <FormText text={content} />
      </InputGroupText>
    );
  } else {
    child = content;
  }

  return (
    <InputGroupAddon addonType={type}>
      {child}
    </InputGroupAddon>
  );
}

FieldLineAddon.defaultProps = {
  content: null,
};

FieldLineAddon.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  plaintext: PropTypes.bool.isRequired,
};

export default FieldLineAddon;
