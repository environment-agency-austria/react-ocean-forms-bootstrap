import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import moment from 'moment';
import { default as Datetime } from 'react-datetime';
import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
import { FieldLine } from '../FieldLine';
import { BaseDatePicker } from './DatePicker';
import { IDatePickerProps } from './DatePicker.types';

describe('<DatePicker />', () => {
  interface ISetupArgs {
    props?: Partial<IDatePickerProps>;
    fieldOverrides?: Partial<IFieldComponentFieldProps>;
    metaOverrides?: Partial<IFieldComponentMeta>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
    field: IFieldComponentFieldProps;
    meta: IFieldComponentMeta;
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

    const wrapper = shallow((
      <BaseDatePicker
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
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a field line and a bootstrap input', () => {
    const { wrapper } = setup();

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    expect(wrapper.find(Datetime).exists()).toBeTruthy();
  });

  it('should throw an error if the field value is incompatible (not string, number or undefined)', () => {
    expect(() => {
      setup({ fieldOverrides: { value: true } });
    }).toThrowError();
  });

  describe('onChange handling', () => {
    it('should not call onChange if the changed value is not a valid moment value', () => {
      const { wrapper, field } = setup();
      const onChangeProp = wrapper.find(Datetime).prop('onChange');

      if (onChangeProp === undefined) {
        throw new Error('Invalid test state');
      }

      onChangeProp('mock');
      expect(field.onChange).not.toHaveBeenCalled();
    });

    it('should call onChange with the formatted value', () => {
      const { wrapper, field } = setup();
      const onChangeProp = wrapper.find(Datetime).prop('onChange');

      if (onChangeProp === undefined) {
        throw new Error('Invalid test state');
      }

      jest.spyOn(moment, 'isMoment').mockReturnValue(true);

      const mockDate = {
        format: jest.fn().mockReturnValue('formatted-mock-date'),
      };

      // @ts-ignore
      onChangeProp(mockDate);
      expect(field.onChange).toHaveBeenCalledWith({
        target: {
          value: 'formatted-mock-date',
        },
      });
    });
  });

  describe('meta.plaintext handling', () => {
    it('should react on meta.plaintext correctly', () => {
      const { wrapper } = setup({ metaOverrides: { plaintext: true }});
      expect(wrapper).toMatchSnapshot();
    });

    describe('getDisplayValue', () => {
      const displayValueSetup = (props?: Partial<IDatePickerProps>): Function => {
        const { wrapper } = setup({
          props,
          metaOverrides: { plaintext: true },
        });

        // @ts-ignore
        return wrapper.instance().getDisplayValue;
      };

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

      it.each(cases)('should format the value with "%s" if dateFormat is %s and timeFormat is %s', (name, dateFormat, timeFormat) => {
        const mockDate = {
          format: jest.fn().mockReturnValue('mock-date'),
        };

        const callback = displayValueSetup({
          dateFormat,
          timeFormat,
        });

        callback(mockDate);
        expect(mockDate.format).toHaveBeenCalledWith(name);
      });
    });
  });
});