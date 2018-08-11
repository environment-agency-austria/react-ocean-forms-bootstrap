/**
 * Re-usable test suite to check the info visibility
 * toggling between InfoAlert and InfoAddonButton
 */
const checkInfoToggling = (wrapper) => {
  describe('info visible toggling', () => {
    const getVisibility = () => wrapper.find('InfoAlert').prop('visible');

    const toggleCases = [
      ['InfoAddonButton', 'onClick'],
      ['InfoAlert', 'onClose'],
    ];

    describe.each(toggleCases)('%s click', (element, prop) => {
      let visibility = getVisibility();

      it(`should toggle the info visibility on ${element} click`, () => {
        for (let i = 0; i < 2; i += 1) {
          wrapper.find(element).prop(prop)();
          const newVisibility = getVisibility();
          expect(newVisibility).toBe(!visibility);
          visibility = newVisibility;
        }
      });
    });
  });
};

export default checkInfoToggling;
