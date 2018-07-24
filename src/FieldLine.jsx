/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import {
  FormGroup,
  Label,
  Col,
  Button,
  Alert,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { fieldMetaShape, fieldShape, validators as defaultValidators } from 'react-ocean-forms';

import { BaseFieldError } from './FieldError';

/**
 * Component for displaying bootstrap
 * form groups with any children
 */
class FieldLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoVisible: false,
    };

    this.toggleInfo = this.toggleInfo.bind(this);
  }

  /**
   * Toggles the visibility of the info alert
   */
  toggleInfo() {
    this.setState(prevState => ({
      infoVisible: !prevState.infoVisible,
    }));
  }

  /**
   * Creates a * marker for the label if the field
   * contains a default required validator
   */
  createRequiredMarker() {
    const {
      validators,
      meta,
    } = this.props;

    if (meta.plaintext) {
      // Hide the required star in plaintext mode
      return null;
    }

    if (Array.isArray(validators) && validators.includes(defaultValidators.required)) {
      const requiredTitle = meta.stringFormatter('ojs_field_required');
      return <span className="field-required" title={requiredTitle}> *</span>;
    }

    return null;
  }

  /**
   * Creates a info button addon if the field
   * has a info property provided
   */
  createInfoAddonButton() {
    const {
      info,
    } = this.props;

    if (info) {
      return (
        <InputGroupAddon addonType="append">
          <Button onClick={this.toggleInfo} outline>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </Button>
        </InputGroupAddon>
      );
    }

    return null;
  }

  createAddon(item, type) {
    if (!item) return null;

    const { meta } = this.props;

    let child = null;
    if (typeof item === 'function') {
      child = item();
    } else {
      child = meta.stringFormatter(item);
    }

    return (
      <InputGroupAddon addonType={type}>
        {child}
      </InputGroupAddon>
    );
  }

  createPrefix() {
    const { prefix } = this.props;
    return this.createAddon(prefix, 'prepend');
  }

  createSuffix() {
    const { suffix } = this.props;
    return this.createAddon(suffix, 'append');
  }

  /**
   * Creates a info alert if the field
   * has a info property provided
   */
  createInfoAlert() {
    const {
      info,
      meta,
    } = this.props;

    const {
      infoVisible,
    } = this.state;

    if (info) {
      const infoString = meta.stringFormatter(info);
      return (
        <Alert
          color="success"
          className="mt-2"
          isOpen={infoVisible}
          toggle={this.toggleInfo}
        >
          {infoString}
        </Alert>
      );
    }

    return null;
  }

  render() {
    const {
      field,
      meta,
      label,
      children,
    } = this.props;

    // Generate optional elements
    const requiredMarker = this.createRequiredMarker();
    const infoButton = this.createInfoAddonButton();
    const infoAlert = this.createInfoAlert();

    const invalidAlert = meta.valid
      ? null
      : <FontAwesomeIcon icon={faExclamationCircle} className="ico-invalid mr-2" />;

    const validatingSpinner = meta.isValidating
      ? <FontAwesomeIcon icon={faSpinner} spin className="ico-loading mr-2" />
      : null;

    const groupClass = meta.valid ? '' : 'is-invalid';
    const labelString = meta.stringFormatter(label);

    const prefixItem = this.createPrefix();
    const suffixItem = this.createSuffix();

    return (
      <FormGroup row className={groupClass}>
        <Label sm="3" for={field.id} className="text-right">
          {invalidAlert}
          {validatingSpinner}
          {labelString}
          {requiredMarker}
        </Label>
        <Col sm="9">
          <InputGroup>
            {prefixItem}
            {children}
            {suffixItem}
            {infoButton}
            <BaseFieldError
              id={`${field.id}_errors`}
              invalid={!meta.valid}
              error={meta.error}
              context={{ stringFormatter: meta.stringFormatter }}
            />
          </InputGroup>

          {infoAlert}
        </Col>
      </FormGroup>
    );
  }
}

FieldLine.defaultProps = {
  info: undefined,
  validators: undefined,
  prefix: undefined,
  suffix: undefined,
};

FieldLine.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  validators: PropTypes.arrayOf(PropTypes.func),
  prefix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default FieldLine;
