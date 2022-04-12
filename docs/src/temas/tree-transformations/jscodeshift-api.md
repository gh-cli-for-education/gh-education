---
prev: jscodeshift-transformation-module.md
---
# The jscodeshift API

As already mentioned, jscodeshift also provides a wrapper around [recast][].
In order to properly use the jscodeshift API, one has to understand the basic
building blocks of recast (and ASTs) as well.

## Core Concepts

### AST nodes

An AST node is a plain JavaScript object with a specific set of fields, in
accordance with the [Mozilla Parser API][]. The primary way to identify nodes
is via their `type`.

For example, string literals are represented via `Literal` nodes, which
have the structure

```js
// "foo"
{
  type: 'Literal',
  value: 'foo',
  raw: '"foo"'
}
```

It's OK to not know the structure of every AST node type.
The [(esprima) AST explorer][ast-explorer] is an online tool to inspect the AST
for a given piece of JS code.

### Path objects

Recast itself relies heavily on [ast-types][] which defines methods to traverse
the AST, access node fields and build new nodes. ast-types wraps every AST node
into a *path object*. Paths contain meta-information and helper methods to
process AST nodes.

For example, the child-parent relationship between two nodes is not explicitly
defined. Given a plain AST node, it is not possible to traverse the tree *up*.
Given a path object however, the parent can be traversed to via `path.parent`.

For more information about the path object API, please have a look at
[ast-types][].

### Builders

To make creating AST nodes a bit simpler and "safer", ast-types defines a couple
of *builder methods*, which are also exposed on `jscodeshift`.

For example, the following creates an AST equivalent to `foo(bar)`:

```js
// inside a module transform
var j = jscodeshift;
// foo(bar);
var ast = j.callExpression(
  j.identifier('foo'),
  [j.identifier('bar')]
);
```

