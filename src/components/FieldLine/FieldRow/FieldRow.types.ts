import { IFieldComponentMeta } from 'react-ocean-forms';

/**
 * Props for the FieldRow component
 */
export interface IFieldRowProps {
  /**
   * CSS class name to attach to the row
   */
  className?: string;
  /**
   * Field meta
   * @see IFieldComponentMeta
   */
  meta: IFieldComponentMeta;
}
