# Changelog
All notable changes to this project will be documented in this file.

## Unreleased Changes
- Add `CreatableSelect` that is a port for the `Creatable` component from `react-select`

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
