# Create InstantSearch App

> ⚡️ Build InstantSearch apps at the speed of thoughts

[![Build Status][travis-svg]][travis-url] [![Version][version-svg]][package-url] [![License][license-image]][license-url]

`create-instantsearch-app` is a command line utility that helps you quick start your InstantSearch app using any [Algolia][algolia-website] InstantSearch flavor ([InstantSearch.js][instantsearchjs-github], [React InstantSearch][react-instantsearch-github], [Vue InstantSearch][vue-instantsearch-github], [Angular InstantSearch][angular-instantsearch-github], [InstantSearch iOS][instantsearch-ios-github] and [InstantSearch Android][instantsearch-android-github]).

<p align="center">
  <img src="preview.png" width="800" alt="Preview">
</p>

<details>
  <summary><strong>Table of contents</strong></summary>


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Get started](#get-started)
- [Usage](#usage)
- [API](#api)
  - [Lifecycle](#lifecycle)
  - [Templates](#templates)
- [Previews](#previews)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

</details>

## Get started

> The tool requires Node ≥ 8.

```
npx create-instantsearch-app my-app
cd my-app
npm start
```

> [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a tool introduced in `npm@5.2.0` that makes it possible to run CLI tools hosted on the npm registry.

---

Alternatively, you can use [Yarn](https://http://yarnpkg.com):

```
yarn create instantsearch-app my-app
cd my-app
yarn start
```

## Usage

This package comes with the module `createInstantSearchApp(path, options?, tasks?)` and the command-line tool `create-instantsearch-app`.

```
$ create-instantsearch-app --help

  Usage: create-instantsearch-app <project-directory> [options]

  Options:

    -v, --version                                      output the version number
    --name <name>                                      The name of the application
    --app-id <appId>                                   The application ID
    --api-key <apiKey>                                 The Algolia search API key
    --index-name <indexName>                           The main index of your search
    --attributes-to-display <attributesToDisplay>      The attributes of your index to display
    --attributes-for-faceting <attributesForFaceting>  The attributes for faceting
    --template <template>                              The InstantSearch template to use
    --library-version <libraryVersion>                 The version of the library
    --config <config>                                  The configuration file to get the options from
    --no-installation                                  Ignore dependency installation
    -h, --help                                         output usage information
```

#### `--template`

Supported templates are:

- [`InstantSearch.js`][instantsearchjs-github]
- [`React InstantSearch`][react-instantsearch-github]
- [`React InstantSearch Native`][react-instantsearch-github]
- [`Vue InstantSearch`][vue-instantsearch-github]
- [`Angular InstantSearch`][angular-instantsearch-github]
- [`InstantSearch iOS`][instantsearch-ios-github]
- [`InstantSearch Android`][instantsearch-android-github]

```
create-instantsearch-app my-app --template "React InstantSearch"
```

You can also [create your own template](#templates) and specify its path.

#### `--config`

The `config` flag is handy to automate app generations.

<h6 align="center">`config.json`</h6>

```json
{
  "name": "my-app",
  "template": "InstantSearch.js",
  "libraryVersion": "2.8.0",
  "appId": "MY_APP_ID",
  "apiKey": "MY_API_KEY",
  "indexName": "MY_INDEX_NAME",
  "searchPlaceholder": "Search",
  "attributesToDisplay": ["name", "description"],
  "attributesForFaceting": ["brand", "location"]
}
```

Create the app based on this configuration:

```
create-instantsearch-app my-app --config config.json
```

## API

`create-instantsearch-app` is based on the module `createInstantSearchApp(path, options?, tasks?)`.

```javascript
const createInstantSearchApp = require('create-instantsearch-app');

const app = createInstantSearchApp('~/lab/my-app', {
  template: 'InstantSearch.js',
  libraryVersion: '2.0.0',
  attributesToDisplay: ['name', 'description'],
  attributesForFaceting: ['keywords'],
});

app.create().then(() => console.log('App generated!'));
```

### Lifecycle

The app generation follows this lifecycle:

![Lifecycle](https://user-images.githubusercontent.com/6137112/41421858-f838c2a6-6ff7-11e8-8cef-4cc07f1f4f44.png)

<details>
  <summary>Alternative text</summary>

1.  **Setup**
2.  **Build**
3.  **Install**
4.  (**Clean**) _if the installation fails_
5.  **Teardown**

</details>

Each task can be plugged to the third argument of `createInstantSearchApp(path, options?, tasks?)` and is passed the configuration of the app.

<h6 align="center">Tasks example</h6>

```javascript
const app = createInstantSearchApp(
  'my-app',
  { template: 'InstantSearch.js' },
  {
    setup(config) {
      // Check the project requirements
    },
    teardown(config) {
      // Go to the project folder
    },
  }
);

app.create();
```

### Templates

To use your own template, create a file `.template.js` at the root of your template directory. This is the configuration file that `createInstantSearchApp()` reads to retrieve the version of the library to install from `npm` and the [lifecycle tasks](#lifecycle) to process.

<h6 align="center">`.template.js`</h6>

```javascript
const { execSync } = require('child_process');

module.exports = {
  libraryName: 'algoliasearch-helper',
  tasks: {
    install(config) {
      execSync(`cd ${config.path} && npm install`);
    },
    teardown(config) {
      console.log('Begin by running: npm start');
    },
  },
};
```

The template files support the [Handlebars](https://handlebarsjs.com) syntax to inject values passed to `create-instantsearch-app`. You can see examples in the [`templates`](templates) folder. Then, pass the path to your template when generating the app.

Using the API:

```javascript
const app = createInstantSearchApp('my-app', {
  template: './my-custom-template',
});

app.create();
```

Using the CLI:

```
create-instantsearch-app my-app --template ./my-custom-template
```

## Previews

You can use the web templates on CodeSandbox:

- [InstantSearch.js](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/instantsearch.js)
- [React InstantSearch](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/react-instantsearch)
- [Vue InstantSearch](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/vue-instantsearch)
- [Angular InstantSearch](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/angular-instantsearch)
- [Autocomplete.js](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/autocomplete.js)
- [JavaScript Client](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/javascript-client)
- [JavaScript Helper](https://codesandbox.io/s/github/algolia/create-instantsearch-app/tree/templates/javascript-helper)

## License

Create InstantSearch App is [MIT licensed](LICENSE).

<!-- Badges -->

[version-svg]: https://img.shields.io/npm/v/create-instantsearch-app.svg?style=flat-square
[package-url]: https://npmjs.org/package/create-instantsearch-app
[travis-svg]: https://img.shields.io/travis/algolia/create-instantsearch-app/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/algolia/create-instantsearch-app
[license-image]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE

<!-- Links -->

[algolia-website]: https://www.algolia.com/?utm_medium=social-owned&utm_source=GitHub&utm_campaign=create-instantsearch-app%20repository
[instantsearchjs-github]: https://github.com/algolia/instantsearch.js
[react-instantsearch-github]: https://github.com/algolia/react-instantsearch
[vue-instantsearch-github]: https://github.com/algolia/vue-instantsearch
[angular-instantsearch-github]: https://github.com/algolia/angular-instantsearch
[instantsearch-ios-github]: https://github.com/algolia/instantsearch-ios
[instantsearch-android-github]: https://github.com/algolia/instantsearch-android
