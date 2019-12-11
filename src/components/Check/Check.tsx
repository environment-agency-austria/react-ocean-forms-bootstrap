/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';

import { FormText, useField } from 'react-ocean-forms';
import { Col, Input, InputGroup, Label } from 'reactstrap';

import { FieldError } from '../FieldLine/FieldError';
import { FieldRow } from '../FieldLine/FieldRow';
import { InfoAddonButton } from '../FieldLine/InfoAddonButton';
import { InfoAlert } from '../FieldLine/InfoAlert';
import { InvalidAlert } from '../FieldLine/InvalidAlert';
import { ValidatingSpinner } from '../FieldLine/ValidatingSpinner';

import { ICheckProps } from './Check.types';

/**
 * Component for displaying bootstrap
 * form groups with an html checkbox and
 * react-ocean-forms support
 */
export const Check = <TSubmitValue extends unknown = boolean>(props: ICheckProps<TSubmitValue>): JSX.Element => {
  const {
    className,
    ...rest
  } = props;

  const { fieldProps, metaProps } = useField(rest);
  const [infoVisible, setInfoVisible] = useState(false);
  const toggleInfo = useCallback(() => {
    setInfoVisible(!infoVisible);
  }, [infoVisible]);

  /**
   * Manually handle the onChange event of
   * the checkbox so we can use the checked
   * property instead of value.
   */
  const handleChange = useCallback((event: React.MouseEvent<HTMLInputElement>) => {
    // event.target.checked exists in this case
    // because of the HtmlInputElement
    // @ts-ignore
    const checked = event.target.checked as boolean;

    fieldProps.onChange({
      target: {
        value: checked,
      },
    });
  }, [fieldProps]);

  const isChecked = rest.value === true;
  const inputGroupClass = rest.info !== undefined ? 'has-info' : undefined;
  const disabled = fieldProps.disabled || metaProps.plaintext;

  return (
    <FieldRow touched={metaProps.touched} valid={metaProps.valid} className={className}>
      <Col sm={3} className="text-right check-label-col">
        <InvalidAlert valid={metaProps.valid} />
        <ValidatingSpinner isValidating={metaProps.isValidating} />
      </Col>
      <Col sm={9}>
        <InputGroup className={inputGroupClass}>
          <Label check>
            <Input
              id={fieldProps.id}
              name={fieldProps.name}
              type="checkbox"
              onBlur={fieldProps.onBlur}
              invalid={!metaProps.valid}
              checked={isChecked}
              onClick={handleChange}
              disabled={disabled}
            />
            <FormText text={rest.label} />
            <FieldError
              id={`${fieldProps.id}_errors`}
              invalid={!metaProps.valid}
              error={metaProps.error}
            />
          </Label>
          <InfoAddonButton info={rest.info} plaintext={metaProps.plaintext} onClick={toggleInfo} />
        </InputGroup>
        <InfoAlert
          visible={infoVisible}
          info={rest.info}
          plaintext={metaProps.plaintext}
          onClose={toggleInfo}
        />
      </Col>
    </FieldRow>
  );
}