The signature of each builder function is best learned by having a look at the
[definition files](https://github.com/benjamn/ast-types/blob/master/def/).

## Collections and Traversal

In order to transform the AST, you have to traverse it and find the nodes that
need to be changed. jscodeshift is built around the idea of **collections** of
paths and thus provides a different way of processing an AST than recast or
ast-types.

A collection has methods to process the nodes inside a collection, often
resulting in a new collection. This results in a fluent interface, which can
make the transform more readable.

Collections are "typed" which means that the type of a collection is the
"lowest" type all AST nodes in the collection have in common. That means you
cannot call a method for a `FunctionExpression` collection on an `Identifier`
collection.

Here is an example of how one would find/traverse all `Identifier` nodes with
jscodeshift and with recast:

```js
// recast
var ast = recast.parse(src);
recast.visit(ast, {
  visitIdentifier: function(path) {
    // do something with path
    return false;
  }
});

// jscodeshift
jscodeshift(src)
  .find(jscodeshift.Identifier)
  .forEach(function(path) {
    // do something with path
  });
```

To learn about the provided methods, have a look at the
[Collection.js](src/Collection.js) and its [extensions](src/collections/).

## Extensibility

jscodeshift provides an API to extend collections. By moving common operators
into helper functions (which can be stored separately in other modules), a
transform can be made more readable.

There are two types of extensions: generic extensions and type-specific
extensions. **Generic extensions** are applicable to all collections. As such,
they typically don't access specific node data, but rather traverse the AST from
the nodes in the collection. **Type-specific** extensions work only on specific
node types and are not callable on differently typed collections.

### Examples

```js
// Adding a method to all Identifiers
jscodeshift.registerMethods({
  logNames: function() {
    return this.forEach(function(path) {
      console.log(path.node.name);
    });
  }
}, jscodeshift.Identifier);

// Adding a method to all collections
jscodeshift.registerMethods({
  findIdentifiers: function() {
    return this.find(jscodeshift.Identifier);
  }
});

jscodeshift(ast).findIdentifiers().logNames();
jscodeshift(ast).logNames(); // error, unless `ast` only consists of Identifier nodes
```

## Passing options to [recast]

You may want to change some of the output settings (like setting `'` instead of `"`).
This can be done by passing config options to [recast].

```js
.toSource({quote: 'single'}); // sets strings to use single quotes in transformed code.
```

You can also pass options to recast's `parse` method by passing an object to
jscodeshift as second argument:

```js
jscodeshift(source, {...})
```

More on config options [here](https://github.com/benjamn/recast/blob/52a7ec3eaaa37e78436841ed8afc948033a86252/lib/options.js#L61)

## Unit Testing

jscodeshift comes with a simple utility to allow easy unit testing with [Jest](https://facebook.github.io/jest/), without having to write a lot of boilerplate code. This utility makes some assumptions in order to reduce the amount of configuration required:

 - The test is located in a subdirectory under the directory the transform itself is located in (eg. `__tests__`)
 - Test fixtures are located in a `__testfixtures__` directory

This results in a directory structure like this:

```
/MyTransform.js
/__tests__/MyTransform-test.js
/__testfixtures__/MyTransform.input.js
/__testfixtures__/MyTransform.output.js
```

A simple example of unit tests is bundled in the [sample directory](sample).

The `testUtils` module exposes a number of useful helpers for unit testing.

### `defineTest`

Defines a Jest/Jasmine test for a jscodeshift transform which depends on fixtures

```js
jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'MyTransform');
```

An alternate fixture filename can be provided as the fourth argument to `defineTest`.
This also means that multiple test fixtures can be provided:

```js
defineTest(__dirname, 'MyTransform', null, 'FirstFixture');
defineTest(__dirname, 'MyTransform', null, 'SecondFixture');
```

This will run two tests:
- `__testfixtures__/FirstFixture.input.js`
- `__testfixtures__/SecondFixture.input.js`

### `defineInlineTest`

Defines a Jest/Jasmine test suite for a jscodeshift transform which accepts inline values

This is a more flexible alternative to `defineTest`, as this allows to also provide options to your transform

```js
const defineInlineTest = require('jscodeshift/dist/testUtils').defineInlineTest;
const transform = require('../myTransform');
const transformOptions = {};
defineInlineTest(transform, transformOptions, 'input', 'expected output', 'test name (optional)');
```

### `defineSnapshotTest`

Similar to `defineInlineTest` but instead of requiring an output value, it uses Jest's `toMatchSnapshot()`

```js
const defineSnapshotTest = require('jscodeshift/dist/testUtils').defineSnapshotTest;
const transform = require('../myTransform');
const transformOptions = {};
defineSnapshotTest(transform, transformOptions, 'input', 'test name (optional)');
```

For more information on snapshots, check out [Jest's docs](https://jestjs.io/docs/en/snapshot-testing)

### `defineSnapshotTestFromFixture`

Similar to `defineSnapshotTest` but will load the file using same file-directory defaults as `defineTest`

```js
const defineSnapshotTestDefault = require('jscodeshift/dist/testUtils').defineSnapshotTestDefault;
const transform = require('../myTransform');
const transformOptions = {};
defineSnapshotTestFromFixture(__dirname, transform, transformOptions, 'FirstFixture', 'test name (optional)');
```

### `applyTransform`

Executes your transform using the options and the input given and returns the result.
This function is used internally by the other helpers, but it can prove useful in other cases.

```js
const applyTransform = require('jscodeshift/dist/testUtils').applyTransform;
const transform = require('../myTransform');
const transformOptions = {};
const output = applyTransform(transform, transformOptions, 'input');
```

### ES modules

If you're authoring your transforms and tests using ES modules, make sure to import the transform's parser (if specified) in your tests:

```js
// MyTransform.js
export const parser = 'flow'
export default function MyTransform(fileInfo, api) {
  // ...
}
```
```js
// __tests__/MyTransform-test.js
import { defineInlineTest } from 'jscodeshift/dist/testUtils
import * as transform from '../MyTransform

console.log(transform.parser) // 'flow'

defineInlineTest(transform, /* ... */)
```

## Example Codemods

- [react-codemod](https://github.com/reactjs/react-codemod) - React codemod scripts to update React APIs.
- [js-codemod](https://github.com/cpojer/js-codemod/) - Codemod scripts to transform code to next generation JS.
- [js-transforms](https://github.com/jhgg/js-transforms) - Some documented codemod experiments to help you learn.

## Local Documentation Server

 To update docs in `/docs`, use `npm run docs`.

 To view these docs locally, use `npx http-server ./docs`



## Recipes

- [Retain leading comment(s) in file when replacing/removing first statement](recipes/retain-first-comment.md)

[npm]: https://www.npmjs.com/
[Mozilla Parser API]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
[recast]: https://github.com/benjamn/recast
[ast-types]: https://github.com/benjamn/ast-types
[ast-explorer]: http://astexplorer.net/

