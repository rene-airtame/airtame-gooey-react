# Contributing to Airtame Gooey React

Contributions are always welcome. Before contributing please read the
[JS Foundation code of conduct](https://js.foundation/conduct/) as we try to be nice like them &
[search the issue tracker](https://github.com/airtame/airtame-gooey-react/issues); your issue
may have already been discussed or fixed in `master`. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) `airtame-gooey-react`, commit your changes, & [send a pull request](https://help.github.com/articles/using-pull-requests/).

## Feature Requests

Feature requests should be submitted in the
[issue tracker](https://github.com/airtame/airtame-gooey-react/issues), with a description of the expected behavior & use case, where they’ll remain closed until sufficient interest, [e.g. :+1: reactions](https://help.github.com/articles/about-discussions-in-issues-and-pull-requests/),
has been shown by the community.
Before submitting a request, please search for similar ones in the
[closed issues](https://github.com/airtame/airtame-gooey-react/issues?q=is%3Aissue+is%3Aclosed).

## Pull Requests

To create a pull request, first fork the repository and created a pull request to branch `master` from your personal fork.

Pull requests will be revised and commented on by the Airtame team. Once a pull request is approved, it will be pulled and merged by a member of the Airtame team into the `master` branch. It will later be published to npm together with other fixes.

## Tests

Airtame Gooey uses [mocha](https://mochajs.org/) to run the tests and [chai](http://chaijs.com/) and [chai-enzyme](https://github.com/producthunt/chai-enzyme) for assertions. It alsy used [enzyme](https://github.com/airbnb/enzyme) to test the React specific aspects of the code

You can run your tests with the following command:

  - React components: `npm test`

Test should live in the same folder as each mixin and function file using the `filename.spec.js` as a naming convention.

## Demos

A demo should be built for every new mixin. Demos live under the
`site` folder. All styling for demos should attempt to use as much from Gooey as possible. Demo's are rendered in the form of React components. Create a demo file under `site/components/demos`. Then add any styles necessary at `site/scss/demos`. There should always be just one scss file for every demo component. Finally, make sure to add your Component to the main component at `site/components/App.js` and `site/scss/main.scss`.

## Coding Guidelines

In addition to the following guidelines, please follow the conventions already established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable & method names concise & descriptive.<br>
  Variable names `index`, `array`, & `iteratee` are preferable to
  `i`, `arr`, & `fn`.

- **Comments**:<br>
  Please use single-line comments to annotate significant additions, &
  [JSDoc-style](http://www.2ality.com/2011/08/jsdoc-intro.html) comments for
  functions.

Guidelines are enforced using [ESLint](https://www.npmjs.com/package/eslint) and [Stylelint](https://www.npmjs.com/package/stylelint):

```bash
$ npm run lint
```
