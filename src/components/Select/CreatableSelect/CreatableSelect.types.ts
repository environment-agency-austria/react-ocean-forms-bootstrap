import { ISelectProps } from '../Select';
import { ISelectOption } from '../SelectBase';

/**
 * Props for the Select component
 */
export interface ICreatableSelectProps<TSubmitValue> extends ISelectProps<TSubmitValue> {
  /**
   * Label that is shown to create an select option
   */
  createPrefixLabel?: string;
  onCreateOption? (newValue: string): Promise<ISelectOption>;
}
