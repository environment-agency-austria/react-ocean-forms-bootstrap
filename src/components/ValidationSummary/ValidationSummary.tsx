/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { ValidationSummary as CoreValidationSummary } from 'react-ocean-forms';
import { Alert } from 'reactstrap';

import { IValidationSummaryProps } from './ValidationSummary.types';
import { ValidationFieldError } from './ValidationFieldError';

/**
 * Component for displaying a summary of all
 * validation errors of the form this component
 * lives in.
 */
export class ValidationSummary extends React.Component<IValidationSummaryProps> {
  public static displayName: string = 'ValidationSummary';

  private renderFieldError = (
    id: string,
    fieldName: string,
    errors: React.ReactNode,
    linkCallback: React.MouseEventHandler,
  ): JSX.Element => {
    const { fieldErrorComponent: FieldErrorComponent = ValidationFieldError } = this.props;

    return (
      <FieldErrorComponent
        id={id}
        fieldName={fieldName}
        errors={errors}
        linkCallback={linkCallback}
      />
    );
  }

  private renderSummary = (children: JSX.Element): JSX.Element => {
    return (
      <Alert color="danger" className="validation-summary">
        {children}
      </Alert>
    );
  }

  public render(): JSX.Element {
    return (
      <CoreValidationSummary
        {...this.props}
        renderFieldError={this.renderFieldError}
        render={this.renderSummary}
      />
    );
  }
}
