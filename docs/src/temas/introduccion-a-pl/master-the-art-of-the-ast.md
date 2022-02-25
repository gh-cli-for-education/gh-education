---
---

# AST Transformations 

## Constant Folding

The following code uses estraverse to implement a simplified version of the AST tree transformation knwon as [Constant Folding](https://en.wikipedia.org/wiki/Constant_folding). **Constant folding** is the process of recognizing and evaluating constant expressions at compile time rather than computing them at runtime. 

```js
// See https://github.com/babel/minify/tree/master/packages/babel-plugin-minify-constant-folding
const fs = require("fs");
const deb = require('../src/deb.js');
const escodegen = require("escodegen");
const espree = require("espree");
const estraverse = require("estraverse");

const input = `
var f = 3+null;
var e = 4 | 3;
var d = 3+"c";
var b = 9 +1;
var a = 2+3*5+b;
`;

function replaceByLiteral(n, type) {
    n.type = "Literal";

    if (type == 'string') 
      n.value = eval(`"${n.left.value}" ${n.operator} "${n.right.value}"`); //must be in a try catch
    else 
      n.value = eval(`${n.left.value} ${n.operator} ${n.right.value}`);

    n.raw = String(n.value);

    delete(n.left);
    delete(n.right);
}

const t = espree.parse(input, { ecmaVersion: 6, loc: false });
//deb(t);
estraverse.traverse(t, {
  leave: function (n, p) {
    if (
      n.type == "BinaryExpression" &&
      n.left.type == "Literal" &&
      n.right.type == "Literal"
    ) {
        let left = n.left.value;
        let right = n.right.value;
        if (typeof left == 'string' || typeof right == 'string') {
          replaceByLiteral(n, 'string')
        } else if (typeof left == 'number') { 
          replaceByLiteral(n, 'number')
        }
        else { /* leave it */}
    }
  },
});
deb(t);
let c = escodegen.generate(t);
console.error(c);
```

Execution:

```js
➜  espree-logging-casiano-rodriguez-leon-alumno5 git:(train) ✗ node src/cf.js >salida.json                              
var f = 3;
var e = 7;
var d = '3c';
var b = 10;
var a = 17 + b;
```

* Vea los contenidos del árbol [salida.json](./cf-salida)


## Transforming the AST. The Lab Espree Logging

* [Descripción de la Práctica Espree Logging](/practicas/esprima-logging)


##  Master the AST

* Talk [Master the Art of the AST and Take Control of Your JS][ast]  by Yonatan Mevorach. 
    - [Here are the slides](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/ast-talk-codemotion-170406094223.pdf)

* [Here is another version of the talk at Javascript Israel](https://500tech.com/blog/all/yonatan-mevorach-on-abstract-syntax-trees) by Yonatan Mevorach

[ast]: https://youtu.be/C06MohLG_3s

## ASTExplorer

* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>

## ESLint *Piggyback example*

* <a href="https://eslint.org/docs/developer-guide/working-with-plugins" target="_blank">ESLint: Working with Plugins</a>
* <a href="https://github.com/cowchimp/eslint-plugin-piggyback" target="_blank">eslint-plugin-piggyback</a>

## Babel remove "debugger" example

* <a href="http://docs.w3cub.com/babel/plugins/transform-remove-debugger/" target="_blank">Babel plugin Remove debugger transform. This plugin removes all `debugger;` statements</a>
* <a href="https://github.com/babel/minify/tree/a24dd066f16db5a7d5ab13c2af65e767347ef550/packages/babel-plugin-transform-remove-debugger" target="_blank">babel-plugin-transform-remove-debugger at GitHub</a>

## Codemod

[Codemod](https://github.com/facebookarchive/codemod) is a tool/library developed by FaceBook to assist you with large-scale codebase refactors that can be partially automated but still require human oversight and occasional intervention. [Code refactoring](https://en.wikipedia.org/wiki/Code_refactoring) is the process of restructuring existing computer code—changing the factoring—without changing its external behavior.

Example: Let's say you're deprecating your use of the `<font>` tag.  From the command line, you might make progress by running:

    codemod -m -d /home/jrosenstein/www --extensions php,html \
        '<font *color="?(.*?)"?>(.*?)</font>' \
        '<span style="color: \1;">\2</span>'

For each match of the regex, you'll be shown a colored diff, and asked if you want to accept the change (the replacement of the `<font>` tag with a `<span>` tag), reject it, or edit the line in question in your `$EDITOR` of choice.

Codemods are scripts used to rewrite other scripts. Think of them as a find and replace functionality that can read and write code. You can use them to 
1. update source code to fit a team’s coding conventions, 
2. make widespread changes when an API is modified, or 
3. even auto-fix existing code when your public package makes a breaking change.
4. ...

## ast-types

The [ast-types](https://github.com/benjamn/ast-types) module provides an efficient, modular,
[Esprima](https://github.com/ariya/esprima)-compatible implementation of
the [abstract syntax tree type hierarchy](http://en.wikipedia.org/wiki/Abstract_syntax_tree)
pioneered by the [Mozilla Parser API](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API).

### Simple Example

[Here is an example](https://github.com/crguezl/hello-ast-types) of usage:

```js
import assert from "assert";
import {
  namedTypes as n,
  builders as b,
} from "ast-types";
import recast from 'recast';
```

We have imported the names of the ASTs types in `n` and in `b` the different 
builders/constructors of AST nodes.

::: danger type: module in your package.json!
When using node.js with ES6 modules (in current versions of node)
you have to add an entry `"type": "module"` to the `package.json`:
:::

```
➜  hello-ast-types git:(master) ✗ node --version    
v16.0.0
➜  hello-ast-types git:(master) ✗ jq '.type, .dependencies' package.json  
"module"
{
  "ast-types": "^0.14.2"
}
```

let us build a identifier node and an ifStatement node:

```js
var fooId = b.identifier("foo");
debugger;
var ifFoo = b.ifStatement(
  fooId, 
  b.blockStatement([
    b.expressionStatement(b.callExpression(fooId, []))
  ])
);
```

* Now the `fooId` variable contains an object like `{name: 'foo', loc: null, type: 'Identifier', comments: null, optional: false, …}` and 
* the `ifFoo` has something like `{test: {…}, consequent: {…}, alternate: null, loc: null, type: IfStatement', …}`

We can use the `recast` method `print`to obtain the corresponding code:

```js
console.log(recast.print(ifFoo).code);
``` 

The `ifFoo` AST corresponds to the code:

```js 
➜  hello-ast-types git:(master) ✗ node index.js
if (foo) {
    foo();
}
```

The family of objects `n.ASTType` have  check methods:

```js
assert.ok(n.IfStatement.check(ifFoo));
assert.ok(n.Statement.check(ifFoo));
assert.ok(n.Node.check(ifFoo));
assert.ok(n.BlockStatement.check(ifFoo.consequent));
```

We can check that the call to `foo()` has no arguments like that:

```js
assert.strictEqual(
  ifFoo.consequent.body[0].expression.arguments.length,
  0,
);
```

Here are other checks. The `check` method considers that the 
node `ifFoo.test` is an `Identifier` and an `Expression` but not a `Statement`

```
assert.strictEqual(ifFoo.test, fooId);
assert.ok(n.Expression.check(ifFoo.test));
assert.ok(n.Identifier.check(ifFoo.test));
assert.ok(!n.Statement.check(ifFoo.test));
```

### Translating the ES6 spread operator ... 

The following transformation approach the translation of the spread operator so that an input like:

```js
function tutu(x, ...rest) {
    return x + rest[0];
}
```

is translated onto:

```js
➜  hello-ast-types git:(master) ✗ node spread-operator.js
function tutu(x) {
    var rest = Array.prototype.slice.call(arguments, 1);
    return x + rest[0];
}
```

::: danger AST compatibility
I have used `espree` to generate the initial AST. It seems to have some incompatibilities with the 
AST used by `ast-types`.
::: 

We load the libs and build an auxiliary AST for the expression `Array.prototype.slice.call`:

```js
import { namedTypes as n, builders as b, visit } from "ast-types";
import recast from "recast";
import * as espree from  "espree";

var sliceExpr = b.memberExpression(
    b.memberExpression(
      b.memberExpression(
        b.identifier("Array"),
        b.identifier("prototype"),
        false
      ),
      b.identifier("slice"),
      false
    ),
    b.identifier("call"),
    false
  );
```

Since I wasn't in the mood to build the AST using the ast-builders I resourced to espree:

```js 
let code = `
function tutu(x, ...rest) {
    return x + rest[0];
}
`;
// Warning!!! the AST produced by Espree doesn't seem to be fully compatible with ast-types
let ast = espree.parse(code, {ecmaVersion: 7, loc: false});
```

Here is the ffull code for the transformation:

```js 
visit(ast, {
  visitFunction(path) {
    const node = path.node;
    this.traverse(path);

    let lastArg = node.params.pop(); // Remove the 'rest' parameter
    if (lastArg.type !== "RestElement") return;
    
    // For the purposes of this example, we won't worry about functions
    // with Expression bodies.
    n.BlockStatement.assert(node.body);

    //   var rest = Array.prototype.slice.call(arguments, n);
    const restVarDecl = b.variableDeclaration("var", [
      b.variableDeclarator(
        lastArg.argument,
        b.callExpression(sliceExpr, [
          b.identifier("arguments"),
          b.literal(node.params.length)
        ])
      )
    ]);
  
    // Insert the statement 'var rest = Array.prototype.slice.call(arguments, n);' 
    // at the beginning of the body
    path.get("body", "body").unshift(restVarDecl);
    
   }
});

console.log(recast.print(ast).code);
```

## Recast

Recast is a library for parsing and modifying JavaScript code written on top of esprima and ast-types. 
Recast provides methods for pretty printing ASTs as well as API to construct new ASTs without parsing any source code.

See the examples in [/crguezl/hello-jscodeshift/hello-recast.js](https://github.com/crguezl/hello-jscodeshift/blob/master/hello-recast.js)

This [code example](https://github.com/crguezl/hello-jscodeshift/blob/master/hello-recast.js) takes as input the code 

```js 
  function add(a, b) {
    return a - b;
  }
```

and just for fun switches the parameters `a` and `b` and converts the function `add` declaration in a function expression:

```js
➜  hello-jscodeshift git:(master) ✗ node hello-recast.js 

  var add = function(b, a) {
    return a - b;
  };
```

Here is the code:

```js
const recast = require("recast");
const code = `
  function add(a, b) {
    return a - b;
  }
`;
const ast = recast.parse(code);
const add = ast.program.body[0]; // The node of the add function declaration
```

See the module [ast-types](https://github.com/benjamn/ast-types) (especially the file [def/core.ts](https://github.com/benjamn/ast-types/blob/master/def/core.ts)) module for a thorough overview of the `ast` API.

```js
const n = recast.types.namedTypes;
n.FunctionDeclaration.assert(add);

// If you choose to use recast.builders to construct new AST nodes, all builder
// arguments will be dynamically type-checked against the Mozilla Parser API.
const B = recast.types.builders;

// This kind of manipulation should seem familiar if you've used Esprima or the
// Mozilla Parser API before.
ast.program.body[0] = B.variableDeclaration("var", [
  B.variableDeclarator(add.id, B.functionExpression(
    null, // Anonymize the function expression.
    add.params,
    add.body
  ))
]);

// Just for fun, because addition is commutative:
add.params.push(add.params.shift());

const output = recast.print(ast).code;

console.log(output);
```

## JSCodeshift 

<a href="https://github.com/facebook/jscodeshift" target="_blank">JSCodeshift</a> is a toolkit for running codemods over multiple JavaScript or
TypeScript files.


The jscodeshift toolkit allows you to pump a bunch of source files through a transform and replace them with what comes out the other end. Inside the transform, you parse the source into an abstract syntax tree (AST), poke around to make your changes, then regenerate the source from the altered AST.

The interface that jscodeshift provides is a wrapper around [recast](https://github.com/benjamn/recast) and ast-types packages. [recast](https://github.com/benjamn/recast) handles the conversion from source to AST and back while ast-types handles the low-level interaction with the AST nodes.


```
jscodeshift -t some-transform.js input-file.js -d -p
```

This will run input-file.js through the transform some-transform.js and print the results without altering the file.

We can install it globally:

```
$ npm install -g jscodeshift
```

For example, the following transformation in file [hello-jscodeshift.js]():

```js
module.exports = function(fileInfo, api, options) {
    return api.jscodeshift(fileInfo.source)
      .findVariableDeclarators('foo')
      .renameTo('bar')
      .toSource();
  }
```

Changes all the apearances of variable `foo` to `bar`. See the following execution:

```
➜  hello-jscodeshift git:(master) ✗ cat foo.js 
var foo = 4;%                                                                                                                   
➜  hello-jscodeshift git:(master) ✗ jscodeshift -t hello-jscodeshift.js foo.js 
Processing 1 files... 
Spawning 1 workers...
Sending 1 files to free worker...
All done. 
Results: 
0 errors
0 unmodified
0 skipped
1 ok
Time elapsed: 0.947seconds 
➜  hello-jscodeshift git:(master) ✗ cat foo.js 
var bar = 4;
```

## References

### JSCodeshift

* <a href="https://github.com/facebook/jscodeshift" target="_blank">Codeshift at GitHub</a>
* <a href="https://www.toptal.com/javascript/write-code-to-rewrite-your-code" target="_blank">Write Code to Rewrite Your Code: jscodeshift</a>
* <a href="https://glebbahmutov.com/blog/jscodeshift-example/" target="_blank">jscodeshift example</a>
* <a href="https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js" target="_blank">jscodeshift cpojer/js-codemod no-vars.js</a>
* [recast](https://github.com/benjamn/recast)
* [ast-types examples in crguezl/hello-ast-types](https://github.com/crguezl/hello-ast-types)

### Estraverse

* [Estraverse README.md](https://github.com/estools/estraverse/blob/master/README.md)
* Simple examples of AST traversal and transformation [crguezl/ast-traversal](https://github.com/crguezl/ast-traversal)

### Repositorios interesantes de cowchimp

* <a href="https://github.com/cowchimp/awesome-ast" target="_blank">A curated list of awesome AST resources</a>
* <a href="https://github.com/cowchimp/astscout" target="_blank">AST Scout is a tool for analyzing and visualizing the relationship between the public API of a Class\Module and its implementations details (e.g. private methods, dependencies used).</a>
* <a href="https://github.com/cowchimp/astexplorer" target="_blank">A web tool to explore the ASTs generated by various parsers. https://astexplorer.net/</a> The repo

### AST: Awesome Super Tool - JS Roundabout - April 2019

This is a talk similar to Yonatan Mevorach by Leonardo Crespo given in 2019:

* [AST: Awesome Super Tool - JS Roundabout - April 2019](https://youtu.be/N5v8Ul6ph90) by Leonardo Crespo
