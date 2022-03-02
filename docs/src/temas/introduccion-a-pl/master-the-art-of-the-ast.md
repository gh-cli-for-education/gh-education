---
---

# AST Transformations 

## Introduction

### Constant Folding

The following code uses estraverse to implement a simplified version of the AST tree transformation knwon as [Constant Folding](https://en.wikipedia.org/wiki/Constant_folding). **Constant folding** is the process of recognizing and evaluating constant expressions at compile time rather than computing them at runtime. 

```js
// See https://github.com/babel/minify/tree/master/packages/babel-plugin-minify-constant-folding
const fs = require("fs");
const deb = require("../src/deb.js");
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

function replaceByLiteral(n) {
  n.type = "Literal";

  n.value = eval(`${n.left.raw} ${n.operator} ${n.right.raw}`);
  n.raw = String(n.value);

  delete n.left;
  delete n.right;
}

const t = espree.parse(input, { ecmaVersion: 6, loc: false });
estraverse.traverse(t, {
  leave: function (n, p) {
    if (
      n.type == "BinaryExpression" && 
      n.left.type == "Literal" && n.right.type == "Literal"
    ) { replaceByLiteral(n); }
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


### The Lab Espree Logging

* [Descripción de la Práctica Espree Logging](/practicas/esprima-logging)


##  Master the AST lecture series

* Talk [Master the Art of the AST and Take Control of Your JS][ast]  by Yonatan Mevorach. 
    - [Here are the slides](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/ast-talk-codemotion-170406094223.pdf)

* [Here is another version of the talk at Javascript Israel](https://500tech.com/blog/all/yonatan-mevorach-on-abstract-syntax-trees) by Yonatan Mevorach

[ast]: https://youtu.be/C06MohLG_3s

### ASTExplorer

* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>

### ESLint *Piggyback example*

* <a href="https://eslint.org/docs/developer-guide/working-with-plugins" target="_blank">ESLint: Working with Plugins</a>
* <a href="https://github.com/cowchimp/eslint-plugin-piggyback" target="_blank">eslint-plugin-piggyback</a>

### Babel remove "debugger" example

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

### Introduction 

The [ast-types](https://github.com/benjamn/ast-types) module provides an 
[Esprima](https://github.com/ariya/esprima)-compatible implementation of
the [abstract syntax tree type hierarchy](http://en.wikipedia.org/wiki/Abstract_syntax_tree)
that was leaded by a project called Mozilla Parser API [JavaScript:SpiderMonkey:Parser API](https://web.archive.org/web/20210314002546/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API). 

### SpiderMonkey Parser API and estree/estree

::: warning
NOTE: The page [JavaScript:SpiderMonkey:Parser API](https://web.archive.org/web/20210314002546/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API) describes SpiderMonkey-specific behavior and is incomplete. Visit [ESTree spec](https://github.com/estree/estree) for a community AST standard that includes latest ECMAScript features and is backward-compatible with SpiderMonkey format.
::: 

See  the [estree org](https://github.com/estree) and the [estree repo](https://github.com/estree/estree):

> Once upon a time, an [unsuspecting Mozilla engineer](http://calculist.org) created an API in Firefox that exposed the SpiderMonkey engine's JavaScript parser as a JavaScript API. Said engineer [documented the format it produced](https://web.archive.org/web/20210314002546/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API), and this format caught on as a lingua franca for tools that manipulate JavaScript source code.

> Meanwhile JavaScript is evolving. [This site](https://github.com/estree/estree/blob/master/README.md) will serve as a community standard for people involved in building and using these tools to help evolve this format to keep up with the evolution of the JavaScript language.

See also the video lecture [SpiderMonkey Parser API: A Standard For Structured JS Representations](https://www.infoq.com/presentations/spidermonkey-parser-api/) by Michael Ficarra 2014 at InfoQ. 

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

### Path objects

ast-types defines methods to 
1. traverse the AST, 
2. access node fields and 
3. build new nodes. 
 
ast-types wraps every AST node into a *path object*. 
Paths contain meta-information and helper methods to
process AST nodes.

For example, the child-parent relationship between two nodes is not explicitly
defined. Given a plain AST node, it is not possible to traverse the tree *up*.
Given a path object however, the parent can be traversed to via `path.parent`.

The `NodePath` object passed to visitor methods is a wrapper around an AST
node, and it serves to provide access to the chain of ancestor objects
(all the way back to the root of the AST) and **scope** information.

In general, `path.node` refers to the wrapped node, `path.parent.node`
refers to the nearest `Node` ancestor, `path.parent.parent.node` to the
grandparent, and so on.

::: warning
Note that `path.node` may not be a **direct** property value of
`path.parent.node`;  but it might be the case that `path.node` is
an element of an array that is a direct child of the parent node:

```js
path.node === path.parent.node.elements[3]
```
:::

You should know that `path.parentPath` provides
finer-grained access to the complete path of objects (not just the `Node`
ones) from the root of the AST:

In reality, path.parent is the grandparent of path:

```js
path.parentPath.parentPath === path.parent
```

The `path.parentPath` object wraps the `elements` array (note that we use
`.value` because the elements array is not a Node):

```js
path.parentPath.value === path.parent.node.elements

// The path.node object is the fourth element in that array:
path.parentPath.value[3] === path.node
```

Unlike `path.node` and `path.value`, which are synonyms because `path.node`
is a `Node` object, 

`path.parentPath.node` is distinct from
`path.parentPath.value`, because the `elements` array is not a
`Node`. 

Instead, `path.parentPath.node` refers to the closest ancestor
`Node`, which happens to be the same as `path.parent.node`:

```js
path.parentPath.node === path.parent.node
```

The path is named for its index in the elements array:

```js
path.name === 3
```

Likewise, path.parentPath is named for the property by which
path.parent.node refers to it:

```js
path.parentPath.name === "elements"
```

Putting it all together, we can follow the chain of object references
from path.parent.node all the way to path.node by accessing each
property by name:

```js
path.parent.node[path.parentPath.name][path.name] === path.node
```

These `NodePath` objects **are created during the traversal** without
modifying the AST nodes themselves, so it's not a problem if the same node
appears more than once in the AST, because it will be visited with a distict `NodePath`
each time it appears.

Child `NodePath` objects are created lazily, by calling the `.get` method
of a parent `NodePath` object:

```js
// If a NodePath object for the elements array has never been created
// before, it will be created here and cached in the future:
path.get("elements").get(3).value === path.value.elements[3]

// Alternatively, you can pass multiple property names to .get instead of
// chaining multiple .get calls:
path.get("elements", 0).value === path.value.elements[0]
```

### nodePath.replace

`NodePath` objects support a number of useful methods:

Replace one node with another node:

```js
var fifth = path.get("elements", 4);
fifth.replace(newNode);
```

Now do some stuff that might rearrange the list, and this replacement
remains safe:

```js
fifth.replace(newerNode);
```

Replace the third element in an array with two new nodes:

```js
path.get("elements", 2).replace(
  b.identifier("foo"),
  b.thisExpression()
);
```

Here is the code of the example [replace.js](https://github.com/crguezl/hello-ast-types/blob/master/replace.js)

```js
import recast from "recast";
import { builders as b, visit } from "ast-types";

let ast = b.functionDeclaration(
  b.identifier("fn"),
  [],
  b.blockStatement([
    b.variableDeclaration("var", [
      b.variableDeclarator(b.identifier("a"), b.literal("hello world!")),
    ]),
  ])
);
console.log(recast.print(ast).code) // function fn() { var a = "hello world!"; }

visit(ast, {
  visitVariableDeclaration: function (path) {
    path.replace(b.returnStatement(null));
    this.traverse(path);
  },
});

console.log(ast.body.body[0]); // { argument: null, loc: null, type: 'ReturnStatement', comments: null }
console.log(recast.print(ast).code) // function fn() { return; }
```

### nodePath.prune

Remove a node and its parent if it would leave a redundant AST node. Example:

```js 
var t = 1, y =2;
``` 

removing the `t` and `y` declarators results in `var undefined`.

`path.prune();` 

returns the closest parent `NodePath`.

Here is a full example of `prune`:

```js
//import  * as espree from "espree";
import { parse, Syntax } from "espree";
import { NodePath } from "ast-types";

  const deb = x => (JSON.stringify(x, null, 2));

  var programPath = new NodePath(parse("var y = 1,x = 2;"));
  
  var variableDeclaration = programPath.get("body", 0); 
  // It has the shape { ... declarations: [ VariableDeclarator, VariableDeclarator], ... }
  
  var yVariableDeclaratorPath = variableDeclaration.get("declarations", 0);
  var xVariableDeclaratorPath = variableDeclaration.get("declarations", 1);

  var remainingNodePath = yVariableDeclaratorPath.prune(); // returns the closest parent NodePath
  remainingNodePath = xVariableDeclaratorPath.prune();

  console.log(deb(programPath.node)); 
  /* Output:
  {
  "type": "Program",
  "start": 0,
  "end": 16,
  "body": [],
  "sourceType": "script"
}
*/
```

### Other NodePath methods

Remove a node from a list of nodes:

```js
path.get("elements", 3).replace();
``` 

Add three new nodes to the beginning of a list of nodes:

```js
path.get("elements").unshift(a, b, c);
```

Remove and return the first node in a list of nodes:

```js
path.get("elements").shift();
```

Push two new nodes onto the end of a list of nodes:

```js
path.get("elements").push(d, e);
```

Remove and return the last node in a list of nodes:

```js
path.get("elements").pop();
```

Insert a new node before/after the seventh node in a list of nodes:

```js
var seventh = path.get("elements", 6);
seventh.insertBefore(newNode);
seventh.insertAfter(newNode);
```

Insert a new element at index 5 in a list of nodes:

```js
path.get("elements").insertAt(5, newNode);
```
### Scope

File [crguezl/hello-ast-types/scope-catch.js](https://github.com/crguezl/hello-ast-types/blob/master/scope-catch.js)

[See the AST](https://astexplorer.net/#/gist/f00452c960b249ed36aacc08cacaaa34/646c9796cf42772a97f8b6448a12e99f7610838c) for the input source.

```js
import assert from "assert";
import { parse } from "espree";
import { namedTypes as n, NodePath,} from "ast-types";

const deb = (x) => JSON.stringify(x, null, 2);

// "catch block scope"
var catchWithVarDecl = `
  function foo(e) {
    try {
      bar();
    } catch (e) {
      var f = e + 1;
      return function(g) {
        return e + g;
      };
    }
    return f;
  }
`;

var path = new NodePath(parse(catchWithVarDecl));
var fooPath = path.get("body", 0);
var fooScope = fooPath.scope;
var catchPath = fooPath.get("body", "body", 0, "handler");
var catchScope = catchPath.scope;

// it should not affect outer scope declarations
n.FunctionDeclaration.assert(fooScope.node);
assert.strictEqual(fooScope.declares("e"), true);
assert.strictEqual(fooScope.declares("f"), true);
assert.strictEqual(fooScope.lookup("e"), fooScope);

//it should declare only the guard parameter
n.CatchClause.assert(catchScope.node);
assert.strictEqual(catchScope.declares("e"), true);
assert.strictEqual(catchScope.declares("f"), false);
assert.strictEqual(catchScope.lookup("e"), catchScope);
assert.strictEqual(catchScope.lookup("f"), fooScope);

// it should shadow only the parameter in nested scopes
// The argument of the return inside the catch
var closurePath = catchPath.get("body", "body", 1, "argument");
var closureScope = closurePath.scope;
n.FunctionExpression.assert(closureScope.node);
assert.strictEqual(closureScope.declares("e"), false);
assert.strictEqual(closureScope.declares("f"), false);
assert.strictEqual(closureScope.declares("g"), true);
assert.strictEqual(closureScope.lookup("g"), closureScope);
assert.strictEqual(closureScope.lookup("e"), catchScope);
assert.strictEqual(closureScope.lookup("f"), fooScope);
```

### Warning the use of Old JS arguments.callee

Early versions of JavaScript did not allow named function expressions, 
and for this reason you could not make a recursive function expression. 

To write a recursive anonymous function you had to take advantage of [arguments.callee](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee). The `arguments.callee` property contains the currently executing function:

```js
var fac = function(n) { 
  return !(n > 1) ? 1 : arguments.callee(n - 1) * n; 
}
```

The 5th edition of ECMAScript (ES5) forbids its use.

The goal of this code example: you want to detect uses of this old trick to update the code.

See [crguezl/hello-ast-types#visitmemberexpressionjs](https://github.com/crguezl/hello-ast-types#visitmemberexpressionjs) for  the usage example 
and [crguezl/hello-ast-types/visitmemberexpression.js](https://github.com/crguezl/hello-ast-types/blob/master/visitmemberexpression.js) for a solution

### Translating the ES6 spread operator ... to ES5

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

See the file [spread-operator.js in the repo crguezl/hello-ast-types](https://github.com/crguezl/hello-ast-types/blob/master/spread-operator.js)

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

Here is the full code for the transformation:

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

### Checking if a function refers to `this`

These two rules may help to understand the semantics of `this` when used in JS functions: 

1. Arrow functions take their value of "`this`" from the lexical scope.
2. Functions take their value of "`this`" from the context object.

The following example illutrates these rules:

```js
let g = {
    myVar: 'g',
    gFunc: function() { 
        console.log(this.myVar);  // g
        let obj = {
            myVar: 'foo',       
            a: () => console.log(this.myVar), //  this arrow func is in the scope of gFunc
            objFunc: function() { 
              console.log(this.myVar); // foo
              this.a()                 // g
            }
        };
        obj.objFunc()
    },    
} 
g.gFunc();
```

If we are considering to rewrite some function as an arrow function, a conservative policy will be to be sure that the function does not refer in any way to the context object `this`.

The traversing of the AST at [crguezl/hello-ast-types/check-this-usage.js](https://github.com/crguezl/hello-ast-types/blob/master/check-this-usage.js) attempts to detect when `this` (or `super()` or something like `super.meth()`) is used inside the body of a function. 

```js
  hello-ast-types git:(master) node check-this-usage.js 

function tutu() {
    return this.prop+4;
}

Inside Function visitor tutu
inside thisexpression
true
----

function tutu() {
    return prop+4;
}

Inside Function visitor tutu
false
----

function tutu() {
    function titi() {
        return this.prop+4;
    }
    
    return prop+4;
}

Inside Function visitor tutu
Inside Function visitor titi
false
----

  function tutu() {
    return super();
  }

Inside Function visitor tutu
true
----

  function tutu() {
    return super.meth();
  }

Inside Function visitor tutu
true
----
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
TypeScript files. The interface that jscodeshift provides is a wrapper around [recast](#recast) and ast-types packages. 

![jscodeshift and recast relation image](/images/jscodeshift-recast-phases.png)

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

More on JSCodeshift in the article [Write Code to Rewrite Your Code: jscodeshift](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by eremy Greer

## References

### JSCodeshift

* <a href="https://github.com/facebook/jscodeshift" target="_blank">Codeshift at GitHub</a>
* [JSCodeshift API Doc](https://npmdoc.github.io/node-npmdoc-jscodeshift/build/apidoc.html)
* <a href="https://www.toptal.com/javascript/write-code-to-rewrite-your-code" target="_blank">Write Code to Rewrite Your Code: jscodeshift</a> Examples: removing console.log, replacing imported method calls, from positional parameters to parameter object
* <a href="https://glebbahmutov.com/blog/jscodeshift-example/" target="_blank">jscodeshift "hello world" example</a>
* <a href="https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js" target="_blank">jscodeshift cpojer/js-codemod no-vars.js</a> Conservatively converts `var` to `const` or `let`. `jscodeshift -t js-codemod/transforms/no-vars.js <file>`



#### Rajasegar works

* [Migrating large codebase with Codemods](https://youtu.be/akKMopknEwc) YouTube video. Talk at JSFoo Pune 2020. On component architecture, performance, security for front-end, and emerging trends. Rajasegar Chandran.
  * [Slides](https://drive.google.com/file/d/1fHmdLBZktBE_yvhP4Oj75zoFOMYGuob5/view)
  * [Awesome codemods](https://github.com/rajasegar/awesome-codemods) at rajasegar/awesome-codemods

#### Riki Fridrich

* [Write a code that writes code](https://slideslive.com/38965948/write-a-code-that-writes-code?ref=account-13779-latest) talk by Riki Fridrich. Sep 22, 2021. WebExpo
* [fczbkk/talk-2021-09-22-webexpo-codemod](https://github.com/fczbkk/talk-2021-09-22-webexpo-codemod) GitHub Repo


### ast-types and recast 

* [recast](https://github.com/benjamn/recast)
* [ast-types examples in crguezl/hello-ast-types](https://github.com/crguezl/hello-ast-types)
* [api documentation for ast-types (v0.9.11)](https://npmdoc.github.io/node-npmdoc-ast-types/build/apidoc.html#apidoc.tableOfContents) (Don't trust it. Current version is 0.15) 

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
