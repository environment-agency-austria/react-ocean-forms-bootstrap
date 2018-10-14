import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { FormText, IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
import { BaseOnOffToggleButton } from './OnOffToggleButton';
import { IOnOffToggleButtonProps } from './OnOffToggleButton.types';

describe('<BaseOnOffToggleButton />', () => {
  const fieldLabel = 'field0';

  interface ISetupArgs {
    props?: Partial<IOnOffToggleButtonProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
    fieldOverrides?: Partial<IFieldComponentFieldProps>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
    field: IFieldComponentFieldProps;
  }

  const setup = ({
    props,
    metaOverrides,
    fieldOverrides,
  }: ISetupArgs = {}): ISetupResult => {
    const meta = {
      ...createMockFieldMeta(),
      ...metaOverrides,
    };
    const field = {
      ...createMockField(),
      ...fieldOverrides,
    };

    const wrapper = shallow((
      <BaseOnOffToggleButton
        label={fieldLabel}
        meta={meta}
        field={field}
        onLabel="on"
        offLabel="off"
        {...props}
      />
    ));

    return {
      wrapper,
      field,
    };
  };

  it('should render without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render plaintext Button', () => {
    const { wrapper } = setup({
      metaOverrides: {
        plaintext: true,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the correct label in plaintext mode', () => {
    const { wrapper } = setup({
      metaOverrides: { plaintext: true },
      fieldOverrides: { value: false },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly in disabled mode', () => {
    const { wrapper } = setup({
      fieldOverrides: { disabled: true },
    });
    expect(wrapper).toMatchSnapshot();
  });

  const testButton = (value: 'on' | 'off'): void => {
    describe(`${value} Button`, () => {
      const { wrapper, field } = setup();
      const buttonOn = wrapper.find(`#${field.id}-${value}`);

      it('should render labels for button', () => {
        expect(buttonOn.find(FormText).prop('text')).toBe(value);
      });

      it('should trigger onChange on click', () => {
        buttonOn.simulate('click');
        expect(field.onChange).toHaveBeenCalledWith({ target: { value: value === 'on' } });
      });
    });
  };

  testButton('on');
  testButton('off');
});
