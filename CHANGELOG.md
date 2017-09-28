# Airtame Gooey React CHANGELOG

## v0.4.3

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.4.2...v0.4.3)

- Moved `react`, `classnames` and `prop-types` to be peerDependencies and devDependencies simultaneously to stop conflicting with major dependency version bumps on installation.
- Updated Eslint config to use the latest airtame config
- Ran Prettier through the codebase
- Migrated tests to Jest

## v0.4.2

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.4.1...v0.4.2)

- Updated the TextArea component to play better with `airtame-gooey`'s mixin
  - Error span is always present now when `isError` prop is passed, even if no `errorMessage` is passed.

## v0.4.1

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.4.0...v0.4.1)

- Added utils file with shared functions
- Updated data checks in RadioGrouop's `componentWillReceiveProps`
- Updated options checks in Select's `componentWillReceiveProps`
- Added more robust tests to validater these implementations
- Cleaned AppVeyor's reporting command
- Updated Select's documentation

## v0.4.0

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.3.0...v0.4.0)

- Fixed state reassignment for state variables that are dependant on props
- Added support for additional valid props to form field components
- Added `type="button"` to the toggle password button in the TextField component
- Added test coverage and test reports with CodeCov
- Updated select value prop to also accept numbers

## v0.3.0

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.2.0...v0.3.0)

- Pass an error as second argument to onChange when maxContentLength is exceeded

## v0.2.0

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.1.1...v0.2.0)

- Update tooltip to get its content as a prop and be triggered when hovering its children content

## v0.1.1

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.1.0...v0.1.1)

- Change select options to use the label prop provided in the options array

## v0.1.0

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.0.2...v0.1.0)

- Added SideDrawer component
- Added ref prop to all form elements
- Fixed disabled and on classNames on Switch component

## v0.0.2

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.0.1...v0.0.2)

- Make onChange event persistent to work in an asynchronous way

## v0.0.1

[Diff](https://github.com/airtame/airtame-gooey-react/compare/v0.0.0...v0.0.1)

- Fixed the RadioGroup component (Now current value changes properly)
- Updated Button component to extend React.Component. This allows unsing the ref prop
- Added onChange callback to the TextArea component
- Added onChange callback to the TextField component
