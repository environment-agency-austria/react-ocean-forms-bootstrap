import { IFieldComponentProps } from 'react-ocean-forms';
import { IInfoProps } from '../FieldLine';

/**
 * Props for the OnOffToggleButton component
 */
export interface IOnOffToggleButtonProps extends IFieldComponentProps, IInfoProps {
  /**
   * Label for the on-button
   */
  onLabel: string;
  /**
   * Label for the off-button
   */
  offLabel: string;
}
