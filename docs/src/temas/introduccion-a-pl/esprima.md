---
title: "Phases of a Translator"
prev: /temas/introduccion-a-pl/what-is-pl-about.html#what-is-a-compiler-history-and-structure
next: master-the-art-of-the-ast
sidebarDepth: 3
---
# {{ $frontmatter.title }}

En el [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk) encontrará el material de esta lección.
**Clone este repo**.

The examples in this repo use a couple of JavaScript compiler frameworks: [Esprima](http://esprima.org) and Espree.

[Espree](https://github.com/eslint/espree) started out as a fork of [Esprima](http://esprima.org) v1.2.2, the last stable published released of Esprima before work on ECMAScript 6 began. [Espree](https://github.com/eslint/espree) is now built on top of [Acorn](https://github.com/ternjs/acorn), which has a modular architecture that allows extension of core functionality. The goal of [Espree](https://github.com/eslint/espree) is to produce output that is similar to Esprima with a similar API so that it can be used in place of Esprima.

## Introducción a Espree. REPL example

Una vez clonado el [repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk), instalamos las dependencias:

```
➜  esprima-pegjs-jsconfeu-talk git:(master) npm i
```

y arrancamos el bucle REPL de Node.JS:

```
➜  esprima-pegjs-jsconfeu-talk git:(master) node
Welcome to Node.js v14.4.0.
Type ".help" for more information.
```

### Espree supportedEcmaVersions

Cargamos `espree`:

```js
> const espree = require('espree')
undefined
> espree.version
'7.3.1'
> espree.latestEcmaVersion
12
> espree.supportedEcmaVersions
[
  3,  5,  6,  7, 8,
  9, 10, 11, 12
]
```

### Análisis léxico

Hagamos un análisis léxico:

```js
> espree.tokenize('answer = /* comment*/ 42', { range: true })
[
  Token {
    type: 'Identifier',
    value: 'answer',
    start: 0,
    end: 6,
    range: [ 0, 6 ]
  },
  Token {
    type: 'Punctuator',
    value: '=',
    start: 7,
    end: 8,
    range: [ 7, 8 ]
  },
  Token {
    type: 'Numeric',
    value: '42',
    start: 22,
    end: 24,
    range: [ 22, 24 ]
  }
]
```

### Análisis sintáctico con Espree

Hagamos ahora un análisis sintáctico:

```js
> espree.parse('const answer = 42', { tokens: true })
Uncaught [SyntaxError: The keyword 'const' is reserved
] {
  index: 0,
  lineNumber: 1,
  column: 1
}
```

La versión ECMA de JS usada por defecto por `espree` es la 5 y esta no admite `const`

Especifiquemos la versión ECMA que queremos:

```js
> espree.parse('const answer = 42', 
              { ecmaVersion: espree.latestEcmaVersion, 
                tokens: true }
              )
Node {
  type: 'Program',
  start: 0,
  end: 17,
  body: [
    Node {
      type: 'VariableDeclaration',
      start: 0,
      end: 17,
      declarations: [Array],
      kind: 'const'
    }
  ],
  sourceType: 'script',
  tokens: [
    Token { type: 'Keyword', value: 'const', start: 0, end: 5 },
    Token { type: 'Identifier', value: 'answer', start: 6, end: 12 },
    Token { type: 'Punctuator', value: '=', start: 13, end: 14 },
    Token { type: 'Numeric', value: '42', start: 15, end: 17 }
  ]
}
```

### util.inspect 

Observe que el Árbol no aparece completo. El log que usa el bucle REPL de Node lo trunca en el hijo `declarations` (sólo nos muestra que es un array `[Array]` sin expandirlo) para que la salida no sea excesivamente larga.

Para que nos muestre el árbol vamos a usar el método `util.inspect` del módulo `util` 
que convierte un objeto en una string:

```js
> const util = require('util')
undefined
> console.log(
    util.inspect(
        espree.parse('const answer = 42',{ecmaVersion: 6}), 
        {depth: null}
    )
 )
Node {
  type: 'Program',
  start: 0,
  end: 17,
  body: [
    Node {
      type: 'VariableDeclaration',
      start: 0,
      end: 17,
      declarations: [
        Node {
          type: 'VariableDeclarator',
          start: 6,
          end: 17,
          id: Node {
            type: 'Identifier',
            start: 6,
            end: 12,
            name: 'answer'
          },
          init: Node {
            type: 'Literal',
            start: 15,
            end: 17,
            value: 42,
            raw: '42'
          }
        }
      ],
      kind: 'const'
    }
  ],
  sourceType: 'script'
}
undefined
```

### El Objeto AST generado por el parser de Espree

Ves que el objeto está compuesto de objetos de la clase `Node`. Si te concentras sólo en los campos `type` del objeto queda 
mas evidente como el objeto describe la jerarquía AST construída para la frase `answer = 42`. En las etiquetas de als aristas he puesto los nombres de los atributos y el tipo (`[Node]` para indicar array de objetos `Node`)

```mermaid
graph TB
  subgraph AST for 'answer = 42'
    A((Program))-->|"body [Node]"| B((VariableDeclaration))
    B-->|"declarations [Node]"| C((VariableDeclarator))
    C-->|"id Node"| D(("id name='answer'"))
    C-->|"init Node"| E(("Literal value=42"))
  end
```

### Tipos de Nodos y nombres de los hijos

Navegar en el árbol AST es complicado. 
El atributo [`espree.visitorKeys`](espree-visitorkeys) nos proporciona la lista de nodos y los nombres de  los atributos de sus hijos

```js
> const typesOfNodes = Object.keys(espree.VisitorKeys)
undefined
> typesOfNodes.slice(0,4)
[
  'AssignmentExpression',
  'AssignmentPattern',
  'ArrayExpression',
  'ArrayPattern'
]
```

El valor nos da los nombres de los atributos que define los hijos:

```js 
> espree.VisitorKeys.AssignmentExpression
[ 'left', 'right' ]
> espree.VisitorKeys.IfStatement
[ 'test', 'consequent', 'alternate' ]
```

## El web site ASTExplorer.net

Usando la herramienta web **[https://astexplorer.net](https://astexplorer.net)** podemos navegar el AST producido por varios compiladores JS:

* <a href="https://astexplorer.net/#/gist/b5826862c47dfb7dbb54cec15079b430/latest" target="_blank">AST de <code>answer = 42</code></a> en [https://astexplorer.net](https://astexplorer.net)
* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>

## Traversing the AST

The file [idgrep.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.js) is a very simple example of using Esprima
to do static analysis on JavaScript code.

It provides a function `idgrep` that finds the appearances of identifiers matching a search string inside the input code.

```js
!!!include(temas/introduccion-a-pl/code-examples/idgrep.js)!!!
```


Examples of executions.

With two input files:

```
➜ (private) ✗ ./idgrep.js  espree-logging-solution.js hello-ast-espree.js -p ast
file espree-logging-solution.js: line 13: col: 10 text:     estraverse.traverse(ast, {
file espree-logging-solution.js: line 14: col: 24 text:         enter: function(node) {
file espree-logging-solution.js: line 23: col: 30 text: }
file hello-ast-espree.js: line 3: col: 6 text: function getAnswer() {
file hello-ast-espree.js: line 8: col: 25 text: undefined
```

With a single file and testing [hacky.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/406ebd2a9d75c5fe93d1dbcce71b30e3f67490d9/hacky.js) (Observe how the appearances of `hack` inside the comment or the string aren't shown)

```
➜  esprima-pegjs-jsconfeu-talk git:(private) ✗ ./idgrep.js -p hac hacky.js                                       
file hacky.js: line 2: col: 6 text:     /* This hack does not count */
file hacky.js: line 4: col: 8 text:     let another = 9;
```

When the file doesn't exist:

```
➜  esprima-pegjs-jsconfeu-talk git:(private) ✗ ./idgrep.js fhjdfjhdsj     

/Users/casianorodriguezleon/campus-virtual/shared/esprima-pegjs-jsconfeu-talk-labs/esprima-pegjs-jsconfeu-talk/idgrep.js:45
      if (err) throw `Error reading '${inputFilename}':${err}`;
               ^
Error reading 'fhjdfjhdsj':Error: ENOENT: no such file or directory, open 'fhjdfjhdsj'
(Use `node --trace-uncaught ...` to show where the exception was thrown)
```

## Transforming the AST. The Lab Espree Logging

* [Descripción de la Práctica Espree Logging](/practicas/esprima-logging)

## How to build a Parser 

### First Steps on Building a Parser with Jison

See the examples in the repo [crguezl/hello-jison](https://github.com/crguezl/hello-jison)

[This repo](https://github.com/crguezl/hello-jison) contains two examples:

* The first one is a simple interpreter for infix arithmetic expressions with the minus operator only
  * See files `minus.jison`, `minus.l` and  `use_minus.js`
* The second is a translator from infix arithmetic expressions to JavaScript
  * `minus-ast.jison` builds a Espree compatible AST using `minus.l` and the helpers in `ast-build.js`
  * The lexical analyzer `minus.l` is reused
* The `ast-*.json` files contain examples of Espree ASTs

### Calculator example with PEG.js from the talk Parsing, Compiling, and Static Metaprogramming

[altjs.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/altjs.js) is the code for the "AltJS language in 5 minutes" section
presented in the second half of the [talk Parsing, Compiling, and Static Metaprogramming](http://2013.jsconf.eu/speakers/patrick-dubroy-parsing-compiling-and-static-metaprogramming.html) by Patrick Dubroy


## References

* [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk)
* [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* <a href="https://astexplorer.net/" target="_blank">astexplorer.net demo</a>
* [idgrep.js](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/idgrep.js)
* [Master the Art of the AST](master-the-art-of-the-ast)
