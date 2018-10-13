/**
 * Props for the InfoAddonButton component
 */
export interface IInfoAddonButtonProps {
  /**
   * ???
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
