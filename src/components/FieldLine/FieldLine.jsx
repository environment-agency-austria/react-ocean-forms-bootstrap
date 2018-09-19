/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Label, Col, InputGroup } from 'reactstrap';
import { FormText } from 'react-ocean-forms';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms-legacy';

import { FieldRow } from './FieldRow';
import { RequiredMarker } from './RequiredMarker';
import { InvalidAlert } from './InvalidAlert';
import { ValidatingSpinner } from './ValidatingSpinner';
import { FieldLineAddon } from './FieldLineAddon';
import { InfoAddonButton } from './InfoAddonButton';
import { InfoAlert } from './InfoAlert';
import FieldError from './FieldError';

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

  render() {
    const {
      field,
      meta,
      label,
      children,
      validators,
      prefix,
      suffix,
      info,
      labelSize,
      inputSize,
      labelClass,
    } = this.props;

    const { infoVisible } = this.state;

    return (
      <FieldRow meta={meta}>
        <Label sm={labelSize} for={field.id} className={labelClass}>
          <InvalidAlert valid={meta.valid} />
          <ValidatingSpinner isValidating={meta.isValidating} />
          <FormText text={label} />
          <RequiredMarker meta={meta} validators={validators} />
        </Label>
        <Col sm={inputSize}>
          <InputGroup>
            <FieldLineAddon plaintext={meta.plaintext} type="prepend" content={prefix} />
            {children}
            <FieldLineAddon plaintext={meta.plaintext} type="append" content={suffix} />
            <InfoAddonButton info={info} plaintext={meta.plaintext} onClick={this.toggleInfo} />
            <FieldError
              id={`${field.id}_errors`}
              invalid={!meta.valid}
              error={meta.error}
            />
          </InputGroup>
          <InfoAlert
            visible={infoVisible}
            info={info}
            plaintext={meta.plaintext}
            onClose={this.toggleInfo}
          />
        </Col>
      </FieldRow>
    );
  }
}

FieldLine.displayName = 'FieldLine';

FieldLine.defaultProps = {
  info: undefined,
  validators: undefined,
  prefix: undefined,
  suffix: undefined,
  labelSize: 3,
  inputSize: 9,
  labelClass: 'text-right',
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
    PropTypes.node,
    PropTypes.func,
  ]),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  labelSize: PropTypes.string,
  inputSize: PropTypes.string,
  labelClass: PropTypes.string,
};

export default FieldLine;
