/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { fieldMetaShape } from 'react-ocean-forms';

/**
 * Wrapper for FormGroup that generates additional
 * classes based on the meta state of the field
 */
function FieldRow({
  meta,
  children,
  className,
  ...rest
}) {
  const classes = [className];

  if (!meta.valid) classes.push('is-invalid');
  if (meta.touched) classes.push('is-touched');

  const groupClass = classes.join(' ').trim();

  return (
    <FormGroup row className={groupClass} {...rest}>
      {children}
    </FormGroup>
  );
}

FieldRow.defaultProps = {
  className: '',
};

FieldRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  meta: fieldMetaShape.isRequired,
};

export default FieldRow;
