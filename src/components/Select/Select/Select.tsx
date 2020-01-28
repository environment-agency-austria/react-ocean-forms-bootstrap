/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { default as ReactSelect } from 'react-select';

import { IPreparedSelectProps, SelectBase, ISelectFieldValue } from '../SelectBase';
import { ISelectProps } from './Select.types';

/**
 * Renders the actual `Select` component with the passed props
 */
const renderSelect = (preparedProps: IPreparedSelectProps): JSX.Element => {
  return (
    <ReactSelect {...preparedProps} />
  );
}

/**
 * Component for displaying bootstrap
 * form groups with an select input and
 * oForm support
 */
export const Select = <TSubmitValue extends unknown = ISelectFieldValue>(props: ISelectProps<TSubmitValue>): JSX.Element => {
  const {
    ...selectBaseProps
  } = props;

  return (
    <SelectBase
      {...selectBaseProps}
      renderSelect={renderSelect}
    />
  );
};
