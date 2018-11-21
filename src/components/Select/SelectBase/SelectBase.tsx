/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import { Input as StrapInput } from 'reactstrap';

import { FieldLine } from '../../FieldLine';
import { IPreparedSelectProps, ISelectBaseProps, ISelectOption, isSelectOption } from './SelectBase.types';

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
  private handleChange = (value: ISelectOption): void => {
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

      // Other props (field line)
      ...fieldlineProps
    } = this.props;

    // Generate a css class based on the validity of the select element
    let selectClass = 'react-select-control';
    selectClass = (selectClass + (meta.valid ? '' : ' is-invalid')).trim();

    // Check if the current value has a different label than the value
    // with the same key in the options array. Bugfix to change the
    // selected label when the current language changes.
    let fieldValue: ISelectOption | undefined;
    if (isSelectOption(field.value)) {
      fieldValue = field.value;
      // tslint:disable-next-line:no-non-null-assertion
      const selectableValue = options.find(item => item.value === fieldValue!.value);
      if (selectableValue !== undefined && selectableValue.label !== field.value.label) {
        field.value.label = selectableValue.label;
        this.handleChange(field.value);
      }
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
