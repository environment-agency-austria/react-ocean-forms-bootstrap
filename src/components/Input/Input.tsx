/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { withField } from 'react-ocean-forms';
import { Input as StrapInput } from 'reactstrap';
import { InputType } from 'reactstrap/lib/Input';

import { FieldLine } from '../FieldLine';
import { IInputProps } from './Input.types';

/**
 * Component for displaying bootstrap
 * form groups with an html input and
 * oForm support
 */
export class BaseInput extends React.Component<IInputProps> {
  public static displayName: string = 'Input';

  public static defaultProps: { type: InputType } = {
    type: 'text',
  };

  public render(): JSX.Element {
    const {
      field,
      type,
      meta,
    } = this.props;

    const invalid = meta.valid === true ? undefined : true;

    const fieldValue = field.value;
    if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number' && fieldValue !== undefined) {
      throw new Error(
        'Incompatible field value supplied for input component '
        + `${field.id}. Only values with type string, number or undefined are allowed.`,
      );
    }

    return (
      <FieldLine {...this.props}>
        <StrapInput type={type} {...field} value={fieldValue} invalid={invalid} plaintext={meta.plaintext} />
      </FieldLine>
    );
  }
}

export const Input = withField(BaseInput);
