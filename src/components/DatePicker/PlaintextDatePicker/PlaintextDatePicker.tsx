/**
 * Copyright (c) 2019-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useMemo } from 'react';

import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../../FieldLine';
import { PlaintextDatePickerProps } from './PlaintextDatePicker.types';

export const PlaintextDatePicker: React.FC<PlaintextDatePickerProps> = (props) => {
  const { dateFormat, timeFormat, momentValue, fieldProps } = props;

  const displayValue = useMemo((): string => {
    let parsedFormat = '';

    if (!momentValue.isValid()) {
      return '';
    }

    if (typeof dateFormat === 'string') {
      parsedFormat = dateFormat;
    } else if (dateFormat === true) {
      parsedFormat = 'L';
    }

    if (typeof timeFormat === 'string') {
      parsedFormat = `${parsedFormat} ${timeFormat}`.trim();
    } else if (timeFormat === true) {
      parsedFormat = `${parsedFormat} LT`.trim();
    }

    return momentValue.format(parsedFormat === '' ? undefined : parsedFormat);
  }, [dateFormat, momentValue, timeFormat]);

  return (
    <FieldLine {...props}>
      <StrapInput {...fieldProps} value={displayValue} plaintext />
    </FieldLine>
  );
};
