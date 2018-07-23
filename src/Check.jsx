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
  Input,
  FormGroup,
  Label,
  Col,
  Button,
  Alert,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { fieldMetaShape, fieldShape } from 'react-ocean-forms';

import { BaseFieldError } from './FieldError';

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
    const groupClass = (className + (meta.valid ? '' : ' is-invalid')).trim();
    const labelString = meta.stringFormatter(label);

    return (
      <FormGroup row className={groupClass}>
        <Col sm={3} className="text-right check-label-col">
          {!meta.valid && <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />}
          {meta.isValidating && <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />}
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
              {labelString}
              <BaseFieldError
                id={`${field.id}_errors`}
                invalid={!meta.valid}
                error={meta.error}
                context={{ stringFormatter: meta.stringFormatter }}
              />
            </Label>
            {info && (
              <InputGroupAddon addonType="append">
                <Button onClick={this.toggleInfo} outline>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                </Button>
              </InputGroupAddon>
            )}
          </InputGroup>

          {info && (
            <Alert
              color="success"
              className="mt-2"
              isOpen={infoVisible}
              toggle={this.toggleInfo}
            >
              {meta.stringFormatter(info)}
            </Alert>
          )}
        </Col>
      </FormGroup>
    );
  }
}

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
