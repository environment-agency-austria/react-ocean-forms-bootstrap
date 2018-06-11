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
      this.props.field.onChange({
        target: {
          name: this.props.field.name,
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
    } = this.props;

    const formattedValue = moment(field.value);

    return (
      <FieldLine {...this.props}>
        <Datetime
          id={field.id}
          value={formattedValue}
          placeholder={placeholder}
          onChange={this.handleChange}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          closeOnSelect
        />
      </FieldLine>
    );
  }
}

DatePicker.defaultProps = {
  info: undefined,
  placeholder: 'ojs_select_placeholder',
};

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
  placeholder: PropTypes.string,
};

export default DatePicker;
