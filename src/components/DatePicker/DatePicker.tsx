/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import moment from 'moment';

import { default as Datetime } from 'react-datetime';
import { withField } from 'react-ocean-forms';
import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../FieldLine';
import { IDatePickerProps } from './DatePicker.types';

/**
 * Component for displaying datetime
 */
export class BaseDatePicker extends React.Component<IDatePickerProps> {
  public static displayName: string = 'DatePicker';

  private handleBlur = (value: moment.Moment | string): void => {
    const { field, inputFormat } = this.props;

    const parsed = moment(value, inputFormat);

    const formatted = (parsed.isValid()) ? parsed : value;

    if (moment.isMoment(formatted)) {
      field.onChange({
        target: {
          value: formatted.format(),
        },
      });
    } else if (value === '') {
      field.onChange({
        target: {
          value,
        },
      });
    } else {
      field.onChange({
        target: {
          value: '',
        },
      });
    }
  }

  private handleChange = (value: moment.Moment | string): void => {
    const { field } = this.props;

    if (moment.isMoment(value)) {
      field.onChange({
        target: {
          value: value.format(),
        },
      });
    } else if (value === '') {
      field.onChange({
        target: {
          value,
        },
      });
    }
  }

  /**
   * Mimicks the behaviour of react-datetime to display
   * the same value in plaintext mode
   */
  private getDisplayValue = (value: moment.Moment): string => {
    const { dateFormat, timeFormat } = this.props;

    let parsedFormat = '';

    if (!value.isValid()) {
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

    return value.format(parsedFormat === '' ? undefined : parsedFormat);
  }

  public render(): JSX.Element {
    const {
      field,
      dateFormat,
      timeFormat,
      meta,
    } = this.props;

    const fieldValue = field.value;
    if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number'
        && !moment.isMoment(fieldValue) && fieldValue !== undefined) {
      throw new Error(
        'Incompatible field value supplied for input component '
        + `${field.id}. Only values with type string, number or undefined are allowed.`,
      );
    }

    const formattedValue = moment(fieldValue);

    // Support for plaintext display
    if (meta.plaintext) {
      const displayValue = this.getDisplayValue(formattedValue);

      return (
        <FieldLine {...this.props}>
          <StrapInput {...field} value={displayValue} plaintext />
        </FieldLine>
      );
    }

    const inputProps = {
      disabled: field.disabled,
    };

    return (
      <FieldLine {...this.props}>
        <Datetime
          value={formattedValue}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          inputProps={inputProps}
          closeOnSelect
        />
      </FieldLine>
    );
  }
}

export const DatePicker = withField(BaseDatePicker);
