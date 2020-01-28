/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useCallback } from 'react';

import { FormText } from 'react-ocean-forms';
import { Col, InputGroup, Label } from 'reactstrap';

import { FieldError } from './FieldError';
import { FieldLineAddon } from './FieldLineAddon';
import { FieldRow } from './FieldRow';
import { InfoAddonButton } from './InfoAddonButton';
import { InfoAlert } from './InfoAlert';
import { InvalidAlert } from './InvalidAlert';
import { RequiredMarker } from './RequiredMarker';
import { ValidatingSpinner } from './ValidatingSpinner';

import { IFieldLineProps } from './FieldLine.types';

/**
 * Component for displaying bootstrap
 * form groups with any children
 */
export const FieldLine: React.FC<IFieldLineProps> = (props) => {
  const {
    fieldProps,
    metaProps,
    label,
    children,
    prefix,
    suffix,
    info,
    labelSize = '3',
    inputSize = '9',
    labelClass = 'text-right',
    containerClass,
  } = props;

  const [infoVisible, setInfoVisible] = useState(false);
  const toggleInfo = useCallback(() => {
    setInfoVisible(oldVisible => !oldVisible);
  }, []);

  return (
    <FieldRow className={containerClass} valid={metaProps.valid} touched={metaProps.touched}>
      <Label sm={labelSize} for={fieldProps.id} className={labelClass}>
        <InvalidAlert valid={metaProps.valid} />
        <ValidatingSpinner isValidating={metaProps.isValidating} />
        <FormText text={label} />
        <RequiredMarker hidden={metaProps.plaintext} required={metaProps.isRequired} />
      </Label>
      <Col sm={inputSize}>
        <InputGroup>
          <FieldLineAddon plaintext={metaProps.plaintext} type="prepend" content={prefix} />
          {children}
          <FieldLineAddon plaintext={metaProps.plaintext} type="append" content={suffix} />
          <InfoAddonButton info={info} plaintext={metaProps.plaintext} onClick={toggleInfo} />
          <FieldError
            id={`${fieldProps.id}_errors`}
            invalid={!metaProps.valid}
            error={metaProps.error}
          />
        </InputGroup>
        <InfoAlert
          visible={infoVisible}
          info={info}
          plaintext={metaProps.plaintext}
          onClose={toggleInfo}
        />
      </Col>
    </FieldRow>
  );
};
