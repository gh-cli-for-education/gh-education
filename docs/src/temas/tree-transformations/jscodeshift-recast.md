---
next: jscodeshift.md
---
# Recast and JSCodeShift 

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

The jscodeshift toolkit allows you to pump a bunch of source files through a transform and replace them with what comes out the other end. 

Inside the transform, you 

1. parse the source into an abstract syntax tree (AST), 
2. poke around to make your changes, 
3. then regenerate the source from the altered AST.

The interface that jscodeshift provides is a wrapper around [recast](https://github.com/benjamn/recast) and ast-types packages. [recast](https://github.com/benjamn/recast) handles the conversion from source to AST and back while ast-types handles the low-level interaction with the AST nodes.


```
jscodeshift -t some-transform.js input-file.js -d -p
```

This will run `input-file.js` through the transform `some-transform.js` and 
print the results without altering the file.

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

Continue now reading the section [Facebook jscodeshift](jscodeshift)

## References

More on JSCodeshift in the article [Write Code to Rewrite Your Code: jscodeshift](https://www.toptal.com/javascript/write-code-to-rewrite-your-code) by Jeremy Greer

See [Tree  Transformations References](/temas/tree-transformations/tree-transformations-references)