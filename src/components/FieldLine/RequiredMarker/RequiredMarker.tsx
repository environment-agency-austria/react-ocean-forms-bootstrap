/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

import { IRequiredMarkerProps } from './RequiredMarker.types';

/**
 * Displays a * if the field is required - based on the
 * presence of react-ocean-forms validators.required
 */
export class RequiredMarker extends React.Component<IRequiredMarkerProps> {
  public static displayName: string = 'RequiredMarker';

  public render(): JSX.Element | null {
    const { meta } = this.props;

    // Do nothing in plaintext mode
    if (meta.plaintext) { return null; }

    if (meta.isRequired) {
      const requiredTitle = meta.stringFormatter('ojs_field_required');

      return (
        <span className="field-required" title={requiredTitle}>
          {' '}
          *
        </span>
      );
    }

    return null;
  }
}
