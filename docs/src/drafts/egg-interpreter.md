---
title: The Egg Interpreter
published: true
date: 2022/04/01
delivery: "2022/04/21"
order: 12
layout: Practica
prev: 
sidebar: auto
template: "https://github.com/crguezl/egg-interpreter-template"
permalink: /practicas/egg-interpreter
rubrica:
  - 
    - Documentación
    - Gramática documentada y se corresponde con el compilador
    - ASTs documentados y se corresponden
    - Documentación del módulo npm (API) y ejecutables como se usan
    - "Opcional: Documentación de la API de los módulos (parser, eggvm), informe de cubrimiento, etc."
  - set (asignación y manejo de ámbitos)
  - 
    - Ejecutables
    - "Runner: `egg.js`. Funcionamiento, documentación de uso, ayuda, etc."
    - "Compiler: `eggc.js`. Funcionamiento, documentación de uso, ayuda, etc."
    - "Virtual Machine: `eggvm.js`.  Funcionamiento, documentación de uso, ayuda, etc."
  -
    - Pruebas
    - Se provee una carpeta `examples`  con ejemplos de programas `egg``
    - Se ha automatizado el proceso de pasar del "*ejemplo que funciona*" a "*test unitario que prueba que funciona*"
    - Se hace integración contínua
  - 
    - Se ha publicado en GitHub Registry 
    - La publicación cumple los estándares de publicación de un módulo (CI, versionado, documentación, etc.)
  - 
    - El bucle REPL 
    - Evalúa correctamente y no se despista
    - Detecta expresiones incompletas
    - Colores 
---

# {{$frontmatter.title }}

## Modificaciones en el módulo de Análisis Sintáctico

A estas alturas el módulo que escribió en la práctica [egg-parser]() debería de usar para su análisis léxico
el generador de analizadores léxicos realizado en la práctica [lexer generator](). 

El analizador léxico de su parser debería ser algo así:

```js
const { tokens } = require('./tokens.js');
const { nearleyLexer } = require("@ull-esit-pl-2122/lexer-generator-solution");
let lexer = nearleyLexer(tokens);
module.exports = lexer;
```

Además del ejecutable `eggc` que ya exportaba le añadiremos un fichero `src/parse.js` que constituirá el `main` del módulo. Sigue un extracto de como podría ser el `package.json`:

```js
{
  "name": "@ull-esit-pl-2122/egg-parser-solution",
  "version": "1.0.3",
  "description": "Lab for language processors",
  "main": "src/parse.js",
  "bin": {
    "eggc": "bin/eggc.js"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },
  ...
}
```

El fichero `parse.js` exportarà un conjunto de funciones y objetos que facilitarán las labores de parsing desde el módulo e esta práctica:

```js
module.exports = {
  lex,  // El analizador léxico
  parse,
  parseFromFile,
  parBalance, 
  SPACE // La expresión regular para blancos y comentarios
  /* ... etc. */
};
```

## Bucle REPLpara egg (Repeat Evaluate Print Loop) and parBalance 

* Véase la sección [Construcción de un Repeat Evaluate Print Loop](/temas/interpretation/repl-interpretation.md)
* Véase también la sección [The Strategy Pattern](/temas/introduccion-a-javascript/design.html)


## Una Clase para cada tipo de nodo del AST

Véase la sección [Interpretación de los Nodos del AST](/temas/interpretation/ast-interpretation)

## Providing an Assignment 

The initial way to assign a binding a value in Egg is via `def`ine. 
This construct acts as a way both to define new bindings and to give existing ones a new value.

As a consequence, when you try to give a nonlocal binding a new value, you will end up defining a local one with the same name instead. 

Add a special interpreter for `set(x, value)`, similar to `def(x, value)`, which

1. Does not create a new binding in the current scope
2. Updates the entry in the nearest scope (local, parent, grand-parent, etc.) in which a binding with name `x` exist
3. If no binding with name `x` exists, throws a `ReferenceError`.

This example illustrates the kind of behavior we want:

```js
➜  eloquentjsegg git:(private2122) cat examples/scope.egg 
do( 
  def(x,9), /* def crea una nueva variable local */
  def(f, fun( /* fun creates a new scope */
    do(
      def(x, 4), 
      print(x) # 4
    )
  )),
  def(g, fun(set(x, 8))), /* set no crea una nueva variable local */
  f(),
  print(x), # 9
  g(),
  print(x) # 8
)
➜  eloquentjsegg git:(private2122) bin/egg.js examples/scope.egg 
4
9
8
```

Some languages use the idea of **l-values** and **r-values**, deriving from the typical mode of evaluation on the left and right-hand side of an assignment statement. 

* An **l-value** refers to an object that persists beyond a single expression. 
* An **r-value** is a temporary value that does not persist beyond the expression that uses it.

In many languages, notably the C family, l-values have storage addresses that are programmatically accessible to the running program (e.g., via some address-of operator like "`&`" in C/C++), meaning that they are variables or de-referenced references to a certain memory location. 

Form the prespective of interpretation and translation, the same sub-expresion `x` has different meanings depending on the side of the assignment in which it is:

```js
x = x
```
On the left side `x` is a reference or a binding, on the right side is a value: the value stored on that reference. 

Our `evaluate` methods do not work here, since they interpret the expressions in a r-value context.

Te proposal is to introduce `leftEvaluate` methods in the AST node classes that evaluate the expressions in a l-value context. Something like the following code for `specialForms['=']`:

```js{10}
specialForms['='] = specialForms['set'] = function(args, env) { 
  if (args.length !== 2 || args[0].type === 'value') {
    throw new SyntaxError('Bad use of set');
  }

  let valueTree = args[args.length-1];
  let value = valueTree.evaluate(env);

  let leftSide = args[0];
  let [scope, name] = leftSide.leftEvaluate(env);
  scope[name] = value;

  return value;
}
```

Try to write the `leftEvaluate` method(s).

::: danger Future Work

Although by now we will restrict to allow only words on the left side of any assignment, we aim to increase expressiveness and to allow assignments that can contains expressions like the `m[-1]` in the following 
example:

```js{4}
➜  eloquentjsegg git: cat examples/set-array-negative.egg       
do(
  def(m, array(1, 2, 3)),
  set(m[-1], "asd"),
  print(m)
)

