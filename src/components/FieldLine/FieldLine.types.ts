import { IFieldComponentProps, TValidator } from 'react-ocean-forms';

/**
 * Props for the FieldLine component
 */
export interface IFieldLineProps extends IFieldComponentProps {
  labelSize: string;
  inputSize: string;
  labelClass: string;

  prefix?: React.ReactType;
  suffix?: React.ReactType;
  validators?: TValidator[];
  info?: string;
}
