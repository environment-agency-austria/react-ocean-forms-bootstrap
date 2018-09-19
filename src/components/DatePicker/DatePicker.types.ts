import { IFieldComponentProps } from 'react-ocean-forms';
import { IInfoProps } from '../FieldLine';

/**
 * Props for the DatePicker component
 */
export interface IDatePickerProps extends IFieldComponentProps, IInfoProps {
  dateFormat?: string | boolean;
  timeFormat?: string | boolean;
}
