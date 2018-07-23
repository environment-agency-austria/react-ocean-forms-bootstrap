/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { Input as StrapInput } from 'reactstrap';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms';

import FieldLine from './FieldLine';

/**
 * Component for displaying bootstrap
 * form groups with an select input and
 * oForm support
 */
class Select extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  /**
   * Manually handle the onChange event of
   * the select because oForms is expecting
   * default input onChange behaviour.
   */
  handleChange(value) {
    this.props.field.onChange({
      target: {
        name: this.props.field.name,
        value,
      },
    });
  }

  /**
   * Manually handle the onBlur event of
   * the select because oForms is expecting
   * default input onBlur behaviour.
   */
  handleBlur() {
    this.props.field.onBlur({
      target: {
        name: this.props.field.name,
      },
    });
  }

  render() {
    const {
      field,
      placeholder,
      options,
      meta,
    } = this.props;

    // Grab some default texts from the internationalized messages
    const selectPlaceholder = meta.stringFormatter(placeholder);
    const selectNoResults = meta.stringFormatter('ojs_select_noresults');
    const selectClearValue = meta.stringFormatter('ojs_select_clearValue');

    // Generate a css class based on the validity of the select element
    let selectClass = 'react-select-control';
    selectClass = (selectClass + (meta.valid ? '' : ' is-invalid')).trim();

    // Check if the current value has a different label than the value
    // with the same key in the options array. Bugfix to change the
    // selected label when the current language changes.
    if (field.value !== undefined && field.value !== null) {
      const selectableValue = options.find(item => item.value === field.value.value);
      if (selectableValue !== undefined && selectableValue.label !== field.value.label) {
        field.value.label = selectableValue.label;
        this.handleChange(field.value);
      }
    }

    // Support for plaintext display
    if (meta.plaintext) {
      let displayValue = '';
      if (field.value !== undefined && field.value !== null) {
        displayValue = field.value.label;
      }

      return (
        <FieldLine {...this.props}>
          <StrapInput {...field} plaintext>{displayValue}</StrapInput>
        </FieldLine>
      );
    }

    return (
      <FieldLine {...this.props}>
        <ReactSelect
          id={field.id}
          // name={field.name} causes react to crash on change if there's a name?!
          value={field.value}
          disabled={field.disabled}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          options={options}
          placeholder={selectPlaceholder}
          noResultsText={selectNoResults}
          clearValueText={selectClearValue}
          invalid={!meta.valid}
          className={selectClass}
        />
      </FieldLine>
    );
  }
}

Select.defaultProps = {
  info: undefined,
  placeholder: 'ojs_select_placeholder',
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  placeholder: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Select;
