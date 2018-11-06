import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentMeta } from 'react-ocean-forms';

import { createMockFieldMeta } from '../../../test-utils/enzymeFormContext';
import { FieldRow } from './FieldRow';
import { IFieldRowProps } from './FieldRow.types';

describe('<FieldRow />', () => {
  const baseClassName = 'mock-class';

  interface ISetupArgs {
    props?: Partial<IFieldRowProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
  }

  const setup = ({
    props,
    metaOverrides,
  }: ISetupArgs = {}): ISetupResult => {
    const meta = {
      ...createMockFieldMeta(),
      ...metaOverrides,
    };

    const wrapper = shallow((
      <FieldRow
        meta={meta}
        className={baseClassName}
        {...props}
      >
        <div id="mock" />
      </FieldRow>
    ));

    return {
      wrapper,
    };
  };

  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should work without the className prop', () => {
    const { wrapper } = setup({ props: { className: undefined } });
    expect(wrapper).toMatchSnapshot();
  });

  const metaCases = [
    ['field is invalid', 'valid', false, 'is-invalid'],
    ['field is touched', 'touched', true, 'is-touched'],
  ];

  describe.each(metaCases)('%s', (name: string, prop: string, value: boolean, className: string) => {
    it(`should set the class ${className} to the FormGroup if meta.${prop} is ${value}`, () => {
      const { wrapper } = setup({
        metaOverrides: { [prop]: value },
      });

      const groupClass = wrapper.find('FormGroup').prop('className');
      expect(groupClass).toEqual(expect.stringContaining(className));
      expect(groupClass).toEqual(expect.stringContaining(baseClassName));
    });

    it(`should NOT set the class ${className} to the FormGroup if meta.${prop} is ${!value}`, () => {
      const { wrapper } = setup({
        metaOverrides: { [prop]: !value },
      });

      const groupClass = wrapper.find('FormGroup').prop('className');
      expect(groupClass).toEqual(expect.not.stringContaining(className));
      expect(groupClass).toEqual(expect.stringContaining(baseClassName));
    });
  });
});
