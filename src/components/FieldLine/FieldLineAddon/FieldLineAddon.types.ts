export type IFieldLineAddonType = 'prepend' | 'append';

/**
 * Props for the FieldLineAddon component
 */
export interface IFieldLineAddonProps {
  /**
   * Addon type
   */
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
