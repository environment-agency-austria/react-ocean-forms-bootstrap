/**
 * Props for the InfoAlert component
 */
export interface IInfoAlertProps {
  /**
   * True if the info alert should be visible
   */
  visible: boolean;
  /**
   * Info text
   */
  info?: string;
  /**
   * True if the form is in plaintext mode
   */
  plaintext: boolean;
  /**
   * onClose callback
   */
  onClose(): void;
}
