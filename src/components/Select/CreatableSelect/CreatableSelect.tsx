/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useCallback } from 'react';
import { useFormContext, IFieldComponentFieldProps } from 'react-ocean-forms';
import { Creatable } from 'react-select';

import { IPreparedSelectProps, SelectBase, ISelectFieldValue } from '../SelectBase';
import { ICreatableSelectProps } from './CreatableSelect.types';

/**
 * Component to display a select that can create options
 */
export const CreatableSelect = <TSubmitValue extends unknown = ISelectFieldValue>(props: ICreatableSelectProps<TSubmitValue>): JSX.Element => {
  const {
    createPrefixLabel = 'ojs_select_creatable_prefix',
    handleChange,
    onCreateOption,
    ...selectBaseProps
  } = props;

  const [loading, setLoading] = useState(false);
  const { stringFormatter } = useFormContext();

  /**
   * Formats the text that is shown for the create label
   */
  const formatCreateLabel = useCallback((text: string): React.ReactNode => {
    const promptText = stringFormatter(createPrefixLabel);

    return `${promptText} '${text}'`;
  }, [createPrefixLabel, stringFormatter]);

  const handleCreateOption = useCallback(async (fieldProps: IFieldComponentFieldProps<ISelectFieldValue>, value: string): Promise<void> => {
    setLoading(true);

    const result = onCreateOption ? await onCreateOption(value) : undefined;
    if (!result) {
      return;
    }

    fieldProps.onChange({
      target: {
        value: [...Array.isArray(fieldProps.value) ? fieldProps.value : [], result],
      },
    });
    setLoading(false);
  }, [onCreateOption]);

  /**
   * Renders the actual `Select` component with the passed props
   */
  const renderSelect = useCallback((preparedProps: IPreparedSelectProps, fieldProps: IFieldComponentFieldProps<ISelectFieldValue>): JSX.Element => {
    // onChange will not be called if onCreateOption is defined
    const createOption = onCreateOption ? handleCreateOption.bind(null, fieldProps) : undefined;

    return (
      <Creatable
        {...preparedProps}
        isLoading={loading}
        formatCreateLabel={formatCreateLabel}
        onCreateOption={createOption}
      />
    );
  }, [formatCreateLabel, handleCreateOption, loading, onCreateOption]);

  return (
    <SelectBase
      {...selectBaseProps}
      handleChange={handleChange}
      renderSelect={renderSelect}
    />
  );
};
