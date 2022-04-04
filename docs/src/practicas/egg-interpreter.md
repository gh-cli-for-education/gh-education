---
title: The Egg Interpreter
published: true
date: 2022/04/01
delivery: "2022/04/21"
order: 12
layout: Practica
prev: lexer-generator.md
sidebar: auto
template: "https://github.com/crguezl/egg-interpreter-template"
rubrica: 
  - El REPL funciona correctamente
  - Las clases de los ASTs disponen de los métodos adecuados
  - Expresión de asignación 
  - Comprende la interpretación de las funciones Egg ediante funciones JS
  - Comprende el manejo de ámbitos
  - Contiene suficientes tests
  - Se provee un workflow sencillo para convertir rápidamente un ejemplo operativo en un test 
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Módulo bien documentado 
  - Informe hecho con Vuepress desplegado
  - Se ha publicado como módulo y se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {{$frontmatter.title }}

## Modificaciones en el módulo de Análisis Sintáctico

Para facilitar la labor de hacer esta práctica es conveniente que volvamos al módulo [egg-parser](/practicas/egg-parser.html) y modifiquemos un poco su API para la fabricación del intérprete que vamos a construir.

A estas alturas del curso, el módulo que escribimos en la práctica [egg-parser](/practicas/egg-parser.html) debería hacer uso del generador de analizadores léxicos realizado en la práctica [lexer generator](/practicas/lexer-generator.html). 

El analizador léxico de nuestro parser debería ser algo así:

```js
const { tokens } = require('./tokens.js');
const { nearleyLexer } = require("@ull-esit-pl-2122/lexer-generator-solution");
let lexer = nearleyLexer(tokens);
module.exports = lexer;
```

Además del ejecutable `eggc` que ya proveía el paquete [egg-parser](/practicas/egg-parser.html), ahora le añadiremos un fichero `src/parse.js` que constituirá el punto de entrada o `main` del módulo. Sigue un extracto de como podría ser el `package.json`:

```js{5}
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

El fichero `parse.js` exportará un conjunto de funciones y objetos que facilitarán las labores de parsing desde el módulo de esta práctica. Entre ellas estas:

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

## Egg Repeat Evaluate Print Loop 

* Véase la sección [Construcción de un Repeat Evaluate Print Loop](/temas/interpretation/repl-interpretation.md)


## AST Classes and AST Interpretation

Véase la sección sobre la [Estructura de Clases para los ASTs y la Interpretación de los Nodos del AST](/temas/interpretation/ast-interpretation)

* Have a look at this section if you want to know more about Smells, the Open-Closed Principle and the [The Strategy Pattern](/temas/introduccion-a-javascript/design.html)

## Providing an Assignment 

See [Interpretation of Assignment Expressions](/temas/interpretation/assignment-interpretation)

## Function Interpretation

See section [Function Interpretation](/temas/interpretation/function-interpretation)

## Ejecutables

El programa `egg`  deberá ejecutar el programa `.egg` que se le pasa por línea de comandos.
El intérprete `evm` ejecuta los ficheros json generados por `eggc`


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

Esta es la segunda de una serie de prácticas sobre el lenguaje **Egg**.
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


