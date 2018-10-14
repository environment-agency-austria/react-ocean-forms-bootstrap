import { PropsOf, Subtract, ValidationSummary } from 'react-ocean-forms';

type TUpstreamValidationSummaryProps = PropsOf<typeof ValidationSummary>;

/**
 * Props for the ValidationSummary component
 */
export interface IValidationSummaryProps extends Subtract<TUpstreamValidationSummaryProps, { render: string; renderFieldError: string }> { }
