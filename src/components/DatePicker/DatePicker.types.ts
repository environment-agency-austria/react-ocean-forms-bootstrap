import moment from 'moment';
import { IUseFieldProps } from 'react-ocean-forms';

import { IBaseFieldLineProps } from '../FieldLine';

export interface IBaseDatePickerProps {
  dateFormat?: string | boolean;
  timeFormat?: string | boolean;
  inputFormat?: string | [string];
}

/**
 * Props for the DatePicker component
 */
export interface IDatePickerProps<TSubmitValue> extends
  IBaseDatePickerProps,
  IUseFieldProps<moment.MomentInput, TSubmitValue>,
  IBaseFieldLineProps { }
