// import * as React from 'react';

// import { shallow, ShallowWrapper } from 'enzyme';
// import moment from 'moment';
// import { default as Datetime } from 'react-datetime';
// import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

// import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
// import { FieldLine } from '../FieldLine';
// import { BaseDatePicker } from './DatePicker';
// import { IDatePickerProps } from './DatePicker.types';

describe.skip('<DatePicker />', () => {
  // interface ISetupArgs {
  //   props?: Partial<IDatePickerProps>;
  //   fieldOverrides?: Partial<IFieldComponentFieldProps>;
  //   metaOverrides?: Partial<IFieldComponentMeta>;
  // }

  // interface ISetupResult {
  //   wrapper: ShallowWrapper;
  //   field: IFieldComponentFieldProps;
  //   meta: IFieldComponentMeta;
  // }

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

  //   const wrapper = shallow((
  //     <BaseDatePicker
  //       label={fieldLabel}
  //       meta={meta}
  //       field={field}
  //       {...props}
  //     />
  //   ));

  //   return {
  //     wrapper,
  //     meta,
  //     field,
  //   };
  // };

  it('should render correctly', () => {
    // const { wrapper } = setup();
    // expect(wrapper).toMatchSnapshot();
  });

  it('should render a field line and a bootstrap input', () => {
    // const { wrapper } = setup();

    // expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    // expect(wrapper.find(Datetime).exists()).toBeTruthy();
  });

  it('should throw an error if the field value is incompatible (not string, number or undefined)', () => {
    // expect(() => {
    //   setup({ fieldOverrides: { value: true } });
    // }).toThrowError();
  });

  describe('onChange handling', () => {
    it('should not call onChange if the changed value is not a valid moment value', () => {
      // const { wrapper, field } = setup();
      // const onChangeProp: Function | undefined = wrapper.find(Datetime).prop('onChange');

      // if (onChangeProp === undefined) {
      //   throw new Error('Invalid test state');
      // }

      // onChangeProp('mock');
      // expect(field.onChange).not.toHaveBeenCalled();
    });

    it('should call onChange with the formatted value', () => {
      // const { wrapper, field } = setup();
      // const onChangeProp: Function | undefined = wrapper.find(Datetime).prop('onChange');

      // if (onChangeProp === undefined) {
      //   throw new Error('Invalid test state');
      // }

      // const spiedIsMoment = jest.spyOn(moment, 'isMoment');
      // spiedIsMoment.mockReturnValue(true);

      // const mockDate = {
      //   format: jest.fn().mockReturnValue('formatted-mock-date'),
      // };

      // onChangeProp(mockDate);
      // expect(field.onChange).toHaveBeenCalledWith({
      //   target: {
      //     value: 'formatted-mock-date',
      //   },
      // });

      // // Does not work
      // spiedIsMoment.mockRestore();
    });

    it('should call onChange correctly if the changed value is an empty string', () => {
    //   const { wrapper, field } = setup();
    //   const onChangeProp: Function | undefined = wrapper.find(Datetime).prop('onChange');

    //   if (onChangeProp === undefined) {
    //     throw new Error('Invalid test state');
    //   }

    //   onChangeProp('');
    //   expect(field.onChange).toHaveBeenCalledWith({
    //     target: {
    //       value: '',
    //     },
    //   });
    });
  });

  describe('onBlur handling', () => {
    // beforeEach(() => {
    //   jest.clearAllMocks();
    //   jest.restoreAllMocks();
    // });
    it('should call onBlur with no valid date value', () => {
      // const { wrapper, field } = setup();
      // const onBlurProp: Function | undefined = wrapper.find(Datetime).prop('onBlur');

      // if (onBlurProp === undefined) {
      //   throw new Error('Invalid test state');
      // }

      // const spiedIsMoment = jest.spyOn(moment, 'isMoment').mockImplementation(() => false);

      // const mockDate = {
      //   format: jest.fn().mockReturnValue('formatted-mock-date'),
      //   isValid: jest.fn().mockReturnValue(false),
      // };

      // onBlurProp(mockDate);
      // expect(spiedIsMoment).toHaveBeenCalled();
      // expect(field.onChange).toHaveBeenCalledWith({
      //   target: {
      //     value: '',
      //   },
      // });

    });

    it('should call onBlur with valid date value', () => {
      // const { wrapper, field } = setup();
      // const onBlurProp: Function | undefined = wrapper.find(Datetime).prop('onBlur');

      // if (onBlurProp === undefined) {
      //   throw new Error('Invalid test state');
      // }

      // const spiedIsMoment = jest.spyOn(moment, 'isMoment').mockImplementation(() => true);

      // const mockDate = moment.utc([2019, 0, 1]);

      // onBlurProp(mockDate);
      // expect(spiedIsMoment).toHaveBeenCalled();
      // expect(field.onChange).toHaveBeenCalledWith({
      //   target: {
      //     value: '2019-01-01T00:00:00Z',
      //   },
      // });

    });

    it('should call onBlur correctly if the changed value is an empty string', () => {
      // const { wrapper, field } = setup();
      // const onBlurProp: Function | undefined = wrapper.find(Datetime).prop('onBlur');

      // if (onBlurProp === undefined) {
      //   throw new Error('Invalid test state');
      // }

      // onBlurProp('');
      // expect(field.onChange).toHaveBeenCalledWith({
      //   target: {
      //     value: '',
      //   },
      // });

    });
  });

  describe('meta.plaintext handling', () => {
    it('should react on meta.plaintext correctly', () => {
      // const { wrapper } = setup({ metaOverrides: { plaintext: true }});
      // expect(wrapper).toMatchSnapshot();
    });

    describe('getDisplayValue', () => {
      // const displayValueSetup = (props?: Partial<IDatePickerProps>): Function => {
      //   const { wrapper } = setup({
      //     props,
      //     fieldOverrides: {value: moment() },
      //     metaOverrides: { plaintext: true },
      //   });

      //   // @ts-ignore
      //   return (wrapper.instance() as BaseDatePicker).getDisplayValue;
      // };

      const cases = [
        [undefined, undefined, undefined],
        [undefined, false, false],
        ['L', true, undefined],
        ['L', true, false],
        ['LT', undefined, true],
        ['LT', false, true],
        ['L LT', true, true],
        ['Mock', 'Mock', undefined],
        ['Mock LT', 'Mock', true],
        ['Mock', undefined, 'Mock'],
        ['L Mock', true, 'Mock'],
        ['Mock Mock', 'Mock', 'Mock'],
      ];

      it.each(cases)('should format the value with "%s" if dateFormat is %s and timeFormat is %s', (name?: string, dateFormat?: string, timeFormat?: string) => {
      //   const mockDate = {
      //     format: jest.fn().mockReturnValue('mock-date'),
      //     isValid: jest.fn().mockReturnValue(true),
      //   };

      //   const callback = displayValueSetup({
      //     dateFormat,
      //     timeFormat,
      //   });

      //   callback(mockDate);
      //   expect(mockDate.format).toHaveBeenCalledWith(name);
      });
    });
  });
});
