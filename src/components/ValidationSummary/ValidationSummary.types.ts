import { IValidationSummaryProps as CoreIValidationSummaryProps } from 'react-ocean-forms';

/**
 * Props for the ValidationSummary component
 */
export interface IValidationSummaryProps extends CoreIValidationSummaryProps {
  /**
   * Title text of the summary
   */
  title: string;
}
