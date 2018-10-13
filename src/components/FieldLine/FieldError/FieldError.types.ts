import { TFieldErrors } from 'react-ocean-forms';

/**
 * Props for the FieldError component
 */
export interface IFieldErrorProps {
  /**
   * Id of the field
   */
  id: string;
  /**
   * True if the field is invalid and thus
   * the errors should be shown
   */
  invalid: boolean;
  /**
   * Error array
   * @see TFieldErrors
   */
  error: TFieldErrors;
}
