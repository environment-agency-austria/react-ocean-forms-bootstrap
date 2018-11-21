import { ISelectProps } from '../Select';

/**
 * Props for the Select component
 */
export interface ICreatableSelectProps extends ISelectProps {
  /**
   * Label that is shown to create an select option
   */
  createPrefixLabel: string;
}
