/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { IFieldComponentProps } from 'react-ocean-forms';
import { Props as SelectProps } from 'react-select/lib/Select';
import { ActionMeta } from 'react-select/lib/types';

import { DefaultizedFieldLineProps } from '../../FieldLine';

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

export function isSelectOption(object: any): object is ISelectOption {
  return object && typeof (object as ISelectOption).label === 'string' && typeof (object as ISelectOption).value === 'string';
}

/**
 * Type for an array of ISelectOption
 * @see ISelectOption
 */
export type ISelectOptions = ISelectOption[];

/**
 * Types for the value that the field can have
 */
export type ISelectFieldValue = ISelectOption | ISelectOption[];

/**
 * Wrapper for the base props that maps the props from react-select
 */
interface IMappedReactSelectProps {
  /**
   * optional id for component instead of name as id
   */
  id?: string;

  /**
   * Selectable options
   */
  options: ISelectOptions;
  /**
   * Placeholder string that will be displayed while
   * the component is empty
   */
  placeholder: string;
  /**
   * True, if the select component should be in multi-select mode
   */
  multi?: boolean;
  /**
   * Renders the component from right-to-left
   */
  rtl?: boolean;
  /**
   * If true, the component shows an loading state
   */
  loading?: boolean;
  /**
   * True if the component is searchable, false otherwise.
   */
  searchable?: boolean;
  /**
   * True if the component is clearable, false otherwise.
   */
  clearable?: boolean;
  /**
   * custom code for onChange
   */
  handleChange?(value: ISelectFieldValue, action?: ActionMeta): void;
}

export interface ISelectBasePropsBase extends
  IFieldComponentProps,
  DefaultizedFieldLineProps,
  IMappedReactSelectProps {
}

/**
 * The props that are prepared by the `SelectBase` component
 * and passed to the `renderSelect` method
 */
export type IPreparedSelectProps = SelectProps;

/**
 * Props for the `SelectBase` component
 */
export interface ISelectBaseProps extends ISelectBasePropsBase {
  /**
   * Callback to render the actual select component with `preparedProps`
   * @param preparedProps The prepared props for the select
   */
  renderSelect(preparedProps: IPreparedSelectProps): JSX.Element;
  handleChange?(value: ISelectFieldValue, action?: ActionMeta): void;
}
