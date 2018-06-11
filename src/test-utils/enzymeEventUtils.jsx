/**
 * Defines some often used keycodes for
 * event testing
 */
export const KEYCODE = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  DOWN_ARROW: 40,
};

/**
 * Generates a mocked event to be used with
 * enzymes simulate in situations where the
 * tested code wants to call preventDefault
 * and/or stopPropagation.
 * @param {object} props Additional event props
 */
const mockEvent = props => ({
  preventDefault: () => {},
  stopPropagation: () => {},
  ...props,
});

export default mockEvent;
