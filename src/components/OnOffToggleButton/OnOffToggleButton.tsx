/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback } from 'react';

import { useField } from 'react-ocean-forms';
import {  ButtonGroup } from 'reactstrap';

import { FieldLine } from '../FieldLine';
import { IOnOffToggleButtonProps } from './OnOffToggleButton.types';
import { PlaintextOnOffToggleButton } from './PlaintextOnOffToggleButton';
import { OnOffToggleButtonChoice } from './OnOffToggleButtonChoice';

/**
 * Component for displaying bootstrap
 * form groups with an html input and
 * oForm support
 */
export const OnOffToggleButton = <TSubmitValue extends unknown = boolean>(props: IOnOffToggleButtonProps<TSubmitValue>): JSX.Element => {
  const {
    onLabel = 'ojs_togglebutton_on',
    offLabel = 'ojs_togglebutton_off',
    ...rest
  } = props;

  const { fieldProps, metaProps } = useField(rest);

  const { onChange } = fieldProps;
  const onRadioBtnClick = useCallback((value: boolean) => {
    onChange({
      target: {
        value,
      }
    });
  }, [onChange]);

  if (metaProps.plaintext) {
    return (
      <PlaintextOnOffToggleButton
        fieldProps={fieldProps}
        metaProps={metaProps}
        onLabel={onLabel}
        offLabel={offLabel}
        {...rest}
      />
    );
  }

  return (
    <FieldLine {...rest} fieldProps={fieldProps} metaProps={metaProps}>
      <ButtonGroup id={fieldProps.id}>
        <OnOffToggleButtonChoice
          variant="on"
          label={onLabel}
          fieldProps={fieldProps}
          onClick={onRadioBtnClick}
        />
        <OnOffToggleButtonChoice
          variant="off"
          label={offLabel}
          fieldProps={fieldProps}
          onClick={onRadioBtnClick}
        />
      </ButtonGroup>
    </FieldLine>
  );
};
