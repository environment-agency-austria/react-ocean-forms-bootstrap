import * as React from 'react';

import { shallow, ShallowWrapper } from 'enzyme';

import { checkInfoToggling } from '../../test-utils/checkInfoToggling';
import { createMockField, createMockFieldMeta } from '../../test-utils/enzymeFormContext';
import { FieldLine } from './FieldLine';

describe('<FieldLine />', () => {
  const setup = (): ShallowWrapper => {
    const mockLabel = 'label';
    const mockMeta = createMockFieldMeta();
    const mockField = createMockField();
    const mockChild = <div id="mock-child" />;

    return shallow((
      <FieldLine
        label={mockLabel}
        meta={mockMeta}
        field={mockField}
      >
        {mockChild}
      </FieldLine>
    ));
  };

  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  ((): void => {
    const wrapper = setup();
    checkInfoToggling(wrapper);
  })();
});
