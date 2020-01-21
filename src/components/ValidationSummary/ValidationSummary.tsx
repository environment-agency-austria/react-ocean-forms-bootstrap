/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback } from 'react';

import { ValidationSummary as CoreValidationSummary } from 'react-ocean-forms';
import { Alert } from 'reactstrap';

import { IValidationSummaryProps } from './ValidationSummary.types';
import { ValidationFieldError } from './ValidationFieldError';

const renderSummary = (children: JSX.Element): JSX.Element => {
  return (
    <Alert color="danger" className="validation-summary">
      {children}
    </Alert>
  );
};

/**
 * Component for displaying a summary of all
 * validation errors of the form this component
 * lives in.
 */
export const ValidationSummary: React.FC<IValidationSummaryProps> = (props) => {
  const renderFieldError = useCallback((
    id: string,
    fieldName: string,
    errors: React.ReactNode,
    linkCallback: React.MouseEventHandler,
  ): JSX.Element => {
    const { fieldErrorComponent: FieldErrorComponent = ValidationFieldError } = props;

    return (
      <FieldErrorComponent
        id={id}
        key={id}
        fieldName={fieldName}
        errors={errors}
        linkCallback={linkCallback}
      />
    );
  }, [props]);

  return (
    <CoreValidationSummary
      {...props}
      renderFieldError={renderFieldError}
      render={renderSummary}
    />
  );
};
