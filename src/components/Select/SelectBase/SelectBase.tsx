/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Input as StrapInput } from 'reactstrap';

import { IFieldComponentFieldProps } from 'react-ocean-forms';
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
export class SelectBase extends React.Component<ISelectBaseProps> {
  public static displayName: string = 'SelectBase';

  public static defaultProps = {
    multi: false,
    placeholder: 'ojs_select_placeholder',
  };

  /**
   * Manually handle the onChange event of
   * the select because oForms is expecting
   * default input onChange behaviour.
   */
  private handleChange = (value: ISelectFieldValue, action?: ActionMeta): void => {
    const { field, handleChange } = this.props;

    field.onChange({
      target: {
        value,
      },
    });

    if (handleChange) {
      handleChange(value, action);
    }
  }

  /**
   * Manually handle the onBlur event of
   * the select because oForms is expecting
   * default input onBlur behaviour.
   */
  private handleBlur = (): void => {
    const { field } = this.props;

    field.onBlur();
  }

  /**
   * Update the label of a select option according to the available options.
   * If null is returned, the label is already up to date.
   *
   * @param options The available select options
   * @param value The value that may need update
   */
  private updateSelectOptionLabel(options: ISelectOptions, value: ISelectOption): ISelectOption | undefined {
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
  }

  /**
   * Get the selected options with updated labels.
   * This might be needed if the labels were updated because of a language changes
   * @param options The available options
   * @param value The current value
   */
  private getUpdateLabels(options: ISelectOptions, value: SelectFieldValue): IUpdatedLabelsResult {
    let selectedOptions: SelectFieldValue;
    let needsUpdate = false;

    if (isSelectOption(value)) {
      // If only one option is selected
      const updated = this.updateSelectOptionLabel(options, value);
      needsUpdate = (updated !== undefined);
      selectedOptions = (needsUpdate)
        ? updated
        : value;
    } else if (Array.isArray(value)) {
      // Map the values
      selectedOptions = value.map(v => {
        const updated = this.updateSelectOptionLabel(options, v);
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
  }

  /**
   * Get the value of the field with updated labels
   * @param field The field
   * @param options The available options
   */
  private getFieldValue(field: IFieldComponentFieldProps, options: ISelectOptions): SelectFieldValue {
    const fieldValue = (field.value as ISelectFieldValue | undefined);
    const {
      needsUpdate,
      selectedOptions,
    } = this.getUpdateLabels(options, fieldValue);
    if (needsUpdate && selectedOptions !== undefined) {
      // Check if the current value has a different label than the value
      // with the same key in the options array. Bugfix to change the
      // selected label when the current language changes.
      this.handleChange(selectedOptions);
    }

    return selectedOptions;
  }

  /**
   * Renders a plain text view
   * @param field The field
   * @param value The selected value
   */
  private renderPlaintext(field: IFieldComponentFieldProps, value: SelectFieldValue): JSX.Element {
    let displayValue = '';
    if (isSelectOption(value)) {
      displayValue = value.label;
    } else if (Array.isArray(value)) {
      displayValue = value.map(v => v.label).join(', ');
    }

    return (
      <FieldLine {...this.props}>
        <StrapInput {...field} value={displayValue} plaintext />
      </FieldLine>
    );
  }

  public render(): JSX.Element {
    const {
      renderSelect,
      field,
      placeholder,
      options,
      meta,

      // booleans
      multi,
      loading,
      rtl,
      searchable,
      clearable,

      // Other props (field line)
      ...fieldlineProps
    } = this.props;

    const fieldValue = this.getFieldValue(field, options);

    // Support for plaintext display
    if (meta.plaintext) {
      return this.renderPlaintext(field, fieldValue);
    }

    // Generate a css class based on the validity of the select element
    let selectClass = 'react-select-control';
    selectClass = (selectClass + (meta.valid ? '' : ' is-invalid')).trim();

    // Format the placeholder
    const placeholderText = meta.stringFormatter(placeholder);

    // Prepare the props for the renderSelect method
    const preparedProps: IPreparedSelectProps = {
      id: field.id,
      inputId: `${field.id}-input`,
      value: fieldValue,
      isDisabled: field.disabled,
      isMulti: multi,
      isRtl: rtl,
      isLoading: loading,
      isSearchable: searchable,
      isClearable: clearable,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      options: options,
      placeholder: placeholderText,
      className: selectClass,
    };

    return (
      <FieldLine
        meta={meta}
        field={field}
        {...fieldlineProps}
      >
        {renderSelect(preparedProps)}
      </FieldLine>
    );
  }
}
