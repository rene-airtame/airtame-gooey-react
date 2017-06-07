<div align="center">
  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/244725/gooey-react.png" />
  <h1>Airtame Gooey React</h1>
  <a href="https://www.npmjs.com/package/airtame-gooey-react"><img src="https://img.shields.io/npm/v/airtame-gooey-react.svg" alt="npm version" height="18"></a>
  <a href="https://travis-ci.org/airtame/airtame-gooey-react" target="_blank"><img src="https://img.shields.io/travis/airtame/airtame-gooey-react.svg"></a>
</div>


Airtame Gooey React is a React component library that works together with [`airtame/airtame-gooey`](https://github.com/airtame/airtame-gooey) to provide Airtame's visual identity to your website.

## Installation

```bash
yarn add airtame-gooey-react
```
or
```bash
npm install airtame-gooey-react
```

## Usage

Import the component you need.

```javascript
import Button from 'airtame-gooey-react/Button';
...
render () {
  return (
    <div>
      // some form
      <Button>Submit</Button>
    </div>
  )
}
```
or multiple components at a time

```javascript
import { TextField, Button } from 'airtame-gooey-react';
```

## Development

Check the parent project [`airtame/gooey`](https://github.com/airtame/airtame-gooey) for development instructions.