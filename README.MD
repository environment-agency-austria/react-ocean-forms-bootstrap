# react-ocean-forms-bootstrap
[![npm](https://img.shields.io/npm/v/react-ocean-forms-bootstrap.svg)](https://www.npmjs.com/package/react-ocean-forms-bootstrap)
[![GitHub license](https://img.shields.io/github/license/environment-agency-austria/react-ocean-forms-bootstrap.svg)](https://github.com/environment-agency-austria/react-ocean-forms-bootstrap/blob/master/LICENSE)

Bootstrap input components for [react-ocean-forms](https://github.com/environment-agency-austria/react-ocean-forms) with `reactstrap`.

## Features
* Multiple input types out of the box
* Easy usage including eGOV SG 3.0 compliance

## Install
```npm install react-ocean-forms-bootstrap```
```yarn add react-ocean-forms-bootstrap```

## Usage
To use the components you need a `react-ocean-forms` Form and Field. Then you can simply
use the components inside of Fields.

```js
import { Form, Field } from 'react-ocean-forms';
import { Input, ValidationSummary } from 'react-ocean-forms-bootstrap';
```

Then use the components where needed.

```jsx
<Form
  onSubmit={this.handleSubmit}
  onValidate={this.handleValidate}
  defaultValues={{ name: 'test'}}
  asyncValidateOnChange
>
  <ValidationSummary />

  <Field
    name="name"
    label="demo_name"
    component={Input}
  />

  <button type="submit">Submit</button>
</Form>
```

## Input Component
Displays a input line with a html input.

```jsx
import { Field } from 'react-ocean-forms';
import { Input } from 'react-ocean-forms-bootstrap';

<Field
  name="test"
  label="label_test"
  component={Input}
  info="info_test"
  type="number"
/>
```

#### Properties
***info*** (String, optional)
Message id of an additional info text. A info button will be rendered on the side of the checkbox which toggles the visibility of an info alert containing the message.

***type*** (String, optional, default: 'text')
Changes the input type - all of the html input types are supported. Special case is the type textarea, which will render a textarea instead of an input.

## Check Component
Displays a input line with a checkbox.

```jsx
import { Field } from 'react-ocean-forms';
import { Check } from 'react-ocean-forms-bootstrap';

<Field
  name="test"
  label="label_test"
  component={Check}
  info="info_test"
/>
```

### Properties
***info*** (String, optional)
Message id of an additional info text. A info button will be rendered on the side of the checkbox which toggles the visibility of an info alert containing the message.

## Select Component
Displays a input line with a react-select, styled with bootstrap.

```jsx
import { Field, Select } from 'react-ocean-forms';
import { Select } from 'react-ocean-forms-bootstrap';
/* It's neccessary to include the css
 * of the react-select manually, otherwise the
 * select won't render properly.
 */
import  'react-select/dist/react-select.css';

const selectOptions = [
  { label: 'Item 1', value: 1 },
  { label: 'Item 2', value: 2 }
];

<Field
  name="test"
  label="label_test"
  component={Select}
  info="info_test"
  placeholder="placeholder_test"
  options={selectOptions}
/>
```

### Properties
***info*** (String, optional)
Message id of an additional info text. A info button will be rendered on the side of the checkbox which toggles the visibility of an info alert containing the message.

***options*** (Array of objects, required)
Must contain the available select values. See the documentation of `react-select` for further details.

## ValidationSummary Component
Displays a box with all the failed validations in the form. The element must be enclosed in a Form component.

```jsx
import { Form } from 'react-ocean-forms';
import { ValidationSummary } from 'react-ocean-forms-bootstrap';

<Form>
  <ValidationSummary />
  ...
</Form>
```

#### Properties
***title*** (String, optional)
Optional message id of the title of the error box.

