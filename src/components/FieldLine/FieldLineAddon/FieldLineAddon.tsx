/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as React from 'react';

import { FormText } from 'react-ocean-forms';
import { InputGroupAddon, InputGroupText } from 'reactstrap';

import { IFieldLineAddonProps } from './FieldLineAddon.types';

/**
 * Displays a prefix / suffix addon for the FieldLine
 */
export class FieldLineAddon extends React.Component<IFieldLineAddonProps> {
  public static displayName: string = 'FieldLineAddon';

  public render(): JSX.Element | null {
    const { plaintext, content, type } = this.props;

    if (plaintext || content === undefined) { return null; }

    let child = null;
    if (typeof content === 'string') {
      child = (
        <InputGroupText>
          <FormText text={content} />
        </InputGroupText>
      );
    } else {
      child = content;
    }

    return (
      <InputGroupAddon addonType={type}>
        {child}
      </InputGroupAddon>
    );
  }
}
