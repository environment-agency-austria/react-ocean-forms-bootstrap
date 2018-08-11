/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Col,
  InputGroup,
} from 'reactstrap';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms';

import RequiredMarker from './components/RequiredMarker';
import InvalidAlert from './components/InvalidAlert';
import ValidatingSpinner from './components/ValidatingSpinner';
import FieldLineAddon from './components/FieldLineAddon';
import InfoAddonButton from './components/InfoAddonButton';
import InfoAlert from './components/InfoAlert';
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
    } = this.props;

    const { infoVisible } = this.state;

    let groupClass = meta.valid ? '' : 'is-invalid';
    groupClass += meta.touched ? ' is-touched' : '';
    groupClass = groupClass.trim();

    const labelString = meta.stringFormatter(label);

    return (
      <FormGroup row className={groupClass}>
        <Label sm="3" for={field.id} className="text-right">
          <InvalidAlert valid={meta.valid} />
          <ValidatingSpinner isValidating={meta.isValidating} />
          {labelString}
          <RequiredMarker meta={meta} validators={validators} />
        </Label>
        <Col sm="9">
          <InputGroup>
            <FieldLineAddon meta={meta} type="prepend" content={prefix} />
            {children}
            <FieldLineAddon meta={meta} type="append" content={suffix} />
            <InfoAddonButton info={info} plaintext={meta.plaintext} onClick={this.toggleInfo} />
            <BaseFieldError
              id={`${field.id}_errors`}
              invalid={!meta.valid}
              error={meta.error}
              context={{ stringFormatter: meta.stringFormatter }}
            />
          </InputGroup>
          <InfoAlert visible={infoVisible} info={info} meta={meta} onClose={this.toggleInfo} />
        </Col>
      </FormGroup>
    );
  }
}

FieldLine.displayName = 'FieldLine';

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
    PropTypes.node,
    PropTypes.func,
  ]),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
};

export default FieldLine;
