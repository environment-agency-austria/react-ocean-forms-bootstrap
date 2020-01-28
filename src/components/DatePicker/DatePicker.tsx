/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback } from 'react';

import moment from 'moment';
import { default as Datetime } from 'react-datetime';
import { useField } from 'react-ocean-forms';

import { FieldLine } from '../FieldLine';
import { IDatePickerProps } from './DatePicker.types';
import { PlaintextDatePicker } from './PlaintextDatePicker';

/**
 * Component for displaying datetime
 */
export const DatePicker = <TSubmitValue extends unknown = string>(props: IDatePickerProps<TSubmitValue>): JSX.Element => {
  const {
    dateFormat, timeFormat, inputFormat,
    ...rest
  } = props;

  const { fieldProps, metaProps } = useField(rest);

  const handleBlur = useCallback((value: moment.Moment | string) => {
    const parsed = moment(value, inputFormat);

    const formatted = (parsed.isValid()) ? parsed : value;

    if (moment.isMoment(formatted)) {
      fieldProps.onChange({
        target: {
          value: formatted.format(),
        },
      });
    } else if (value === '') {
      fieldProps.onChange({
        target: {
          value,
        },
      });
    } else {
      fieldProps.onChange({
        target: {
          value: '',
        },
      });
    }
  }, [fieldProps, inputFormat]);

  const handleChange = useCallback((value: moment.MomentInput) => {
    if (moment.isMoment(value)) {
      fieldProps.onChange({
        target: {
          value: value.format(),
        },
      });
    } else if (value === '') {
      fieldProps.onChange({
        target: {
          value,
        },
      });
    }
  }, [fieldProps]);

  const fieldValue = fieldProps.value;
  if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number'
      && !moment.isMoment(fieldValue) && fieldValue !== undefined) {
    throw new Error(
      'Incompatible field value supplied for input component '
      + `${fieldProps.id}. Only values with type string, number or undefined are allowed.`,
    );
  }

  const formattedValue = moment(fieldValue);

  // Support for plaintext display
  if (metaProps.plaintext) {
    return (
      <PlaintextDatePicker
        label={props.label}
        fieldProps={fieldProps}
        metaProps={metaProps}
        momentValue={formattedValue}
      />
    );
  }

  const inputProps = {
    disabled: fieldProps.disabled,
  };

  return (
    <FieldLine {...props} fieldProps={fieldProps} metaProps={metaProps}>
      <Datetime
        value={formattedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        inputProps={inputProps}
        closeOnSelect
      />
    </FieldLine>
  );
};
