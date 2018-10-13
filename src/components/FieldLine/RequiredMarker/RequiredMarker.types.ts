import { IFieldComponentMeta, TValidator } from 'react-ocean-forms';

/**
 * Props for the RequiredMarker component
 */
export interface IRequiredMarkerProps {
  /**
   * Sync field validators
   */
  validators?: TValidator[];
  /**
   * Field meta
   * @see IFieldComponentMeta
   */
  meta: IFieldComponentMeta;
}