➜  eloquentjsegg git: bin/egg.js examples/set-array-negative.egg
[1,2,"asd"]
```
::: 

### See also

* See also section [Fixing Scope](https://eloquentjavascript.net/12_language.html#i_Y9ZDMshYCQ) in the EloquentJS book
* Puede encontrar una solución al problema en la rama `inicial` de este repo [ULL-ESIT-PL-1617/egg/](https://github.com/ULL-ESIT-PL-1617/egg/tree/inicial). La rama `inicial` como su nombre indica contiene además del código  descrito en el capítulo de EloquentJS las soluciones a los ejercicios propuestos en el capítulo del libro.

## Functions

Functions in Egg get their own local scope. 

The function produced by the fun form creates this local scope and adds the argument bindings to it. 

It then evaluates the function body in this scope and returns the result.



```js
specialForms['->'] =specialForms['fun'] = function(args, env) {
  if (!args.length) {
    throw new SyntaxError('Functions need a body.')
  }

  function name(expr) {
    if (expr.type != 'word') {
      throw new SyntaxError('Arg names must be words');
    }
    return expr.name;
  }

  let argNames = args.slice(0, args.length - 1).map(name);
  let body = args[args.length - 1];

  return function(...args) {
    // debugger;
    if (args.length > argNames.length) {
      throw new TypeError(`Wrong number of arguments. Called with ${args.length} arguments and declared ${argNames.length} parameters`);
    }

    let localEnv = Object.create(env);
    for (let i = 0; i < args.length; i++) {
      localEnv[argNames[i]] = args[i];
    }

    return body.evaluate(localEnv);
  };
};
```

### Ejecutables

El programa `egg`  deberá ejecutar el programa `.egg` que se le pasa por línea de comandos.
El intérprete `evm` ejecuta los ficheros json 


## Examples folder

Añada una carpeta `examples` en la que guardará los ejemplos con los que va comprobando la funcionalidad de su compilador:

```
[~/.../crguezl-egg(master)]$ tree examples/ -I '*evm'
examples/
├── array.egg
├── greater-x-5.egg
├── if.egg
├── ...
└── two.egg
```

Cada vez que introduzca una nueva funcionalidad cree uno o varios ejemplos que sirvan para ilustrarla y comprobar el buen funcionamiento.

Por ejemplo, cuando trabajemos en la tarea  `Fixing Scope` podemos añadir a nuestro 
directorio `examples` un par de ejemplos que ilustran como debería funcionar.

Uno que produzca una excepción:

```
[~/.../crguezl-egg(private2019)]$ cat examples/scope-err.egg
do(
  set(x,9),
  print(x) # ReferenceError: Tried setting an undefined variable: x
)
```

y al menos otro que muestre como unas variables ocultan a otras:

```
[~/.../crguezl-egg(private2019)]$ cat examples/scope.egg
do(
  def(x,9),
  /* def crea una nueva variable local */
  def(f, fun{
    do{
      def(x, 4),
      print(x) # 4
    }
  }),
  /* set no crea una nueva variable local */
  def(g, fun{set(x, 8)}),
  f(),
  print(x), # 9
  g(),
  print(x) # 8
)
```

Conforme programamos, vamos ejecutando nuestra solución contra estos programas. 
Cuando tengamos la solución correcta la salida debería ser algo así:

```
[~/.../crguezl-egg(private2019)]$ bin/egg.js examples/scope-err.egg
ReferenceError: Tried setting an undefined variable: x
```

```
[~/.../crguezl-egg(private2019)]$ bin/egg.js examples/scope.egg
4
9
8
```

Uno de nuestros objetivos es reciclar esos ejemplos en las pruebas y en la documentación.

## Test Folder

Añadimos una carpeta `test` y en ella los 
programas de prueba `test/test.js` (Mocha o Jest, use lo que prefiera. Los ejemplos que siguen están en Mocha). 

Creamos también un subdirectorio `test/examples` en el que copiamos nuestro ejemplo de prueba:
  
```
cp examples/scope.egg test/examples/
``` 

y junto a el escribimos un fichero con la salida esperada `test/examples/scope.egg.expected`.

Una estructura como esta:

```
test/
├── examples
│   ├── scope.egg
│   └── scope.egg.expected
└── test.js
```
  
Cada vez que logramos implementar una nueva funcionalidad o un nuevo objetivo añadimos en el directorio `examples` uno o varios  programas `examples/objetivo.egg` cuya ejecución muestra el buen funcionamiento de nuestro código. También lo añadimos a `test/examples/objetivo.egg` así como la salida esperada `test/examples/objetivo.egg.expected`. 

De esta forma la prueba se reduce a comprobar que la salida (stdout/stderr) de la ejecución del programa `test/examples/objetivo.egg` es igual a los contenidos de `test/examples/objetivo.egg.expected`.

**Procura evitar que la salida sea dependiente de la versión de node.js o del Sistema Operativo**.

Puede usar el módulo [@ull-esit-pl/example2test](https://www.npmjs.com/package/@ull-esit-pl/example2test) para simplificar esta metodología

```
[~/.../test(private2019)]$ cat scopes.js
```
```js
let fs = require('fs');
let should = require("should");
let e2t = require('@ull-esit-pl/example2test');
let eggvm = require('../lib/eggvm.js');

