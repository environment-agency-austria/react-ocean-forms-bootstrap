import { IUseFieldProps } from 'react-ocean-forms';
import { IInfoProps } from '../FieldLine';

/**
 * Props for the Check component
 */
export interface ICheckProps<TSubmitValue> extends IUseFieldProps<boolean, TSubmitValue>, IInfoProps {
  /**
   * CSS class name
   */
  className?: string;
}
