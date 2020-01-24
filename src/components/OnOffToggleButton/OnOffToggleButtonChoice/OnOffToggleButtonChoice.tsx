import React from 'react';

import { Button } from 'reactstrap';
import { FormText } from 'react-ocean-forms';

import { OnOffToggleButtonChoiceProps } from './OnOffToggleButtonChoice.types';

export const OnOffToggleButtonChoice: React.FC<OnOffToggleButtonChoiceProps> = (props) => {
  const {
    fieldProps,
    variant,
    label,
    onClick,
  } = props;

  const isOn = fieldProps.value ?? true;
  const active = (variant === 'on' && isOn) || (variant === 'off' && !isOn);

  return (
    <Button
      id={`${fieldProps.id}-${variant}`}
      color="primary"
      onClick={onClick.bind(null, variant === 'on')}
      outline
      active={active}
      disabled={fieldProps.disabled}
    >
      <FormText text={label} />
    </Button>
  );
};
