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
import { TBasicFieldValue, withField } from 'react-ocean-forms';
import { Creatable } from 'react-select';

import { IPreparedSelectProps, SelectBase } from '../SelectBase';
import { ICreatableSelectProps, ICreatableSelectState } from './CreatableSelect.types';

// ============================================================================
// Components
// ============================================================================
/**
 * Component to display a select that can create options
 */
export class BaseCreatableSelect extends React.Component<ICreatableSelectProps, ICreatableSelectState> {
  public static displayName: string = 'CreatableSelect';
  public static defaultProps = {
    createPrefixLabel: 'ojs_select_creatable_prefix',
  };

  constructor(props: Readonly<ICreatableSelectProps>) {
    super(props);
    this.state = {
      loading: false,
    };
  }

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

  private handleCreateOption = async (value: string): Promise<void> => {
    const { field, onCreateOption } = this.props;
    this.setState({ loading: true });

    const result = onCreateOption ? await onCreateOption(value) : undefined;
    if (!result) {
      return;
    }
    const current = field.value as TBasicFieldValue[];

    field.onChange({
      target: {
        value: [...Array.isArray(current) ? current : [], result],
      },
    });
    this.setState({ loading: false });
  }

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

    const { loading } = this.state;

    const {
      onCreateOption,
    } = this.props;

    // onChange will not be called if onCreateOption is defined
    const createOption = onCreateOption ? this.handleCreateOption : undefined;

    return (
      <Creatable
        {...preparedProps}
        isLoading={loading}
        formatCreateLabel={this.formatCreateLabel}
        onCreateOption={createOption}
      />
    );
  }
}

export const CreatableSelect = withField(BaseCreatableSelect);
