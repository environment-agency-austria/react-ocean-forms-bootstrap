/**
 * Props for the FieldRow component
 */
export interface IFieldRowProps {
  /**
   * CSS class name to attach to the row
   */
  className?: string;
  /**
   * True if the field is valid
   */
  valid: boolean;
  /**
   * True if the field has been touched
   */
  touched: boolean;
}
