---
title: Extending Egg
key: extended-egg
published: true
date: 2022/05/02
delivery: "2022/05/12"
order: 14
layout: Practica
prev: /practicas/egg-oop-parser.md
sidebar: auto
template: "https://github.com/LL-ESIT-PL-2122/extended-egg-template"
rubrica: 
  - El REPL funciona correctamente
  - Las clases de los ASTs disponen de los métodos adecuados
  - Las asignaciones han sido implementadas correctamente
  - El analizador léxico de Egg usa un analizador léxico generado por el generador de analizadores léxicos del alumno
  - Comprende la interpretación de las funciones Egg mediante funciones JS
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

## Interpreting Property Nodes

The first thing to do is to fill the class `Property` inside the file `src/ast.js` providing not only the constructor but the `evaluate` and `leftEvaluate` methods:

```js

class Property {
  constructor(tree) { ... }

  evaluate(env) {
    if (this.operator.type == "word" && this.operator.name in specialForms) { 
      // Is there any meaning for s.t. like while[<(x,4), ... ]?
    }

    let theObject = this.operator.evaluate(env);
    let propsProcessed = this.args.map((arg) => arg.evaluate(env));
    let propName = checkNegativeIndex(theObject, propsProcessed[0]);

    if (theObject[propName] || propName in theObject) {
      // theObject has a property with name "propName"
      // Write here the code to get the specified property
    } else if (typeof theObject === "function") {
      // theObject is a function, curry the function
    } else {
      throw new TypeError(`Evaluating properties for Object "${JSON.stringify(theObject)}" properties: "${JSON.stringify(propsProcessed)}"`);
    }
  }

  leftEvaluate(env) {
    // Interpret s.t. as a[2,3].b in the expression =(a[2,3].b, 4) 
  }
}
```

## Negative Indices in arrays

## Monkey Patching 

## Leftvalues and Extended Assignments

## Maps, Hashes or Dictionaries

## Currying

## Objects

## Require

## Eval and Parsing

## Regexps

## For Loops, For Each
 

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

To install Private Packages inside a GitHub Action review these sections:

* [GitHub Actions. The Secrets context](/temas/introduccion-a-javascript/github-actions.html#the-secrets-context)
* [Installing Private Packages in a GitHub Action](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#installing-private-packages-in-a-github-action)

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


## Recursos

* [GitHub Actions. The Secrets context](/temas/introduccion-a-javascript/github-actions.html#the-secrets-context)
* [Installing Private Packages in a GitHub Action](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#installing-private-packages-in-a-github-action)
* [latest-version-cli](https://github.com/sindresorhus/latest-version-cli) Get the latest version of an npm package
* [Egg Virtual Machine with OOP extensions for Windows/Linux/Mac OS](https://github.com/crguezl/oop-evm-releases/releases/tag/v1.0.0)
* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)


* Módulo en npm [@crguezl/eloquentjsegg](https://www.npmjs.com/package/@crguezl/eloquentjsegg) 

* [El lenguaje egg: repo en GitHub](https://github.com/ULL-ESIT-PL-1617/egg). Contiene un analizador sintáctico PDR y una solución a los  problemas de separar el analizador léxico del sintáctico PDR así como al de separar los códigos y los tres ejecutables. También tiene ejemplos de pruebas en Mocha y Chai
* [NodeJS Readline gist](https://gist.github.com/crguezl/430642e29a2b9293317320d0d1759387): un sencillo gist que te enseña a usar `readline` para hacer un bucle interactivo. Quizá conviene que lo leas cuando llegues a la sección del [problema del REPL](#repl)
* En el repo [ULL-ESIT-PL-1617/interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg) se muestra como hacer un bucle REPL
* [Vídeo *Programando un bucle REPL para el lenguaje Egg*](https://youtu.be/5gIlt6r29lw)

  <youtube id="5gIlt6r29lw"></youtube>
* [XRegExp](http://xregexp.com/): Un módulo que provee regexp extendidas 
* El módulo [@ull-esit-pl/example2test](https://www.npmjs.com/package/@ull-esit-pl/example2test) 
* Tests. Enlaces sobre Mocking and Stubbing
    * [Sinon API](http://sinonjs.org/releases/v1.17.7/)
    * [Side effects of stubbing console in tests](https://gyandeeps.com/console-stubbing/)
    * [Unit Test like a Secret Agent with Sinon.js](http://elijahmanor.com/unit-test-like-a-secret-agent-with-sinon-js/) by Elijah Manor
* VSCode Extension Egg Tools: [Adds syntax highlighting and code snippets for the Egg language by EloquentJS](https://marketplace.visualstudio.com/items?itemName=jasonhaxstuff.egg-tools)


