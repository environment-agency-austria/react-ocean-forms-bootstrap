import { IFieldComponentProps } from 'react-ocean-forms';
import { DefaultizedFieldLineProps } from '../FieldLine';

/**
 * Props for the DatePicker component
 */
export interface IDatePickerProps extends IFieldComponentProps, DefaultizedFieldLineProps {
  dateFormat?: string | boolean;
  timeFormat?: string | boolean;
  inputFormat?: string | [string];
}
