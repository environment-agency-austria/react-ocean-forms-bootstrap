import { IFieldComponentProps } from 'react-ocean-forms';
// tslint:disable-next-line:no-submodule-imports
import { InputType } from 'reactstrap/lib/Input';

/**
 * Props for the Input component
 */
export interface IInputProps extends IFieldComponentProps {
  // tslint:disable-next-line:no-reserved-keywords
  type: InputType;
  info?: string;
}
