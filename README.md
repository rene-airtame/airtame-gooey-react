# Airtame Gooey React
[![Build Status](https://travis-ci.org/airtame/airtame-gooey-react.svg?branch=master)](https://travis-ci.org/airtame/airtame-gooey-react)

This is a React component library that works together with [`airtame/airtame-gooey`](https://github.com/airtame/airtame-gooey) to provide Airtames visual identity to your website.

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