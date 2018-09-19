import { IFieldComponentProps } from 'react-ocean-forms';
// tslint:disable-next-line:no-submodule-imports
import { InputType } from 'reactstrap/lib/Input';
import { IInfoProps } from '../FieldLine';

/**
 * Props for the Input component
 */
export interface IInputProps extends IFieldComponentProps, IInfoProps {
  /**
   * Html input type
   */
  // tslint:disable-next-line:no-reserved-keywords
  type: InputType;
}
