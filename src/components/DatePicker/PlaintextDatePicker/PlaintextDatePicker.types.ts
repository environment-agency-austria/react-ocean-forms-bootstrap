import { IUseFieldResult } from 'react-ocean-forms';
import moment from 'moment';

import { IBaseFieldLineProps } from '../../FieldLine';
import { IBaseDatePickerProps } from '../DatePicker.types';

export interface PlaintextDatePickerProps extends IBaseDatePickerProps, IBaseFieldLineProps, IUseFieldResult<unknown> {
  momentValue: moment.Moment;
}
