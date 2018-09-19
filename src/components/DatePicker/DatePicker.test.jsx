import React from 'react';
import Datetime from 'react-datetime';
import { shallow } from 'enzyme';

import { createMockFieldMeta, createMockField } from '../../test-utils/enzymeFormContext';
import { DatePicker } from './DatePicker';
import { FieldLine } from '../FieldLine';

describe('<DatePicker />', () => {
  const FIELD_LABEL = 'field0';

  const meta = createMockFieldMeta();
  const field = createMockField();
  field.value = '';

  const setup = props => shallow((
    <DatePicker
      label={FIELD_LABEL}
      meta={meta}
      field={field}
      {...props}
    />
  ));

  afterEach(() => {
    field.onChange.mockClear();
    field.onBlur.mockClear();
  });

  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a field line and a bootstrap input', () => {
    const wrapper = setup();

    expect(wrapper.find(FieldLine).exists()).toBeTruthy();
    expect(wrapper.find(Datetime).exists()).toBeTruthy();
  });

  it('should react on meta.plaintext correctly', () => {
    meta.plaintext = true;
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
