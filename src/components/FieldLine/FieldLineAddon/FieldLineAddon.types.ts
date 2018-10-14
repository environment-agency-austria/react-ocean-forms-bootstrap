export type IFieldLineAddonType = 'prepend' | 'append';

/**
 * Props for the FieldLineAddon component
 */
export interface IFieldLineAddonProps {
  /**
   * Addon type
   */
  // tslint:disable-next-line:no-reserved-keywords
  type: IFieldLineAddonType;
  /**
   * Form plaintext mode
   */
  plaintext: boolean;
  /**
   * Addon content / child
   */
  content?: React.ReactNode;
}
