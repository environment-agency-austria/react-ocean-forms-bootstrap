# react-ocean-forms-bootstrap
[![npm](https://img.shields.io/npm/v/react-ocean-forms-bootstrap.svg)](https://www.npmjs.com/package/react-ocean-forms-bootstrap)
[![GitHub license](https://img.shields.io/github/license/environment-agency-austria/react-ocean-forms-bootstrap.svg)](https://github.com/environment-agency-austria/react-ocean-forms-bootstrap/blob/master/LICENSE)
[![travis](https://travis-ci.com/environment-agency-austria/react-ocean-forms-bootstrap.svg?branch=master)](https://travis-ci.com/environment-agency-austria/react-ocean-forms-bootstrap)
[![Greenkeeper badge](https://badges.greenkeeper.io/environment-agency-austria/react-ocean-forms-bootstrap.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/environment-agency-austria/react-ocean-forms-bootstrap/badge.svg?branch=master)](https://coveralls.io/github/environment-agency-austria/react-ocean-forms-bootstrap?branch=master)

Bootstrap input components for [react-ocean-forms](https://github.com/environment-agency-austria/react-ocean-forms) with `reactstrap`.

[API Documentation and Showcase](https://environment-agency-austria.github.io/forms-showcase/#/)

## Features
* Multiple input types out of the box
* Easy usage including eGOV SG 3.0 compliance

## Install
```npm install react-ocean-forms-bootstrap```

```yarn add react-ocean-forms-bootstrap```

## Usage
To use the components you need a `react-ocean-forms` Form. Then you can simply
use the components inside of a Form.

```js
import { Form } from 'react-ocean-forms';
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

  <Input
    name="name"
    label="demo_name"
  />

  <button type="submit">Submit</button>
</Form>
```

## Documentation and Showcase
[API Documentation and Showcase](https://environment-agency-austria.github.io/forms-showcase/#/)
