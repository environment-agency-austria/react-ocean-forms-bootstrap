import { IFieldComponentProps } from 'react-ocean-forms';
import { DefaultizedFieldLineProps } from '../FieldLine';

/**
 * Props for the OnOffToggleButton component
 */
export interface IOnOffToggleButtonProps extends IFieldComponentProps, DefaultizedFieldLineProps {
  /**
   * Label for the on-button
   */
  onLabel: string;
  /**
   * Label for the off-button
   */
  offLabel: string;
}
