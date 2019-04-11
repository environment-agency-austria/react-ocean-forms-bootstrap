/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { withField } from 'react-ocean-forms';
import { default as ReactSelect } from 'react-select';

import { IPreparedSelectProps, SelectBase } from '../SelectBase';
import { ISelectProps } from './Select.types';

/**
 * Component for displaying bootstrap
 * form groups with an select input and
 * oForm support
 */
export class BaseSelect extends React.Component<ISelectProps> {
  public static displayName: string = 'Select';

  public render(): JSX.Element {
    const {
      ...selectBaseProps
    } = this.props;

    return (
      <SelectBase
        {...selectBaseProps}
        renderSelect={this.renderSelect}
      />
    );
  }

  /**
   * Renders the actual `Select` component with the passed props
   */
  private renderSelect = (preparedProps: IPreparedSelectProps): JSX.Element => {
    return (
      <ReactSelect {...preparedProps} />
    );
  }
}

export const Select = withField(BaseSelect);
