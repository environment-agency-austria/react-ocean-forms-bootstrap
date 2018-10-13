import { IFieldComponentProps } from 'react-ocean-forms';
import { IInfoProps } from '../FieldLine';

/**
 * Props for the Check component
 */
export interface ICheckProps extends IFieldComponentProps, IInfoProps {
  /**
   * CSS class name
   */
  className?: string;
}
