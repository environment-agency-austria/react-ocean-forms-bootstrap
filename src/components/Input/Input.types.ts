import { IFieldComponentProps } from 'react-ocean-forms';
import { InputType } from 'reactstrap/lib/Input';

import { DefaultizedFieldLineProps } from '../FieldLine';

/**
 * Props for the Input component
 */
export interface IInputProps extends IFieldComponentProps, DefaultizedFieldLineProps {
  /**
   * Html input type
   */
  type: InputType;
}
