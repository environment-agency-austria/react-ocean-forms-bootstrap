import { IFieldComponentFieldProps } from 'react-ocean-forms';

export interface OnOffToggleButtonChoiceProps {
  fieldProps: IFieldComponentFieldProps<boolean>;
  variant: 'on' | 'off';
  label: string;
  onClick(value: boolean): void;
}
