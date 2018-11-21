import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

import { createMockField, createMockFieldMeta } from '../../../test-utils/enzymeFormContext';

import { ISelectOptions, SelectBase } from '../SelectBase';
import { BaseCreatableSelect } from './CreatableSelect';
import { ICreatableSelectProps } from './CreatableSelect.types';

describe('<CreatableSelect />', () => {
  interface ISetupArgs {
    props?: Partial<ICreatableSelectProps>;
    fieldOverrides?: Partial<IFieldComponentFieldProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
    field: IFieldComponentFieldProps;
    meta: IFieldComponentMeta;
    options: ISelectOptions;
  }

  const setup = ({
    props,
    metaOverrides,
    fieldOverrides,
  }: ISetupArgs = {}): ISetupResult => {
    const fieldLabel = 'field0';
    const meta = {
      ...createMockFieldMeta(),
      ...metaOverrides,
    };
    const field = {
      ...createMockField(),
      value: '',
      ...fieldOverrides,
    };

    const options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
    ];

    const wrapper = shallow((
      <BaseCreatableSelect
        label={fieldLabel}
        meta={meta}
        field={field}
        options={options}
        {...props}
      />
    ));

    return {
      wrapper,
      field,
      meta,
      options,
    };
  };

  it('should render correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a select-base', () => {
    const { wrapper } = setup();

    expect(wrapper.find(SelectBase).exists()).toBeTruthy();
  });
});
