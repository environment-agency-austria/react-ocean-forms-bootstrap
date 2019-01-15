/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// ============================================================================
// Imports
// ============================================================================
import * as React from 'react';
import { withField } from 'react-ocean-forms';
import { Creatable } from 'react-select';

import { IPreparedSelectProps, SelectBase } from '../SelectBase';
import { ICreatableSelectProps } from './CreatableSelect.types';

// ============================================================================
// Components
// ============================================================================
/**
 * Component to display a select that can create options
 */
export class BaseCreatableSelect extends React.Component<ICreatableSelectProps> {
  public static displayName: string = 'CreatableSelect';
  // tslint:disable-next-line:typedef
  public static defaultProps = {
    createPrefixLabel: 'ojs_select_creatable_prefix',
  };

  /**
   * Formats the text that is shown for the create label
   */
  private formatCreateLabel = (text: string): React.ReactNode => {
    const {
      createPrefixLabel,
      meta,
    } = this.props;

    const promptText = meta.stringFormatter(createPrefixLabel);

    return `${promptText} '${text}'`;
  }

  // tslint:disable-next-line:member-ordering
  public render(): JSX.Element {
    const {
      handleChange,
      ...selectBaseProps
    } = this.props;

    return (
      <SelectBase
        {...selectBaseProps}
        handleChange={handleChange}
        renderSelect={this.renderSelect}
      />
    );
  }

  /**
   * Renders the actual `Select` component with the passed props
   */
  private renderSelect = (preparedProps: IPreparedSelectProps): JSX.Element => {

    const {
      onCreateOption,
    } = this.props;

    return (
      <Creatable
        {...preparedProps}
        formatCreateLabel={this.formatCreateLabel}
        onCreateOption={onCreateOption}
      />
    );
  }
}

export const CreatableSelect = withField(BaseCreatableSelect);
