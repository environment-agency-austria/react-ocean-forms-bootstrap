/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { FormText, withField } from 'react-ocean-forms';
import { Button, ButtonGroup } from 'reactstrap';

import { FieldLine } from '../FieldLine';
import { BaseInput } from '../Input';
import { IOnOffToggleButtonProps } from './OnOffToggleButton.types';

/**
 * Component for displaying bootstrap
 * form groups with an html input and
 * oForm support
 */
export class BaseOnOffToggleButton extends React.Component<IOnOffToggleButtonProps> {
  public static displayName: string = 'OnOffToggleButton';

  public static defaultProps = {
    onLabel: 'ojs_togglebutton_on',
    offLabel: 'ojs_togglebutton_off',
  };

  private onRadioBtnClick = (value: boolean): void => {
    const { field: { onChange } } = this.props;

    onChange({
      target: {
        value,
      },
    });
  }

  private onOnButtonClick = (): void => {
    this.onRadioBtnClick(true);
  }

  private onOffButtonClick = (): void => {
    this.onRadioBtnClick(false);
  }

  public render(): JSX.Element {
    const {
      field,
      onLabel,
      offLabel,
      meta: {
        plaintext,
        stringFormatter,
      },
      field: {
        value,
      },
    } = this.props;

    const isOn = !(value === '' || value === false);

    if (plaintext) {
      const plainField = {
        ...field,
        value: isOn ? stringFormatter(onLabel) : stringFormatter(offLabel),
      };

      return (
        <BaseInput
          {...this.props}
          field={plainField}
        />
      );
    }

    return (
      <FieldLine {...this.props}>
        <ButtonGroup id={field.id}>
          <Button
            id={`${field.id}-on`}
            color="primary"
            onClick={this.onOnButtonClick}
            outline
            active={isOn}
            disabled={field.disabled}
          >
            <FormText text={onLabel} />
          </Button>
          <Button
            id={`${field.id}-off`}
            color="primary"
            onClick={this.onOffButtonClick}
            outline
            active={!isOn}
            disabled={field.disabled}
          >
            <FormText text={offLabel} />
          </Button>
        </ButtonGroup>
      </FieldLine>
    );
  }
}

export const OnOffToggleButton = withField(BaseOnOffToggleButton);