describe("Testing scopes", function() {
  let runTest = (programName, done) => {
    e2t({
      exampleInput: programName + '.egg',
      executable: 'node bin/egg.js',
      assertion: (result, expected) => result.replace(/\s+/g,'').should.eql(expected.replace(/\s+/g,'')),
      done: done,
    });
  };

  it("should  not allow the use of non declared variables", function() {
    let program = fs.readFileSync('examples/scope-err.egg', 'utf8');
    (() => { eggvm.run(program); }).should.throw(/setting.+undefined.+variable/i);
  });

  it("testing scope.egg", function(done) {
    runTest('scope', done);
  });
});
```

Como se puede apreciar, el objeto `eggvm` exportado por el módulo `lib/eggvm.js`
dispone de un método `run` que ejecuta la cadena que se le pasa como entrada.

No olvides ejecutar **todas** las pruebas `npm test` cada vez que resuelves un nuevo objetivo

```
[~/.../crguezl-egg(private2019)]$ npx mocha test/scopes.js
  Testing scopes
    ✓ should  not allow the use of non declared variables
    ✓ testing scope.egg (138ms)
  2 passing (151ms)
```

## Continuous Integration

Use GitHub Actions para añadir CI al proyecto

## GitHub Registry

Publique el compilador como módulo en GH Registry en el ámbito `@ull-esit-pl-2122`.

Puesto que este paquete contiene ejecutables es conveniente que lea la sección
[bin](https://docs.npmjs.com/files/package.json#bin) de la documentación de npm.js sobre package.json:

```
[~/.../crguezl-egg(master)]$ jq .bin package.json
```
```js
{
  "egg": "./bin/egg.js",
  "evm": "./bin/evm.js"
}
```

## Fundamentos

Esta es la primera de una serie de prácticas sobre el intérprete del lenguaje **Egg**.
Lea el capítulo 12 "*A Programming Language*" del libro EJS:

* [Eloquent JS. Chapter 12. Project: A Programming Language](http://eloquentjavascript.net/12_language.html)

Salte la sección **Parsing** de ese capítulo y pase directamente a la sección **The Evaluator**.

## Recursos

* Puede encontrar una solución a algunos de los problemas planteados en esta práctica en la rama `master` de este repo [ULL-ESIT-PL-1617/egg](https://github.com/ULL-ESIT-PL-1617/egg). 
* También puede encontrarlo como módulo en npm [@crguezl/eloquentjsegg](https://www.npmjs.com/package/@crguezl/eloquentjsegg) 
* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [El lenguaje egg: repo en GitHub](https://github.com/ULL-ESIT-PL-1617/egg). Contiene una solución a los  [problemas de separar el analizador léxico del sintáctico](#lexsep) así como al de [separar los códigos y los tres ejecutables](#separe). También tiene ejemplos de pruebas en Mocha y Chai
* [NodeJS Readline gist](https://gist.github.com/crguezl/430642e29a2b9293317320d0d1759387): un sencillo gist que te enseña a usar `readline` para hacer un bucle interactivo. Quizá conviene que lo leas cuando llegues a la sección del [problema del REPL](#repl)
* En el repo [ULL-ESIT-PL-1617/interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg) se muestra como hacer un bucle REPL
* [Vídeo *Programando un bucle REPL para el lenguaje Egg*](https://youtu.be/5gIlt6r29lw)
* [XRegExp](http://xregexp.com/)
* El módulo [@ull-esit-pl/example2test](https://www.npmjs.com/package/@ull-esit-pl/example2test)
* Tests. Mocking and Stubbing
    * [Sinon API](http://sinonjs.org/releases/v1.17.7/)
    * [Side effects of stubbing console in tests](https://gyandeeps.com/console-stubbing/)
    * [Unit Test like a Secret Agent with Sinon.js](http://elijahmanor.com/unit-test-like-a-secret-agent-with-sinon-js/) by Elijah Manor
* VSCode Extension Egg Tools: [Adds syntax highlighting and code snippets for the Egg language by EloquentJS](https://marketplace.visualstudio.com/items?itemName=jasonhaxstuff.egg-tools)


