/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../../FieldLine';
import {
  IPreparedSelectProps, ISelectBaseProps, ISelectFieldValue,
  ISelectOption, ISelectOptions, isSelectOption,
} from './SelectBase.types';

/**
 * Base component for displaying bootstrap
 * form groups with an select input and
 * oForm support
 */
export class SelectBase extends React.Component<ISelectBaseProps> {
  public static displayName: string = 'SelectBase';

  // tslint:disable-next-line:typedef
  public static defaultProps = {
    multi: false,
    placeholder: 'ojs_select_placeholder',
  };

  /**
   * Manually handle the onChange event of
   * the select because oForms is expecting
   * default input onChange behaviour.
   */
  private handleChange = (value: ISelectFieldValue): void => {
    const { field } = this.props;

    field.onChange({
      target: {
        value,
      },
    });
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
   * Update the label of a select option according to the available options
   *
   * @param options The available select options
   * @param value The value that may need update
   */
  private updateSelectOptionLabel(options: ISelectOptions, value: ISelectOption): ISelectOption | null {
    const selectableValue = options.find(item => item.value === value.value);

    if (selectableValue === undefined || selectableValue.label === value.label) {
      return null;
    }

    return {
      ...value,
      label: selectableValue.label,
    };
  }

  private updateLabels(options: ISelectOptions, value: ISelectFieldValue): void {
    let valueToChange: ISelectFieldValue | null = null;
    let needsUpdate = false;

    if (isSelectOption(value)) {
      // If only one option is selected
      valueToChange = this.updateSelectOptionLabel(options, value);
      needsUpdate = (valueToChange !== null);
    } else if (Array.isArray(value)) {
      // Map the values
      valueToChange = value.map(v => {
        const updated = this.updateSelectOptionLabel(options, v);
        // If null was returned, no updated is needed
        if (updated === null) { return v; }
        // Otherwise set the flag to true
        needsUpdate = true;

        return updated;
      });
    }

    // If the value is null, nothing needs to be updated
    if (valueToChange === null || !needsUpdate) { return; }

    this.handleChange(valueToChange);
  }

  // tslint:disable-next-line:member-ordering
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

    // Generate a css class based on the validity of the select element
    let selectClass = 'react-select-control';
    selectClass = (selectClass + (meta.valid ? '' : ' is-invalid')).trim();

    const fieldValue = (field.value as ISelectFieldValue | undefined);
    if (fieldValue !== undefined) {
      // Check if the current value has a different label than the value
      // with the same key in the options array. Bugfix to change the
      // selected label when the current language changes.
      this.updateLabels(options, fieldValue);
    }

    // Support for plaintext display
    if (meta.plaintext) {
      let displayValue = '';
      if (isSelectOption(field.value)) {
        displayValue = field.value.label;
      }

      return (
        <FieldLine {...this.props}>
          <StrapInput {...field} value="" plaintext>
            {displayValue}
          </StrapInput>
        </FieldLine>
      );
    }

    // Format the placeholder
    const placeholderText = meta.stringFormatter(placeholder);

    // Prepare the props for the renderSelect method
    const preparedProps: IPreparedSelectProps = {
      id: field.id,
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
