import * as React from 'react';

export interface IValidationFieldErrorProps {
  id: string;
  fieldName: string;
  errors: React.ReactNode;
  linkCallback: React.MouseEventHandler;
}
