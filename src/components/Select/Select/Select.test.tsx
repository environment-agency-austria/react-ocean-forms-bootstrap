import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';
import { SelectBase as ReactSelect } from 'react-select';

import { createMockField, createMockFieldMeta } from '../../../test-utils/enzymeFormContext';
import { ISelectOptions, SelectBase } from '../SelectBase';
import { BaseSelect } from './Select';
import { ISelectProps } from './Select.types';

describe('<Select />', () => {
  interface ISetupArgs {
    props?: Partial<ISelectProps>;
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
      <BaseSelect
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

  it('should render a react-select', () => {
    const { wrapper } = setup();

    type SelectInstance = { renderSelect(): JSX.Element };
    const i = ((wrapper.instance()) as unknown) as SelectInstance;
    const result = shallow(i.renderSelect());

    expect(result.find(ReactSelect).exists()).toBeTruthy();
  });
});
