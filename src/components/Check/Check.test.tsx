import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

import { checkInfoToggling } from '../../test-utils/checkInfoToggling';
import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
import { BaseCheck } from './Check';
import { ICheckProps } from './Check.types';

describe('<Check />', () => {
  interface ISetupArgs {
    props?: Partial<ICheckProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
    meta: IFieldComponentMeta;
    field: IFieldComponentFieldProps;
  }

  const setup = ({
    props,
    metaOverrides,
  }: ISetupArgs = {}): ISetupResult => {
    const fieldLabel = 'field0';
    const meta = {
      ...createMockFieldMeta(),
      ...metaOverrides,
    };
    const field = createMockField();

    const wrapper = shallow((
      <BaseCheck
        label={fieldLabel}
        meta={meta}
        field={field}
        {...props}
      />
    ));

    return {
      wrapper,
      meta,
      field,
    };
  };

  it('should render correctly', () => {
    const { wrapper } = setup();

    expect(wrapper.find('Input').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call field.onChange when the input changes', () => {
    const { wrapper, field } = setup();
    const event = { target: { name: field.name, checked: false } };

    wrapper.find('Input').simulate('click', event);
    expect(field.onChange).toHaveBeenCalledWith({
      target: {
        value: false,
      },
    });
  });

  ((): void => {
    const { wrapper } = setup();
    checkInfoToggling(wrapper);
  })();

  it('should add the has-info class to InputGroup if info is present', () => {
    const { wrapper } = setup({ props: { info: 'mock-info' } });
    expect(wrapper.find('InputGroup').prop('className')).toEqual(expect.stringContaining('has-info'));
  });

  it('should not render the checkbox in plaintext mode', () => {
    const { wrapper } = setup(
      { metaOverrides: { plaintext: true } },
    );

    expect(wrapper.find('Input').exists()).toBeTruthy();
  });
});
