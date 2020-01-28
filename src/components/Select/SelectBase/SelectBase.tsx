/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useCallback, useMemo } from 'react';
import { Input as StrapInput } from 'reactstrap';

import { useField } from 'react-ocean-forms';
import { ActionMeta } from 'react-select/lib/types';
import { FieldLine } from '../../FieldLine';
import {
  IPreparedSelectProps, ISelectBaseProps, ISelectFieldValue,
  ISelectOption, ISelectOptions, isSelectOption,
} from './SelectBase.types';

/**
 * The type that the field can have
 */
type SelectFieldValue = ISelectFieldValue | undefined;

/**
 * Result of an update
 */
interface IUpdatedLabelsResult {
  /**
   * True, if options were updated
   */
  needsUpdate: boolean;
  /**
   * The options
   */
  selectedOptions: SelectFieldValue;
}

/**
 * Base component for displaying bootstrap
 * form groups with an select input and
 * oForm support
 */
export const SelectBase = <TSubmitValue extends unknown = ISelectFieldValue>(props: ISelectBaseProps<TSubmitValue>): JSX.Element => {
  const {
    renderSelect,
    placeholder = 'ojs_select_placeholder',
    options,

    // booleans
    multi = false,
    loading,
    rtl,
    searchable,
    clearable,

    // Other props (field line)
    ...fieldlineProps
  } = props;

  const { fieldProps, metaProps } = useField(props);

  /**
   * Manually handle the onChange event of
   * the select because oForms is expecting
   * default input onChange behaviour.
   */
  const handleChange = useCallback((value: ISelectFieldValue, action?: ActionMeta): void => {
    const { handleChange } = props;

    fieldProps.onChange({
      target: {
        value,
      },
    });

    if (handleChange) {
      handleChange(value, action);
    }
  }, [fieldProps, props]);

  /**
   * Manually handle the onBlur event of
   * the select because oForms is expecting
   * default input onBlur behaviour.
   */
  const handleBlur = useCallback((): void => {
    fieldProps.onBlur();
  }, [fieldProps]);

  /**
   * Update the label of a select option according to the available options.
   * If null is returned, the label is already up to date.
   *
   * @param options The available select options
   * @param value The value that may need update
   */
  const updateSelectOptionLabel = useCallback((options: ISelectOptions, value: ISelectOption): ISelectOption | undefined => {
    let selectableValue: ISelectOption | undefined;
    options.some(item => {
      if (item.value !== value.value) { return false; }

      selectableValue = item;

      return true;
    });

    if (selectableValue === undefined || selectableValue.label === value.label) {
      return undefined;
    }

    return {
      ...value,
      label: selectableValue.label,
    };
  }, []);

  /**
   * Get the selected options with updated labels.
   * This might be needed if the labels were updated because of a language changes
   * @param options The available options
   * @param value The current value
   */
  const getUpdateLabels = useCallback((options: ISelectOptions, value: SelectFieldValue): IUpdatedLabelsResult => {
    let selectedOptions: SelectFieldValue;
    let needsUpdate = false;

    if (isSelectOption(value)) {
      // If only one option is selected
      const updated = updateSelectOptionLabel(options, value);
      needsUpdate = (updated !== undefined);
      selectedOptions = (needsUpdate)
        ? updated
        : value;
    } else if (Array.isArray(value)) {
      // Map the values
      selectedOptions = value.map(v => {
        const updated = updateSelectOptionLabel(options, v);
        // If null was returned, no updated is needed
        if (updated === undefined) { return v; }
        // Otherwise set the flag to true
        needsUpdate = true;

        return updated;
      });
    }

    return {
      needsUpdate,
      selectedOptions,
    };
  }, [updateSelectOptionLabel]);

  /**
   * Get the value of the field with updated labels
   * @param field The field
   * @param options The available options
   */
  const fieldValue = useMemo(() => {
    const fieldValue = (fieldProps.value as ISelectFieldValue | undefined);
    const {
      needsUpdate,
      selectedOptions,
    } = getUpdateLabels(options, fieldValue);
    if (needsUpdate && selectedOptions !== undefined) {
      // Check if the current value has a different label than the value
      // with the same key in the options array. Bugfix to change the
      // selected label when the current language changes.
      handleChange(selectedOptions);
    }

    return selectedOptions;
  }, [fieldProps.value, getUpdateLabels, handleChange, options]);

  // Support for plaintext display
  if (metaProps.plaintext) {
    let displayValue = '';
    if (isSelectOption(fieldValue)) {
      displayValue = fieldValue.label;
    } else if (Array.isArray(fieldValue)) {
      displayValue = fieldValue.map(v => v.label).join(', ');
    }

    return (
      <FieldLine {...props} fieldProps={fieldProps} metaProps={metaProps}>
        <StrapInput
          {...fieldProps}
          value={displayValue}
          plaintext
          onChange={undefined}
        />
      </FieldLine>
    );
  }

  // Generate a css class based on the validity of the select element
  let selectClass = 'react-select-control';
  selectClass = (selectClass + (metaProps.valid ? '' : ' is-invalid')).trim();

  // Format the placeholder
  const placeholderText = metaProps.stringFormatter(placeholder);

  // Prepare the props for the renderSelect method
  const preparedProps: IPreparedSelectProps = {
    id: fieldProps.id,
    inputId: `${fieldProps.id}-input`,
    value: fieldValue,
    isDisabled: fieldProps.disabled,
    isMulti: multi,
    isRtl: rtl,
    isLoading: loading,
    isSearchable: searchable,
    isClearable: clearable,
    onChange: handleChange,
    onBlur: handleBlur,
    options: options,
    placeholder: placeholderText,
    className: selectClass,
  };

  return (
    <FieldLine
      fieldProps={fieldProps}
      metaProps={metaProps}
      {...fieldlineProps}
    >
      {renderSelect(preparedProps, fieldProps)}
    </FieldLine>
  );
};
