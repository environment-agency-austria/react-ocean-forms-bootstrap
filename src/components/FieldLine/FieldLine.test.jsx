import React from 'react';
import { shallow } from 'enzyme';

import FieldLine from './FieldLine';
import { createMockFieldMeta, createMockField } from '../../test-utils/enzymeFormContext';
import checkInfoToggling from '../../test-utils/checkInfoToggling';

describe('<FieldLine />', () => {
  const MOCK_LABEL = 'label';
  const MOCK_META = createMockFieldMeta();
  const MOCK_FIELD = createMockField();
  const MOCK_CHILD = <div id="mock-child" />;

  const wrapper = shallow((
    <FieldLine
      label={MOCK_LABEL}
      meta={MOCK_META}
      field={MOCK_FIELD}
    >
      {MOCK_CHILD}
    </FieldLine>
  ));

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  checkInfoToggling(wrapper);
});
