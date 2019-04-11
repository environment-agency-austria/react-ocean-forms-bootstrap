/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ValidationSummary as CoreValidationSummary } from 'react-ocean-forms';
import { Alert } from 'reactstrap';

import { IValidationSummaryProps } from './ValidationSummary.types';

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
    return (
      <li key={id}>
        <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
        <a href={`#${id}`} onClick={linkCallback}>
          {fieldName}
          :
          {' '}
          {errors}
        </a>
      </li>
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
