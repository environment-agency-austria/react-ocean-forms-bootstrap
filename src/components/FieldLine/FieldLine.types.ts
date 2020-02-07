import { IFieldComponentProps } from 'react-ocean-forms';

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

/**
 * Base props for the FieldLine component
 */
export interface IBaseFieldLineProps extends IInfoProps {
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
  prefix?: React.ReactNode;
  /**
   * Suffix component
   */
  suffix?: React.ReactNode;
}

/**
 * Props for the FieldLine component
 */
export interface IFieldLineProps extends IFieldComponentProps, IBaseFieldLineProps { }
