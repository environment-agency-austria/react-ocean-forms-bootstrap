/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Label,
  Col,
  InputGroup,
} from 'reactstrap';
import { FormText, fieldMetaShape, fieldShape } from 'react-ocean-forms';

import FieldRow from './components/FieldRow';
import InvalidAlert from './components/InvalidAlert';
import ValidatingSpinner from './components/ValidatingSpinner';
import InfoAddonButton from './components/InfoAddonButton';
import InfoAlert from './components/InfoAlert';
import FieldError from './components/FieldError';

/**
 * Component for displaying bootstrap
 * form groups with an html checkbox and
 * oForm support
 */
class Check extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoVisible: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  /**
   * Toggles the visibility state of the info alert
   */
  toggleInfo() {
    this.setState(prevState => ({
      infoVisible: !prevState.infoVisible,
    }));
  }

  /**
   * Manually handle the onChange event of
   * the checkbox so we can use the checked
   * property instead of value.
   */
  handleChange(event) {
    const { field } = this.props;
    field.onChange({
      target: {
        name: field.name,
        value: event.target.checked,
      },
    });
  }

  render() {
    const {
      field,
      label,
      className,
      meta,
      info,
      field: {
        value,
      },
    } = this.props;

    const { infoVisible } = this.state;

    const isChecked = value === true;
    const inputGroupClass = info !== undefined ? 'has-info' : undefined;

    return (
      <FieldRow meta={meta} className={className}>
        <Col sm={3} className="text-right check-label-col">
          <InvalidAlert valid={meta.valid} />
          <ValidatingSpinner isValidating={meta.isValidating} />
        </Col>
        <Col sm={9}>
          <InputGroup className={inputGroupClass}>
            <Label check>
              {!meta.plaintext && (
                <Input
                  id={field.id}
                  name={field.name}
                  type="checkbox"
                  onBlur={field.onBlur}
                  invalid={!meta.valid}
                  defaultChecked={isChecked}
                  onClick={this.handleChange}
                  disabled={field.disabled}
                />
              )}
              <FormText text={label} />
              <FieldError
                id={`${field.id}_errors`}
                invalid={!meta.valid}
                error={meta.error}
              />
            </Label>
            <InfoAddonButton info={info} plaintext={meta.plaintext} onClick={this.toggleInfo} />
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

Check.displayName = 'Check';

Check.defaultProps = {
  info: undefined,
  className: undefined,
};

Check.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
  className: PropTypes.string,
};

export default Check;
