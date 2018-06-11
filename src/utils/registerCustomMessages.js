/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addCustomMessages } from 'react-ocean-forms';

const DEFAULT_MESSAGES = {
  ojs_select_placeholder: 'Choose a value',
  ojs_form_select_file: 'Choose file',
  ojs_select_noresults: 'No results',
  ojs_select_clearValue: 'Clear value',
};
addCustomMessages(DEFAULT_MESSAGES);
