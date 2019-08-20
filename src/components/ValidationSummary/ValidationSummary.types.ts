import * as React from 'react';
import { PropsOf, Subtract, ValidationSummary } from 'react-ocean-forms';

import { IValidationFieldErrorProps } from './ValidationFieldError';

type TUpstreamValidationSummaryProps = PropsOf<typeof ValidationSummary>;

/**
 * Props for the ValidationSummary component
 */
export interface IValidationSummaryProps extends Subtract<TUpstreamValidationSummaryProps, { render: string; renderFieldError: string }> {
  fieldErrorComponent?: React.ComponentType<IValidationFieldErrorProps>;
}
