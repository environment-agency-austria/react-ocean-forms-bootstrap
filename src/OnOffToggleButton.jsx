/**
 * Copyright (c) 2018-present, Umweltbundesamt GmbH
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Input } from 'reactstrap';
import { fieldMetaShape, fieldShape, withForm } from 'react-ocean-forms';

import FieldLine from './FieldLine';

/**
 * Component for displaying bootstrap
 * form groups with an html input and
 * oForm support
 */
class OnOffToggleButton extends React.Component {
  constructor(props) {
    super(props);

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(value) {
    const { field: { onChange, name } } = this.props;
    onChange({
      target: {
        name,
        value,
      },
    });
  }

  render() {
    const {
      field,
      onLabel,
      offLabel,
      meta: {
        plaintext,
        stringFormatter,
      },
      field: {
        value,
      },
    } = this.props;
    const onValue = stringFormatter(onLabel);
    const offValue = stringFormatter(offLabel);
    const isOn = !(value === '' || value === false);

    if (plaintext) {
      return (
        <FieldLine {...this.props}>
          <Input {...field} plaintext>
            {isOn ? onValue : offValue}
          </Input>
        </FieldLine>
      );
    }

    return (
      <FieldLine {...this.props}>
        <ButtonGroup id={field.id}>
          <Button
            id={`${field.id}-on`}
            color="primary"
            onClick={() => this.onRadioBtnClick(true)}
            active={isOn}
          >
            {onValue}
          </Button>
          <Button
            id={`${field.id}-off`}
            color="primary"
            onClick={() => this.onRadioBtnClick(false)}
            active={!isOn}
          >
            {offValue}
          </Button>
        </ButtonGroup>
      </FieldLine>
    );
  }
}

OnOffToggleButton.displayName = 'OnOffToggleButton';

OnOffToggleButton.defaultProps = {
  onLabel: 'ojs_togglebutton_on',
  offLabel: 'ojs_togglebutton_off',
};

OnOffToggleButton.propTypes = {
  label: PropTypes.string.isRequired,
  onLabel: PropTypes.string,
  offLabel: PropTypes.string,
  meta: fieldMetaShape.isRequired,
  field: fieldShape.isRequired,
};

export const BaseOnOffToggleButton = OnOffToggleButton;
export default withForm(OnOffToggleButton);
