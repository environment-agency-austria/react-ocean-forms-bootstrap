import * as FormComponents from './index';

describe('Index', () => {
  describe('Component exports', () => {
    const components = [
      'Check', 'DatePicker', 'FieldLine',
      'FormButton', 'Input', 'OnOffToggleButton',
      'Select', 'ValidationSummary',
    ];

    components.forEach((component) => {
      it(`Should export ${component}`, () => {
        // @ts-ignore
        expect(FormComponents[component]).toBeTruthy();
      });
    });
  });
});
