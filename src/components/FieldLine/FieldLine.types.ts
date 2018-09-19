import { IFieldComponentProps, TValidator } from 'react-ocean-forms';

/**
 * Props for the FieldLine component
 */
export interface IFieldLineProps extends IFieldComponentProps, IInfoProps {
  /**
   * Label size for the bootstrap label column
   */
  labelSize: string;
  /**
   * Input size for the bootstrap input column
   */
  inputSize: string;
  /**
   * CssClass for the label column
   */
  labelClass: string;

  /**
   * Prefix component
   */
  prefix?: React.ReactType;
  /**
   * Suffix component
   */
  suffix?: React.ReactType;
  /**
   * Validators
   */
  validators?: TValidator[];
}

/**
 * Props for components that use the info
 * feature of the FieldLine
 */
export interface IInfoProps {
  /**
   * Info text
   */
  info?: string;
}
