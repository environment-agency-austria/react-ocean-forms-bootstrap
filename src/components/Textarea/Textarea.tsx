/**
 * textarea field
 * */
import * as React from 'react';

import { withField } from 'react-ocean-forms';
import { Input } from 'reactstrap';
import { FieldLine } from '../FieldLine';
import { TextareaProps } from './Textarea.types';


/**
 *
 */

const textareaStyle: React.CSSProperties = {
  whiteSpace: "pre-wrap"
}

export class BaseTextarea extends React.Component<TextareaProps> {
  public static displayName: string = 'Input';


  public render(): JSX.Element {
    const {
      field,
      meta,
      rows,
    } = this.props;

    const invalid = meta.valid === true ? undefined : true;

    const fieldValue = field.value;
    if (typeof fieldValue !== 'string' && typeof fieldValue !== 'number' && fieldValue !== undefined) {
      throw new Error(
        'Incompatible field value supplied for input component '
        + `${field.id}. Only values with type string, number or undefined are allowed.`,
      );
    }

    if (meta.plaintext) {
      return (
        <FieldLine {...this.props}>
          <div className="form-control-plaintext overflow-auto" style={textareaStyle}>{fieldValue}</div>
        </FieldLine>
      );
    }

    return (
      <FieldLine {...this.props}>
        <Input type="textarea" {...field} rows={rows}  value={fieldValue} invalid={invalid} plaintext={meta.plaintext} />
      </FieldLine>
    );
  }
}

export const Textarea = withField(BaseTextarea);
