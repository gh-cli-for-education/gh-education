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

## Introducción

Esta es la primera de una serie de prácticas sobre el intérprete del lenguaje **Egg**.
Deberá comenzar leyendo el capítulo 12 "*A Programming Language*" del libro EJS:

* [Eloquent JS. Chapter 12. Project: A Programming Language](http://eloquentjavascript.net/12_language.html)

Puede saltarse la sección **Parsing** del capítulo y pasar directamente a la sección **The Evaluator**.

## Modificaciones en el módulo de Análisis Sintáctico

A estas alturas el módulo que escribió en la práctica [egg-parser]() debería de usar para el análisis léxico
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

En esta práctica deberá hacer  que el ejecutable `egg` funcione como un bucle REPL cuando no se le proporciona un fichero de entrada. 


```js
[~/ull-pl1718-campus-virtual/tema3-analisis-sintactico/src/egg/crguezl-egg(private)]$ bin/egg.js
> def(x, array(1,2,array(3,4))) # x = [1,2,[3,4]]
[ 1, 2, [ 3, 4 ] ]
> <-(x,2) # 3d element
[ 3, 4 ]
> <-(x,0) # 1st element
1
> +(2, # No completamos la expresión: espera
> ..*(3, # Sigue incompleta
> ....4)
> ..) # cerramos: evalúa
14
> # Pulsamos CTRL-D
> goodbye!
```

En este [Vídeo *Programando un bucle REPL para el lenguaje Egg*](https://youtu.be/5gIlt6r29lw) explicamos como hacerlo

<youtube id="5gIlt6r29lw"></youtube>

The function `parBalance(line)` that we introduce in the `parse.js` main file checks for parenthesis balance in `line`. The parameter `line` contains a (potentially incomplete)
egg expression:


```js
'use strict';
const { SPACE } = require("./tokens.js");
const fs = require('fs');
const nearley = require("nearley");
const grammar = require("./grammar.js");
const lex = require('./lex-pl.js');

function parBalance(line) {
  let stack = 0;
  lex.reset(line);
  let tokens = lex.tokens;
  // Increment stack each time you see an LP token, decrement it if you see a RP 
  /* ... fill the code ... */
  return stack;
}
```

Fell free to add and export in file `parse.js`  any convenience parser-related functions you feel you neeed in the `egg-interpreter` module.

## Una Clase para cada tipo de nodo del AST

En el fichero `src/ast.js`  encontrará las clases `Value`, `Word` y  `Apply` para los distintos tipos de nodos del AST. todos los tipos de nodo  disponen de un método `evaluate(env)` que evalúa/interpreta el nodo en el contexto de la memoria asociativa local que se pasa en el parámetro `env`. 

El fichero `ast.js` exporta las tres clases:

```js
module.exports = { Value, Word, Apply };
```

### La Clase Value 

Por ejemplo el código para los nodos `Value` puede ser algo así:

```js
class Value {
  constructor(token) {
    this.type = token.type;
    this.value = token.value;
  }
  evaluate() {
    return this.value;
  }
  getIndex() {
    return this.value;
  }
}
``` 

Evaluar/interpretar un node `Value` es simplemente retornar su atributo `value`.

### La Clase Word 

Este es un extracto de la clase `Word`:

```js
class Word {
  constructor(token) {
    this.type = token.type || 'word';
    this.name = token.name;
  }
  
  evaluate(env) {
    if (this.name in env) {
      return env[this.name];
    } else {
      throw new ReferenceError(`Undefined variable: ${this.name}`);
    }
  }

  getIndex() {
    return this.name;
  }

  leftEvaluate(env) {
    /* ... */
  }
}
```
Evaluar un nodo `Word` es también sencillo. 

El operador `in` devuelve `true` si la propiedad especificada `this.name` está en el objeto `env`  especificado o su **prototipo**. Si hay una entrada `this.name` en la memoria actual, devolvemos el valor almacenado: `env[this.name]`

* Los objetos `env` son objetos JS que son tratados como hashes y  funcionan como memoria asociativa en nuestro intérprete. 
* El objeto `env` representa el  ámbito actual
* En cada instante de la ejecución los objetos `env` se estructuran en una lista enlazada
* Cada ámbito/memoria `env` está anidado  en un ámbito `parentEnv` que es su prototipo
*  Podemos acceder al prototipo de un objeto mediante `parentEnv = Object.getPrototypeOf(env)` (Véase [getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf))


También podemos acceder al prototipo de un objeto mediante la propiedad `__proto__` del mismo:

  ```js
   > (4).__proto__
  ```
  
En JS los objetos heredan las propiedades de su prototipo y los prototipos se estructuran en una jerarquía que eventualmente acaba en la clase Object:

![](/images/prototype-chain.jpeg)

### La Clase Apply

```js
const { specialForms } = require("./registry.js");

/* ... */

class Apply {
  constructor(tree) {
    this.type = tree.type;
    this.operator = tree.operator;
    this.args = tree.args;
  }

  evaluate(env) {
    if (this.operator.type == 'word' && this.operator.name in specialForms) {
      return specialForms[this.operator.name](this.args, env);
    }

    try { 
      let op = this.operator.evaluate(env);
      let argsProcessed = this.args.map((arg) => arg.evaluate(env));

      if ((typeof op === "function")) {
        return op(...argsProcessed);
      }

    }
    catch (err) {
      throw new TypeError('Applying not a function or method ' + err);
    }
  }
```

The interpretation of `Apply` nodes is more involved. 
We divided into two types of itnerpretation.

#### Specials nodes 

If they are a special form, like is the case if `this.operator.name` is for example `if`, `while`, `fun`, etc.
we pass the AST forest inside `this.args`, along with the current scope `env`, to a **spec**ific interpreter function **specialForms[this.operator.name]** that handles the current 
operation `this.operator.name`

```js
    if (this.operator.type == 'word' && this.operator.name in specialForms) {
      return specialForms[this.operator.name](this.args, env);
    }
```

Notice that in such case is the handler function `specialForms[while]` the one that is in charge to evaluate and interpret the current AST includen its children. For instance, the interpretation of an `apply` node with operator type `while` will be: 

```js
specialForms['while'] = function(args, env) {
  if (args.length != 2) {
    throw new SyntaxError('Bad number of args to while');
  }

  while(args[0].evaluate(env) !== false) {
    args[1].evaluate(env);
  }
  return false;
};
```

that will correctly interpret an Egg program like:

```js
➜  egg-interpreter-solution git:(master) ✗ cat examples/while.egg 
do(
    def(i,1),
    while(<(i,4),
      do(
          print(*(i,i)),
          def(i, +(i,1))
      )
    )
)                                                                                                                     
➜  egg-interpreter-solution git:(master) ✗ bin/egg.js examples/while.egg 
1
4
9
```

#### "Normal" Calls 

If it is a normal call, we evaluate the operator, 

```js
let op = this.operator.evaluate(env);
``` 

Let me repeat again the **question**: 

**Is it true that `this.operator` is always a node of type `word`?**

Then we evaluate the AST forest  in `this.args`:

```js
let argsProcessed = this.args.map((arg) => arg.evaluate(env));
```

last, we check that `op` contains a JavaScript function and if so we call it with the already processed arguments 

```js
if ((typeof op === "function")) {
  return op(...argsProcessed);
}
```

We will use plain JavaScript function values to represent Egg’s function values.
We will come back to this later, when we study the special interpreter/evaluator called `fun`.

### Interpreting +(2,3)

We will use JavaScript function values to inject primitives in our interpreter to add functionality. for instance JS functions with names `print`, `+`, `*`, etc. are injected in the top level `topEnv` scope  

```js
topEnv['+'] = (a, b) => a + b;
```

For example a program like `+(2,3)` will be translated by your parser onto an AST like 

```js
apply(operator: word(name: '+'), args: [ value(value: 2), value(value:3)])
``` 

that when the `apply` is interpreted `this.operator.type` is `'word'` but `this.operator.name` is `+` which
isn't  in `specialForms`. 

Since `this.args` contains the array ` value(value: 2), value(value:3)]` the map will leave in  `argsProcessed` the array `[2, 3]` and the final result is the 
call `topEnv['+'](...[2,3])`



## Fixing Scope

Resuelva ahora el ejercicio propuesto en el capítulo:

[Fixing Scope](https://eloquentjavascript.net/12_language.html#i_Y9ZDMshYCQ)

Es un ejercicio difícil. 

Puede encontrar una solución al problema en la rama `inicial` de este repo [ULL-ESIT-PL-1617/egg/](https://github.com/ULL-ESIT-PL-1617/egg/tree/inicial). La rama `inicial` como su nombre indica contiene además del código  descrito en el capítulo de EloquentJS las soluciones a los ejercicios propuestos en el capítulo del libro.

Si no se le ocurre una solución acuda a este enlace. 
Y si se le ocurrió  también. Contraste las soluciones y quédese con la que le parezca mejor.

## Separe en Módulos el Programa

Separe el código en dos módulos Node.js:

```
lib
├── eggvm.js
└── parse.js
```

- `parse.js` debe contener las funciones del análisis léxico y sintáctico y exportarlas

  ```
  [~/.../crguezl-egg(master)]$ tail -n 9 lib/parse.js
  ```
  ```js
  module.exports = {
    ...
    parse,
    parseApply,
    parseExpression,
    parseFromFile,
  };
  ```

- `eggvm.js`debe contener todo el código relativo al entorno de ejecución. Este módulo debería exportar funciones para la ejecución del árbol generado en la primera fase como `run`, `runFromFile`, `runFromEVM`:

  ```
  [~/.../crguezl-egg(master)]$ tail -n 1 lib/eggvm.js
  ```
  ```js
  module.exports = {
    run, 
    runFromFile, 
    runFromEVM, 
    topEnv, 
    specialForms, 
    parser, 
    evaluate
  };
  ```
  
Añada también tres ejecutables que usan los módulos anteriores:

```
[~/.../crguezl-egg(master)]$ tree bin
bin
├── egg.js
├── eggc.js
└── evm.js
```

### egg

El programa `egg`  deberá ejecutar el programa `.egg` que se le pasa por línea de comandos:

```lisp
$ cat examples/one.egg
do(
  define(x, 4),
  define(setx, fun(val, 
      set(x, val)
    )
  ),
  setx(50),
  print(x)
)
$ bin/egg.js examples/one.egg
50
```

### eggc
 
Compiles the input program to produce a JSON containing the tree: `eggc examples/two.egg` produces the JSON file `examples/two.egg.evm`

Por ejemplo, si le damos como entrada este programa:

```
[~/.../crguezl-egg(master)]$ cat examples/two.egg
```
```lisp
do(
  define(sum,  # function
    fun(nums, other,
      do(
         print(other),
         define(i, 0),
         define(sum, 0),
         while(<(i, length(nums)),
           do(define(sum, +(sum, element(nums, i))),
              define(i, +(i, 1))
           )
         ),
         sum
      )
   )
 ),
 print(sum(array(1, 2, 3), 4))
)
```

Si ejecutamos `bin/eggc.js  examples/two.egg` produce como salida un fichero con el mismo nombre y extensión `.evm` (por Egg Virtual Machine) que no es otra cosa que el AST generado por el parser guardado como un objeto JSON.

```
[~/.../crguezl-egg(master)]$ bin/eggc.js examples/two.egg
[~/.../crguezl-egg(master)]$ ls -ltr examples/two.egg.evm
-rw-r--r--  1 casiano  staff  7466  2 abr 11:03 examples/two.egg.evm
```

Puede ver los contenidos del JSON generado en la ejecución de ejemplo en este enlace:

* [examples/two.egg.evm]({{site.baseurl}}/assets/practicas/egg-0/two.egg.evm)

### evm 

El intérprete `evm` ejecuta los ficheros en formato *Egg Virtual Machine*. 

```
[~/.../crguezl-egg(master)]$ bin/evm.js examples/two.egg.evm
4
6
```

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

Publique el compilador como módulo en GH Registry en el ámbito `@ULL-ESIT-PL-2021`.

Puesto que este paquete contiene ejecutables es conveniente que lea la sección
[bin](https://docs.npmjs.com/files/package.json#bin) de la documentación de npm.js sobre package.json:

```
[~/.../crguezl-egg(master)]$ jq .bin package.json
```
```js
{
  "egg": "./bin/egg.js",
  "eggc": "./bin/eggc.js",
  "evm": "./bin/evm.js"
}
```

## Solución Parcial 

Si logra resolver estos objetivos ¡Enhorabuena!.

Puede encontrar una solución a algunos de los problemas planteados en esta práctica en la rama `master` de este repo [ULL-ESIT-PL-1617/egg](https://github.com/ULL-ESIT-PL-1617/egg). 

Asegúrese que entiende como funciona.

También puede encontrarlo como módulo en npm [@crguezl/eloquentjsegg](https://www.npmjs.com/package/@crguezl/eloquentjsegg) 



## Recursos

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


