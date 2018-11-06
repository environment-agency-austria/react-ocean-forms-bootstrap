/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { FormGroup } from 'reactstrap';

import { IFieldRowProps } from './FieldRow.types';

/**
 * Wrapper for FormGroup that generates additional
 * classes based on the meta state of the field
 */
export class FieldRow extends React.Component<IFieldRowProps> {
  public static displayName: string = 'FieldRow';

  public render(): JSX.Element {
    const {
      meta,
      children,
      className,
      ...rest
    } = this.props;

    const classes = className === '' || className === undefined ? [] : [className];

    if (!meta.valid) { classes.push('is-invalid'); }
    if (meta.touched) { classes.push('is-touched'); }

    const groupClass = classes.join(' ').trim();

    return (
      <FormGroup row className={groupClass} {...rest}>
        {children}
      </FormGroup>
    );
  }
}
