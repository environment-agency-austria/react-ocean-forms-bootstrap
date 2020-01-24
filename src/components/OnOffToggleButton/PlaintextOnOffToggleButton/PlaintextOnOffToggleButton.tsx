import React from 'react';

import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../../FieldLine';
import { PlaintextOnOffToggleButtonProps } from './PlaintextOnOffToggleButton.types';

export const PlaintextOnOffToggleButton: React.FC<PlaintextOnOffToggleButtonProps> = (props) => {
  const {
    fieldProps,
    metaProps,
    onLabel,
    offLabel,
    ...rest
  } = props;

  const isOn = !(fieldProps.value ?? false);
  const plaintextValue = isOn ? metaProps.stringFormatter(onLabel) : metaProps.stringFormatter(offLabel);
  const plaintextValid = metaProps.valid === true ? undefined : true;

  return (
    <FieldLine {...rest} fieldProps={fieldProps} metaProps={metaProps}>
      <StrapInput
        {...fieldProps}
        value={plaintextValue}
        invalid={plaintextValid}
        onChange={undefined}
        plaintext
        readOnly
      />
    </FieldLine>
  );
};
