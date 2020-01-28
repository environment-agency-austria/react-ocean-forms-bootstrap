import { IFieldComponentFieldProps, IFieldComponentMeta } from 'react-ocean-forms';

import { IBaseFieldLineProps } from '../../FieldLine';

export interface PlaintextOnOffToggleButtonProps extends IBaseFieldLineProps {
  /**
   * Label for the on-button
   */
  onLabel: string;
  /**
   * Label for the off-button
   */
  offLabel: string;
  fieldProps: IFieldComponentFieldProps<boolean>;
  metaProps: IFieldComponentMeta;
}
