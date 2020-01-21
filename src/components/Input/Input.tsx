/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { useField } from 'react-ocean-forms';
import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../FieldLine';
import { IInputProps } from './Input.types';

/**
 * Component for displaying bootstrap
 * form groups with an html input and
 * react-ocean-forms support
 */
export const Input = <TSubmitValue extends unknown>(props: IInputProps<TSubmitValue>): JSX.Element => {
  const {
    type = 'text',
    ...rest
  } = props;

  const { fieldProps, metaProps } = useField(rest);

  const invalid = metaProps.valid === true ? undefined : true;
  const defaultizedValue = fieldProps.value ?? '';

  return (
    <FieldLine {...rest} fieldProps={fieldProps} metaProps={metaProps}>
      <StrapInput type={type} {...fieldProps} value={defaultizedValue} invalid={invalid} plaintext={metaProps.plaintext} />
    </FieldLine>
  );
};
