/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Input as StrapInput } from 'reactstrap';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms';

import FieldLine from './FieldLine';

/**
 * Component for displaying datetime
 */
class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    if (value instanceof moment) {
      const { field } = this.props;
      field.onChange({
        target: {
          name: field.name,
          value: value.format(),
        },
      });
    }
  }

  render() {
    const {
      field,
      dateFormat,
      timeFormat,
      placeholder,
      meta,
    } = this.props;

    const formattedValue = moment(field.value);
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
          <StrapInput {...field} plaintext>{displayValue}</StrapInput>
        </FieldLine>
      );
    }

    return (
      <FieldLine {...this.props}>
        <Datetime
          id={field.id}
          value={formattedValue}
          placeholder={placeholder}
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

DatePicker.displayName = 'DatePicker';

DatePicker.defaultProps = {
  info: undefined,
  placeholder: 'ojs_select_placeholder',
  dateFormat: null,
  timeFormat: null,
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  timeFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DatePicker;
