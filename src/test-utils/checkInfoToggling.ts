import { ShallowWrapper } from 'enzyme';

/**
 * Re-usable test suite to check the info visibility
 * toggling between InfoAlert and InfoAddonButton
 */
export const checkInfoToggling = (wrapper: ShallowWrapper): void => {
  describe('info visible toggling', () => {
    const getVisibility = (): boolean => wrapper.find('InfoAlert').prop('visible');

    const toggleCases = [
      ['InfoAddonButton', 'onClick'],
      ['InfoAlert', 'onClose'],
    ];

    describe.each(toggleCases)('%s click', (element: string, prop: string) => {
      let visibility = getVisibility();

      it(`should toggle the info visibility on ${element} click`, () => {
        for (let i = 0; i < 2; i += 1) {
          const callback: Function = wrapper.find(element).prop(prop);
          callback();

          const newVisibility = getVisibility();
          expect(newVisibility).toBe(!visibility);
          visibility = newVisibility;
        }
      });
    });
  });
};
