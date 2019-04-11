/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { FormText, PropsOf } from 'react-ocean-forms';
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

interface IFieldLineState {
  infoVisible: boolean;
}

/**
 * Component for displaying bootstrap
 * form groups with any children
 */
export class FieldLine extends React.Component<IFieldLineProps, IFieldLineState> {
  public static displayName: string = 'FieldLine';

  public static defaultProps = {
    labelSize: '3',
    inputSize: '9',
    labelClass: 'text-right',
  };

  constructor(props: IFieldLineProps) {
    super(props);

    this.state = {
      infoVisible: false,
    };
  }

  /**
   * Toggles the visibility of the info alert
   */
  private toggleInfo = (): void => {
    this.setState(prevState => ({
      infoVisible: !prevState.infoVisible,
    }));
  }

  public render(): JSX.Element {
    const {
      field,
      meta,
      label,
      children,
      prefix,
      suffix,
      info,
      labelSize,
      inputSize,
      labelClass,
    } = this.props;

    const { infoVisible } = this.state;

    return (
      <FieldRow meta={meta}>
        <Label sm={labelSize} for={field.id} className={labelClass}>
          <InvalidAlert valid={meta.valid} />
          <ValidatingSpinner isValidating={meta.isValidating} />
          <FormText text={label} />
          <RequiredMarker meta={meta} />
        </Label>
        <Col sm={inputSize}>
          <InputGroup>
            <FieldLineAddon plaintext={meta.plaintext} type="prepend" content={prefix} />
            {children}
            <FieldLineAddon plaintext={meta.plaintext} type="append" content={suffix} />
            <InfoAddonButton info={info} plaintext={meta.plaintext} onClick={this.toggleInfo} />
            <FieldError
              id={`${field.id}_errors`}
              invalid={!meta.valid}
              error={meta.error}
            />
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

export type DefaultizedFieldLineProps = JSX.LibraryManagedAttributes<typeof FieldLine, PropsOf<typeof FieldLine>>;
