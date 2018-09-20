/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import moment from 'moment';
// tslint:disable-next-line:import-name
import Datetime from 'react-datetime';
import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../FieldLine';
import { IDatePickerProps } from './DatePicker.types';

/**
 * Component for displaying datetime
 */
export class DatePicker extends React.Component<IDatePickerProps> {
  public static displayName: string = 'DatePicker';

  private handleChange = (value: moment.Moment | string): void => {
    if (!(moment.isMoment(value))) { return; }

    const { field } = this.props;
    // @ts-ignore Tested to work
    field.onChange({
      target: {
        name: field.name,
        value: value.format(),
      },
    });
  }

  // tslint:disable-next-line:member-ordering
  public render(): JSX.Element {
    const {
      field,
      dateFormat,
      timeFormat,
      meta,
    } = this.props;

    const fieldValue = field.value;
    if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number'
        && typeof fieldValue !== 'number' && !moment.isMoment(fieldValue)
        && fieldValue !== undefined) {
      throw new Error(
        'Incompatible field value supplied for input component '
        + `${field.id}. Only values with type string, number or undefined are allowed.`,
      );
    }

    const formattedValue = moment(fieldValue);
    const inputProps = {
      disabled: field.disabled,
    };

    // Support for plaintext display
    if (meta.plaintext) {
      let displayValue = '';
      let parsedFormat = '';

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

      displayValue = formattedValue.format(parsedFormat === '' ? undefined : parsedFormat);

      return (
        <FieldLine {...this.props}>
          <StrapInput {...field} value="" plaintext>{displayValue}</StrapInput>
        </FieldLine>
      );
    }

    return (
      <FieldLine {...this.props}>
        <Datetime
          value={formattedValue}
          onChange={this.handleChange}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          inputProps={inputProps}
          closeOnSelect
        />
      </FieldLine>
    );
  }
}
