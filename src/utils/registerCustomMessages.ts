/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addCustomMessages } from 'react-ocean-forms';

// tslint:disable-next-line:naming-convention
export const registerCustomMessages = (): void => {
  const defaultMessages = {
    ojs_select_placeholder: 'Choose a value',
    ojs_select_creatable_prefix: 'Create',
    ojs_form_select_file: 'Choose file',
    ojs_select_noresults: 'No results',
    ojs_select_clearValue: 'Clear value',
    ojs_togglebutton_on: 'On',
    ojs_togglebutton_off: 'Off',
  };
  addCustomMessages(defaultMessages);
};
