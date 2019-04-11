/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { FormText, withField } from 'react-ocean-forms';
import { Col, Input, InputGroup, Label } from 'reactstrap';

import { FieldError } from '../FieldLine/FieldError';
import { FieldRow } from '../FieldLine/FieldRow';
import { InfoAddonButton } from '../FieldLine/InfoAddonButton';
import { InfoAlert } from '../FieldLine/InfoAlert';
import { InvalidAlert } from '../FieldLine/InvalidAlert';
import { ValidatingSpinner } from '../FieldLine/ValidatingSpinner';

import { ICheckProps } from './Check.types';

interface ICheckState {
  infoVisible: boolean;
}

/**
 * Component for displaying bootstrap
 * form groups with an html checkbox and
 * oForm support
 */
export class BaseCheck extends React.Component<ICheckProps, ICheckState> {
  public static displayName: string = 'Check';

  constructor(props: ICheckProps) {
    super(props);

    this.state = {
      infoVisible: false,
    };
  }

  /**
   * Toggles the visibility state of the info alert
   */
  private toggleInfo = (): void => {
    this.setState(prevState => ({
      infoVisible: !prevState.infoVisible,
    }));
  }

  /**
   * Manually handle the onChange event of
   * the checkbox so we can use the checked
   * property instead of value.
   */
  private handleChange = (event: React.MouseEvent<HTMLInputElement>): void => {
    const { field } = this.props;

    // event.target.checked exists in this case
    // because of the HtmlInputElement
    // @ts-ignore
    const checked = event.target.checked as boolean;

    field.onChange({
      target: {
        value: checked,
      },
    });
  }

  public render(): JSX.Element {
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
    const disabled = field.disabled || meta.plaintext;

    return (
      <FieldRow meta={meta} className={className}>
        <Col sm={3} className="text-right check-label-col">
          <InvalidAlert valid={meta.valid} />
          <ValidatingSpinner isValidating={meta.isValidating} />
        </Col>
        <Col sm={9}>
          <InputGroup className={inputGroupClass}>
            <Label check>
              <Input
                id={field.id}
                name={field.name}
                type="checkbox"
                onBlur={field.onBlur}
                invalid={!meta.valid}
                checked={isChecked}
                onClick={this.handleChange}
                disabled={disabled}
              />
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

export const Check = withField(BaseCheck);
