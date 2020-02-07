# Changelog
All notable changes to this project will be documented in this file.

## [3.2.1] # 2020-02-07
- Fixed `FieldLine` prefix and suffix typings
- Fixed html id generation in `Select`

## [3.2.0] # 2019-08-20
- Improved `FormButton` props to include all reactstrap props
- Added `fieldErrorComponent` to `ValidationSummary`
- Added `ValidationFieldError` component as default renderer of `ValidationSummary` errors

## [3.1.0] # 2019-04-11
- Fixed `DatePicker`plaintext rendering of invalid date
- New prop inputFormat for `DatePicker` (new feature)
- Fixed `DatePicker` not triggering an onChange while clearing its value
- Bugfix for `Check` components

## [3.0.0] # 2019-01-19
- Upgraded to `reactstrap` 7.1.0 and `react-select` 2.3.0
- Fixed plaintext rendering issues with reactstrap 7+
- onCreateOption as async function in `CreatableSelect`
- manage isLoading state of `CreatableSelect` in onCreateOption
- old webpack config removed

## [2.1.7] # 2019-01-16
- handleChange added to `CreatableSelect`

## [2.1.6] # 2019-01-07
- onCreateOption added to `CreatableSelect`

## [2.1.5] # 2018-12-16
- Migrated to rollup to improve package size and tree shaking

## [2.1.4] # 2018-12-11
- Bugfix for `Select` components
- Bugfix for `OnOffToggleButton` component in plaintext mode

## [2.1.3] # 2018-12-01
- Fixed issue with fontawesome icon bundling, this should result in much smaller builds

## [2.1.2] # 2018-12-01
- Made production package size smaller

## [2.1.1] # 2018-11-28
- Moved `@types/react-select` and `@types/reactstrap` from devDependencies to dependencies, fixes typescript compiling issues

## [2.1.0] # 2018-11-26
- Added `CreatableSelect` that is a port for the `Creatable` component from `react-select`
- Added new props (`searchable` and `clearable`) to `Select` and `Creatable` to reflect changes made to react-select.

## [2.0.0] # 2018-11-19
### Breaking changes
- Updated to `react-ocean-forms` 2.0.0 - [migration guide](https://github.com/environment-agency-austria/react-ocean-forms#upgrading-from-react-ocean-forms-1xx-to-200)
- Updated to `@fortawesome/react-fontawesome` 0.1.3 - [migration guide](https://github.com/FortAwesome/react-fontawesome/blob/master/UPGRADING.md)
- Updated to `react-select` 2.1.0 - [migration guide](https://react-select.com/upgrade-guide)
- Switched some dependencies to peerDependencies - please ensure that you include them in your package.json!

### Misc
- Fixed `OnOffToggleButton` not reacting to `disabled` state

## [1.4.1] # 2018-08-22
- Added `labelSize`, `inputSize` and `labelClass` to `FieldLine`

## [1.4.0] # 2018-08-20
- Added `is-touched` class to `FieldLine` as soon as the field has been touched
- Default style: made the label of touched fields blue by default
- Default style: OnOffToggleButton is now `outline` per default
- Updated to react-ocean-forms 1.4.0

## [1.3.0] # 2018-08-02
- Added stylesheets for better out-of-the-box experience
- Adapted to the new `FormButton` element of `react-ocean-forms`
- Updated to react-ocean-forms 1.3.0

## [1.2.0] - 2018-07-25
- Fixed Select class on invalid state
- new property for `Select` enable/disable multiselect
- Hidden required marker, info, prefix and suffix in plaintext mode
- Added displayName props
- new component `OnOffToggleButton`
- Updated to react-ocean-forms 1.2.0

## [1.1.0] - 2018-06-28
- Updated to react-ocean-forms 1.1.0
- Added support for new Form plaintext feature
- DatePicker correctly reacts to Form disabled state

## [1.0.3] - 2018-06-11
- Initial release of the current code base
