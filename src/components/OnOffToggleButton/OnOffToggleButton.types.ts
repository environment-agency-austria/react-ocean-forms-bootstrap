import { IUseFieldProps } from 'react-ocean-forms';

import { IBaseFieldLineProps } from '../FieldLine';

/**
 * Props for the OnOffToggleButton component
 */
export interface IOnOffToggleButtonProps<TSubmitValue> extends IUseFieldProps<boolean, TSubmitValue>, IBaseFieldLineProps {
  /**
   * Label for the on-button
   */
  onLabel?: string;
  /**
   * Label for the off-button
   */
  offLabel?: string;
}
