/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';

import { FormGroup } from 'reactstrap';

import { IFieldRowProps } from './FieldRow.types';

/**
 * Wrapper for FormGroup that generates additional
 * classes based on the meta state of the field
 */
export const FieldRow: React.FC<IFieldRowProps> = (props) => {
  const {
    valid,
    touched,
    children,
    className,
    ...rest
  } = props;

  const classes = className === '' || className === undefined ? [] : [className];

  if (!valid) { classes.push('is-invalid'); }
  if (touched) { classes.push('is-touched'); }

  const groupClass = classes.join(' ').trim();

  return (
    <FormGroup row className={groupClass} {...rest}>
      {children}
    </FormGroup>
  );
};
