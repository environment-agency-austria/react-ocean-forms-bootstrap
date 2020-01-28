// import * as React from 'react';

// import { shallow, ShallowWrapper } from 'enzyme';
// import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

// import { createMockField, createMockFieldMeta } from '../../../test-utils/enzymeFormContext';

// import { ActionMeta } from 'react-select/lib/types';
// import { ISelectFieldValue, ISelectOptions, SelectBase } from '../SelectBase';
// import { BaseCreatableSelect } from './CreatableSelect';
// import { ICreatableSelectProps } from './CreatableSelect.types';

describe('<CreatableSelect />', () => {
  // /**
  //  * Type to expose the private members
  //  */
  // type SelectInstancePrivatesExposed = {
  //   renderSelect(): JSX.Element;
  //   formatCreateLabel(text: string): React.ReactNode;
  //   handleCreateOption (value: string): Promise<void>;
  // };

  // interface ISetupArgs {
  //   props?: Partial<ICreatableSelectProps>;
  //   fieldOverrides?: Partial<IFieldComponentFieldProps>;
  //   metaOverrides?: Partial<IFieldComponentMeta>;
  // }

  // interface ISetupResult {
  //   wrapper: ShallowWrapper;
  //   field: IFieldComponentFieldProps;
  //   meta: IFieldComponentMeta;
  //   options: ISelectOptions;
  // }
  // const exposePrivateMembers = (i: unknown): SelectInstancePrivatesExposed => {
  //   return i as SelectInstancePrivatesExposed;
  // };

  // const setup = ({
  //   props,
  //   metaOverrides,
  //   fieldOverrides,
  // }: ISetupArgs = {}): ISetupResult => {
  //   const fieldLabel = 'field0';
  //   const meta = {
  //     ...createMockFieldMeta(),
  //     ...metaOverrides,
  //   };
  //   const field = {
  //     ...createMockField(),
  //     value: '',
  //     ...fieldOverrides,
  //   };

  //   const options = [
  //     { value: 'one', label: 'One' },
  //     { value: 'two', label: 'Two' },
  //   ];

  //   const handleChange = (value: ISelectFieldValue, action?: ActionMeta): void => {
  //     return;
  //   };

  //   const wrapper = shallow((
  //     <BaseCreatableSelect
  //       label={fieldLabel}
  //       meta={meta}
  //       field={field}
  //       options={options}
  //       handleChange={handleChange}
  //       {...props}
  //     />
  //   ));

  //   return {
  //     wrapper,
  //     field,
  //     meta,
  //     options,
  //   };
  // };

  it('should render correctly', () => {
    // const { wrapper } = setup();
    // expect(wrapper).toMatchSnapshot();
  });

  it('should render a select-base', () => {
    // const { wrapper } = setup();

    // expect(wrapper.find(SelectBase).exists()).toBeTruthy();
  });

  it('should render a react-select Creatable', () => {
    // const { wrapper } = setup();

    // const i = exposePrivateMembers(wrapper.instance());
    // const result = shallow(i.renderSelect());

    // expect(result.exists()).toBe(true);
  });

  it('should format the create label accordingly', () => {
    // // The string that is passed to the component
    // const mockCreatePrefixLabel = 'mock-create-prefix-label';
    // // The label for which the label should be created
    // const formatCreateLabelInput = 'mock-new-entry';
    // // The mocked result from the stringFormatter
    // const mockStringFormatterResult = 'mock-string-formatter-result';
    // const stringFormatter = jest.fn((): string => mockStringFormatterResult);

    // const { wrapper } = setup({
    //   metaOverrides: {
    //     stringFormatter,
    //   },
    //   props: {
    //     createPrefixLabel: mockCreatePrefixLabel,
    //   },
    // });

    // const i = exposePrivateMembers(wrapper.instance());
    // const formatCreateLabelResult = i.formatCreateLabel(formatCreateLabelInput);

    // expect(stringFormatter).toBeCalledWith(mockCreatePrefixLabel);
    // expect(formatCreateLabelResult).toEqual(`${mockStringFormatterResult} '${formatCreateLabelInput}'`);
  });
  describe('onCreateOption', () => {
    it('should return undefined of onCreateOption', () => {
      // const createOptionProp = jest.fn().mockReturnValue(undefined);

      // const { wrapper } = setup({
      //   props: {
      //     onCreateOption: createOptionProp,
      //   },
      // });
      // const i = exposePrivateMembers(wrapper.instance());
      // const result = shallow(i.renderSelect());
      // expect(result.exists()).toBe(true);
      // i.handleCreateOption('abc').catch();
      // expect(createOptionProp).toBeCalled();
    });

    it('should return new select option of onCreateOption', () => {
      // const createOptionProp = jest.fn().mockReturnValue({
      //   value: 'abc',
      //   label: 'abc',
      // });

      // const { wrapper } = setup({
      //   props: {
      //     onCreateOption: createOptionProp,
      //   },
      // });
      // const i = exposePrivateMembers(wrapper.instance());
      // i.handleCreateOption('abc').catch();
      // expect(createOptionProp).toBeCalled();
    });

    it('should call createOption on preselected values', () => {
      // const createOptionProp = jest.fn().mockReturnValue({
      //   value: 'abc',
      //   label: 'abc',
      // });

      // const { field, wrapper } = setup({
      //   props: {
      //     onCreateOption: createOptionProp,
      //   },
      // });
      // field.value = [{ value: 'efg', label: 'efg'}];
      // const i = exposePrivateMembers(wrapper.instance());
      // i.handleCreateOption('abc').catch();
      // expect(createOptionProp).toBeCalled();
    });
    it('should call handleCreateOption without prop onCreateOption', () => {
      // const { field, wrapper } = setup({
      //   props: {
      //   },
      // });
      // field.value = [{ value: 'efg', label: 'efg'}];
      // const i = exposePrivateMembers(wrapper.instance());
      // i.handleCreateOption('abc').catch();
    });
  });
});
