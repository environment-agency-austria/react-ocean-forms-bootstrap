import React from 'react';
import { validators as defaultValidators } from 'react-ocean-forms';
import { mount } from 'enzyme';

import createMockFormatter from '../test-utils/createMockFormatter';
import FieldLine from '../FieldLine';

describe('<FieldLine />', () => {
  const FIELD_LABEL = 'ojs_select_placeholder';
  const FIELD_ID = 'field0';
  const FIELD_NAME = 'field0';

  const TestComponent = () => (<div id={FIELD_ID} />);

  let formGroup = null;
  let label = null;
  let inputColumn = null;

  afterEach(() => {
    formGroup = null;
    label = null;
    inputColumn = null;
  });

  const setup = (props) => {
    const wrapper = mount((
      <FieldLine {...props}>
        <TestComponent />
      </FieldLine>
    ));

    formGroup = wrapper.find('.row.form-group');
    label = formGroup.find('label.col-form-label.col-sm-3');
    inputColumn = formGroup.find('.col-sm-9');

    return wrapper;
  };

  const generateProps = (info, meta, field, validators) => ({
    label: FIELD_LABEL, info, meta, field, validators,
  });

  const generateMeta = (valid, error, isValidating, plaintext) => ({
    valid,
    error,
    isValidating,
    plaintext,
    touched: false,
    stringFormatter: createMockFormatter(),
  });

  const generateField = value => ({
    value,
    id: FIELD_ID,
    name: FIELD_NAME,
    disabled: false,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  });

  it('should render the proper base html', () => {
    setup(generateProps(
      null,
      generateMeta(true, null, false, false),
      generateField(''),
      null,
    ));

    expect(formGroup.exists()).toBeTruthy();

    expect(label.exists()).toBeTruthy();
    expect(label.prop('htmlFor')).toEqual(FIELD_ID);
    expect(label.text()).toEqual(FIELD_LABEL);

    expect(inputColumn.exists()).toBeTruthy();
    expect(inputColumn.find(TestComponent).exists()).toBeTruthy();
  });

  it('should display an info button if provided with info id', () => {
    setup(generateProps(
      'ojs_select_noresults',
      generateMeta(true, null, false, false),
      generateField(''),
      null,
    ));

    expect(inputColumn.find('InputGroupAddon').exists()).toBeTruthy();
    expect(inputColumn.find('Alert').exists()).toBeTruthy();
    expect(inputColumn.find('Alert').prop('isOpen')).toEqual(false);
  });

  it('should open the info alert if the info button is clicked', () => {
    const wrapper = setup(generateProps(
      'ojs_select_noresults',
      generateMeta(true, null, false, false),
      generateField(''),
      null,
    ));

    expect(wrapper.find('Alert').prop('isOpen')).toEqual(false);
    inputColumn.find('InputGroupAddon Button').simulate('click');

    expect(wrapper.find('Alert').prop('isOpen')).toEqual(true);
  });

  it('should display an required marker if it has a required validator', () => {
    setup(generateProps(
      null,
      generateMeta(true, null, false, false),
      generateField(''),
      [defaultValidators.required],
    ));

    const requiredMarker = label.find('.field-required');
    expect(requiredMarker.exists()).toBeTruthy();
    expect(requiredMarker.prop('title')).toEqual('ojs_field_required');
    expect(requiredMarker.text()).toEqual(' *');
  });

  it('should display a spinner if the state isValidating is true', () => {
    setup(generateProps(
      null,
      generateMeta(true, null, true, false),
      generateField(''),
      null,
    ));

    expect(label.find('svg.ico-loading').exists()).toBeTruthy();
  });

  it('should display an error if the field is invalid', () => {
    setup(generateProps(
      null,
      generateMeta(
        false,
        {
          message_id: 'ojs_error_alphaNumeric',
          params: {},
        },
        false,
        false,
      ),
      generateField(''),
      null,
    ));

    expect(formGroup.hasClass('is-invalid')).toBe(true);
    expect(label.find('svg.ico-invalid').exists()).toBeTruthy();

    const fieldError = inputColumn.find('FieldError');
    expect(fieldError.exists()).toBeTruthy();
    expect(fieldError.prop('invalid')).toEqual(true);
    expect(fieldError.text()).toEqual('ojs_error_alphaNumeric');
  });

  it('should support prefixes and suffixes', () => {
    const wrapper = setup({
      prefix: 'demo',
      suffix: 'blubb',
      ...generateProps(
        null,
        generateMeta(true, null, false, false),
        generateField(''),
        null,
      ),
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should support prefixes and suffixes with functions', () => {
    const wrapper = setup({
      prefix: () => <div>custom prefix</div>,
      suffix: () => <div>custom suffix</div>,
      ...generateProps(
        null,
        generateMeta(true, null, false, false),
        generateField(''),
        null,
      ),
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should change the group class if the field has been touched', () => {
    const meta = generateMeta(true, null, false, false);
    meta.touched = true;

    setup(generateProps(
      null,
      meta,
      generateField(''),
      null,
    ));

    expect(formGroup.prop('className')).toEqual(expect.stringContaining('is-touched'));
  });

  describe('plaintext mode', () => {
    it('should not display a required marker', () => {
      setup(generateProps(
        null,
        generateMeta(true, null, false, true),
        generateField(''),
        [defaultValidators.required],
      ));

      const requiredMarker = label.find('.field-required');
      expect(requiredMarker.exists()).not.toBeTruthy();
    });

    it('should not display prefixes and suffixes', () => {
      const wrapper = setup({
        prefix: 'demo',
        suffix: 'blubb',
        ...generateProps(
          null,
          generateMeta(true, null, false, true),
          generateField(''),
          null,
        ),
      });

      expect(wrapper).toMatchSnapshot();
    });

    it('should not display an info button', () => {
      setup(generateProps(
        'ojs_select_noresults',
        generateMeta(true, null, false, true),
        generateField(''),
        null,
      ));

      expect(inputColumn.find('InputGroupAddon').exists()).not.toBeTruthy();
      expect(inputColumn.find('Alert').exists()).not.toBeTruthy();
    });
  });
});
