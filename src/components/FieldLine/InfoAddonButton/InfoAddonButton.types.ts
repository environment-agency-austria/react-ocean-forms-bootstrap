/**
 * Props for the InfoAddonButton component
 */
export interface IInfoAddonButtonProps {
  /**
   * Info text - will hide this button if empty
   */
  info?: string;
  /**
   * Form plaintext mode
   */
  plaintext: boolean;
  /**
   * OnClick event handler
   * @param event Event
   */
  onClick(event: React.MouseEvent): void;
}
