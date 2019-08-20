import * as  React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';
import { ValidationSummary as CoreValidationSummary } from 'react-ocean-forms';

import { ValidationSummary } from './ValidationSummary';
import { IValidationSummaryProps } from './ValidationSummary.types';
import { IValidationFieldErrorProps } from './ValidationFieldError';

describe('<ValidationSummary />', () => {
  interface ISetupArgs {
    props?: Partial<IValidationSummaryProps>;
  }

  interface ISetupResult {
    wrapper: ShallowWrapper;
  }

  const setup = ({
    props,
  }: ISetupArgs = {}): ISetupResult => {
    const wrapper = shallow((
      <ValidationSummary id="mock-summary" {...props} />
    ));

    return {
      wrapper,
    };
  };

  it('should render without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  describe('render prop', () => {
    const { wrapper } = setup();
    const renderProp = wrapper.find(CoreValidationSummary).prop<((children: JSX.Element) => JSX.Element)>('render');

    it('should set the render prop correctly', () => {
      expect(typeof renderProp).toBe('function');
    });

    it('should correctly render the render prop', () => {
      const mockChildren = <div id="mock" />;
      const renderWrapper = shallow(renderProp(mockChildren));
      expect(renderWrapper).toMatchSnapshot();
    });
  });

  describe('renderFieldError prop', () => {
    const { wrapper } = setup();
    const renderFieldErrorProp = wrapper.find(CoreValidationSummary).prop<((...rest: unknown[]) => JSX.Element)>('renderFieldError');

    it('should set the render prop correctly', () => {
      expect(typeof renderFieldErrorProp).toBe('function');
    });

    it('should correctly render the render prop', () => {
      const renderWrapper = shallow(renderFieldErrorProp(
        'mock-id',
        'mock-name',
        'mock-error',
        jest.fn(),
      ));
      expect(renderWrapper).toMatchSnapshot();
    });
  });

  describe('fieldErrorComponent prop', () => {
    const CustomErrorRenderer: React.FC<IValidationFieldErrorProps> = () => {
      return <div id="mock-error" />;
    };

    const { wrapper } = setup({
      props: {
        fieldErrorComponent: CustomErrorRenderer,
      }
    });
    const renderFieldErrorProp = wrapper.find(CoreValidationSummary).prop<((...rest: unknown[]) => JSX.Element)>('renderFieldError');

    it('should accept custom field error components', () => {
      const renderWrapper = shallow(renderFieldErrorProp(
        'mock-id',
        'mock-name',
        'mock-error',
        jest.fn(),
      ));
      expect(renderWrapper).toMatchSnapshot();
    });
  });
});
