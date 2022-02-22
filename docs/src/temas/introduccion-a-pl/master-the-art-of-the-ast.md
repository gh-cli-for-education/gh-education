---
---

# AST Transformations 

## Constant Folding

The following code uses estraverse to implement the AST tree transformation [Constant Folding](https://en.wikipedia.org/wiki/Constant_folding). **Constant folding** is the process of recognizing and evaluating constant expressions at compile time rather than computing them at runtime. 

```js
const fs = require("fs");
const deb = require('../src/deb.js');
const escodegen = require("escodegen");
const espree = require("espree");
const estraverse = require("estraverse");

const t = espree.parse('a = 2+3*5+b', { ecmaVersion: 6, loc: false });
//deb(t);
estraverse.traverse(t, {
  leave: function (n, p) {
    if (
      n.type == "BinaryExpression" &&
      n.left.type == "Literal" &&
      n.right.type == "Literal"
    ) {
        n.type = "Literal";
        n.value = eval(`${n.left.value} ${n.operator} ${n.right.value}`);
        n.raw = String(n.value);
        delete(n.left);
        delete(n.right);
    }
  },
});
deb(t);
let c = escodegen.generate(t);
console.log(c);
```

Execution:

```js
➜  espree-logging-casiano-rodriguez-leon-alumno5 git:(train) ✗ node src/cf.js
{
  "type": "Program",
  "start": 0,
  "end": 11,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 11,
      "expression": {
        "type": "AssignmentExpression",
        "start": 0,
        "end": 11,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 0,
          "end": 1,
          "name": "a"
        },
        "right": {
          "type": "BinaryExpression",
          "start": 4,
          "end": 11,
          "left": {
            "type": "Literal",
            "start": 4,
            "end": 9,
            "operator": "+",
            "value": 17,
            "raw": "17"
          },
          "operator": "+",
          "right": {
            "type": "Identifier",
            "start": 10,
            "end": 11,
            "name": "b"
          }
        }
      }
    }
  ],
  "sourceType": "script"
}
a = 17 + b;
```

## Estraverse

* [README.md](https://github.com/estools/estraverse/blob/master/README.md)


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

## jscodeshift example

### Codemod

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


### JSCodeshift 

<a href="https://github.com/facebook/jscodeshift" target="_blank">JSCodeshift</a> is a toolkit for running codemods over multiple JavaScript or
TypeScript files.


The jscodeshift toolkit allows you to pump a bunch of source files through a transform and replace them with what comes out the other end. Inside the transform, you parse the source into an abstract syntax tree (AST), poke around to make your changes, then regenerate the source from the altered AST.

The interface that jscodeshift provides is a wrapper around [recast](https://github.com/benjamn/recast) and ast-types packages. [recast](https://github.com/benjamn/recast) handles the conversion from source to AST and back while ast-types handles the low-level interaction with the AST nodes.

```
jscodeshift -t some-transform.js input-file.js -d -p
```

This will run input-file.js through the transform some-transform.js and print the results without altering the file.
* <a href="https://github.com/facebook/jscodeshift" target="_blank">codeshift at GitHub</a>
* <a href="https://www.toptal.com/javascript/write-code-to-rewrite-your-code" target="_blank">Write Code to Rewrite Your Code: jscodeshift</a>
* <a href="https://glebbahmutov.com/blog/jscodeshift-example/" target="_blank">jscodeshift example</a>
* <a href="https://github.com/cpojer/js-codemod/blob/master/transforms/no-vars.js" target="_blank">jscodeshift cpojer/js-codemod no-vars.js</a>
* [recast](https://github.com/benjamn/recast)

## References

### Repositorios interesantes de cowchimp

* <a href="https://github.com/cowchimp/awesome-ast" target="_blank">A curated list of awesome AST resources</a>
* <a href="https://github.com/cowchimp/astscout" target="_blank">AST Scout is a tool for analyzing and visualizing the relationship between the public API of a Class\Module and its implementations details (e.g. private methods, dependencies used).</a>
* <a href="https://github.com/cowchimp/astexplorer" target="_blank">A web tool to explore the ASTs generated by various parsers. https://astexplorer.net/</a> The repo

### AST: Awesome Super Tool - JS Roundabout - April 2019

This is a talk similar to Yonatan Mevorach by Leonardo Crespo given in 2019:

* [AST: Awesome Super Tool - JS Roundabout - April 2019](https://youtu.be/N5v8Ul6ph90) by Leonardo Crespo
