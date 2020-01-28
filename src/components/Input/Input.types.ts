import { IUseFieldProps } from 'react-ocean-forms';
import { InputType } from 'reactstrap/lib/Input';

import { IBaseFieldLineProps } from '../FieldLine';

type DefaultHtmlInputValueType = React.InputHTMLAttributes<HTMLInputElement>['value'];

/**
 * Props for the Input component
 */
export interface IInputProps<TSubmitValue> extends IUseFieldProps<DefaultHtmlInputValueType, TSubmitValue>, IBaseFieldLineProps {
  /**
   * Html input type
   */
  type?: InputType;
}
