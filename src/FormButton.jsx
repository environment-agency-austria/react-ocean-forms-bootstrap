/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from 'reactstrap';
import { FormButton as BaseFormButton } from 'react-ocean-forms';

/**
 * Wrapper for a bootstrap button that will
 * automatically disable the button if the
 * form is busy
 */
function FormButton(props) {
  return (
    <BaseFormButton component={Button} {...props} />
  );
}

FormButton.displayName = 'FormButton';

export default FormButton;
