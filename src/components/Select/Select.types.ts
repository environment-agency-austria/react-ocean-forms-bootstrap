import { IFieldComponentProps } from 'react-ocean-forms';
import { IInfoProps } from '../FieldLine';

/**
 * Selectable option
 */
export interface ISelectOption {
  /**
   * Display label
   */
  label: string;
  /**
   * Internal value
   */
  value: string;
}

// tslint:disable-next-line:no-any
export function isSelectOption(object: any): object is ISelectOption {
  return object && typeof object.label === 'string' && typeof object.value === 'string';
}

/**
 * Type for an array of ISelectOption
 * @see ISelectOption
 */
export type ISelectOptions = ISelectOption[];

/**
 * Props for the Select component
 */
export interface ISelectProps extends IFieldComponentProps, IInfoProps {
  /**
   * Placeholder string that will be displayed while
   * the component is empty
   */
  placeholder: string;
  /**
   * True, if the select component should be in multi-select mode
   */
  multi: boolean;
  /**
   * Selectable options
   */
  options: ISelectOptions;
}
