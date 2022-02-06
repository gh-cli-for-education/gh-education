---
title: "Espree Logging"
published: false
date: 2022/02/19
order: 7
rubrica:
  - "Opciones en línea de comandos (`-o`, `-V`, `-h`, etc.)"
  - "Añade mensajes de logs a la entrada de las `function()`"
  - "Añade mensajes de logs a la entrada de las arrow `() => { ... }`"
  - "Tutorial README.md y paneles bien presentados"
  - "El `package.json` [tiene scripts](./esprima-logging#entrega) para ejecutar el programa"
---

## Descripción de la Tarea

En el repo [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk) encontrará el programa `logging-espree.js`  el cual implementa una función `addLogging` que:

* cuando se llama analiza el código JS que se la da como entrada 
* produciendo como salida un código JS equivalente que inserta  mensajes de `console.log` a la entrada de cada función.

Por ejemplo, cuando se llama con esta entrada:

```js
addLogging(`
function foo(a, b) {   
  var x = 'blah';   
  var y = (function () {
    return 3;
  })();
}     
foo(1, 'wut', 3);
`);
```

produce una salida como esta:

```
[~/javascript-learning/esprima-pegjs-jsconfeu-talk(private)]$ node logging-espree.js 

```

```js
function foo(a, b) {
    console.log('Entering foo()');
    var x = 'blah';
    var y = function () {
        console.log('Entering <anonymous function>()');
        return 3;
    }();
}
foo(1, 'wut', 3);
```

Este es el código de `logging-espree.js`: 

```
[~/javascript-learning/esprima-pegjs-jsconfeu-talk(private)]$ cat logging-espree.js 

```

```js
const escodegen = require('escodegen');
const espree = require('espree');
const estraverse = require('estraverse');

function addLogging(code) {
    const ast = espree.parse(code);
    estraverse.traverse(ast, {
        enter: function(node, parent) {
            if (node.type === 'FunctionDeclaration' ||
                node.type === 'FunctionExpression') {
                addBeforeCode(node);
            }
        }
    });
    return escodegen.generate(ast);
}

function addBeforeCode(node) {
    const name = node.id ? node.id.name : '<anonymous function>';
    const beforeCode = "console.log('Entering " + name + "()');";
    const beforeNodes = espree.parse(beforeCode).body;
    node.body.body = beforeNodes.concat(node.body.body);
}

console.log(addLogging(`
function foo(a, b) {   
  var x = 'blah';   
  var y = (function () {
    return 3;
  })();
}
foo(1, 'wut', 3);
`));
```

Le ayudarán a entender el código estos recursos:

* [Patrick Dubroy: Parsing, Compiling, and Static Metaprogramming -- JSConf EU 2013](https://youtu.be/UqTlToUYK1E)
* [Trasparencias explicando este código](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/jsconfeu-logging.pdf)
* [AST de la función de entrada usada como ejemplo](https://astexplorer.net/#/gist/ee28a7c80b48178607f998b8242746bc/72adda89322262c0089b79c77023912d87754dbf) en [https://astexplorer.net/](https://astexplorer.net/)

En esta práctica, se pide:

1. Acepte la asignación Classroom de esta tarea
3. En la tarea del Campus basta con entregar el enlace al repositorio
4. Ejecute paso a paso el código de `logging.js` usando el debugger de chrome, intentando comprender el funcionamiento de la transformación realizada. Haga un resumen de lo que ha aprendido en el fichero Markdown: `README.md` 
5. Modifique el programa para que los `console.log` insertados informen de los valores de los parámetros pasados a la función.
   
Vea el siguiente ejemplo de como debe funcionar una solución:

```
$ ./p0-t0-esprima-logging-sol.js 
Usage: p0-t0-esprima-logging-sol [options] <filename> [...]
 
Options:
  -V, --version            output the version number
  -o, --output <filename>  
  -h, --help               output usage information
[~/javascript-learning/esprima-pegjs-jsconfeu-talk(private)]$ cat input.js 
```

El programa usado hace un parsing de la línea de comandos mediante el módulo npm [commander.js](https://www.npmjs.com/package/commander). Puede encontrar ejemplos en el directorio
[examples](https://github.com/tj/commander.js/tree/master/examples) del repo del modulo
[commander.js](https://www.npmjs.com/package/commander).

Cuando lo ejecutamos con la opción `-V` nos da la versión:

```
$ ./p0-t0-esprima-logging-sol.js -V
0.1.0
```

Con la  opción `-o input-log.js` especificamos el fichero de salida. El programa 
muestra los contenidos del fichero de entrada:

```
$ ./p0-t0-esprima-logging-sol.js -o input-log.js input.js 
input:
```
```js
function foo(a, b) {
  var x = 'blah';
  var y = (function (z) {
    return z+3;
  })(2);
}
foo(1, 'wut', 3);
```

Al volcar la salida, vemos que el fichero de entrada ha sido transformado correctamente:

```
---
Output in file 'input-log.js'
$ cat input-log.js
```
```js
function foo(a, b) {
    console.log(`Entering foo(${ a },${ b })`);
    var x = 'blah';
    var y = function (z) {
        console.log(`Entering <anonymous function>(${ z })`);
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);
---
```

Si ejecutamos la salida obtenemos la traza esperada:

```
$ node input-log.js 
Entering foo(1,wut)
Entering <anonymous function>(2)
```

## Q & A

### Question: Backticks in espree

> Trabajando y experimentando con el método `parse()` del compilador `espree`, he comprobado que es incapaz de procesar cadenas de caracteres que posean en su interior el signo  \`,  que es usado en JS para crear cadenas de caracteres que pueden aprovecharse de la interpolación de expresiones. 

> En concreto, y a modo de ejemplo, el error me ha surgido al intentar ejecutar 
`parse()` pasando como argumento:  

```js
"console.log(`prueba`)"
```

> Me preguntaba si el analizador léxico carece verdaderamente de la capacidad para interpretar dicho símbolo y, en caso afirmativo, cómo aprovechar la mecánica de interpolación de expresiones al utilizar el analizador.
En concreto, el error que se obtiene es:  

```
SyntaxError: Unexpected character '`'.
```

### Answer: Use option `{ecmaVersion:6}`

```js

[~/javascript-learning/esprima-pegjs-jsconfeu-talk(private)]$  node
Welcome to Node.js v12.10.0.
Type ".help" for more information.
> code3 = "console.log(`prueba`)"
'console.log(`prueba`)'
> const { parse } = require('espree')
undefined
> parse(code3, {ecmaVersion:6})
Node {
  type: 'Program',
  start: 0,
  end: 21,
  body: [
    Node {
      type: 'ExpressionStatement',
      start: 0,
      end: 21,
      expression: [Node]
    }
  ],
  sourceType: 'script'
}
```

## Reto 1: Funciones Flecha Gorda

Añada la capacidad de procesar funciones con sintáxis ECMA6 *flecha gorda* con bloque 
como en este ejemplo:

```js
let z = (e => { 
  return e +1 
})(4);
```

Ejemplo de ejecución:

```js
[~/.../eval/p0-t0-esprima-logging(master)]$ ./logging-espree.js input.js -o output.js 
input:
function foo(a, b, c) {
  let x = 'tutu';
  let y = (function (x) { return x*x })(2);
  let z = (e => { return e +1 })(4);
  console.log(x,y,z);
}
foo(1, 'wut', 3);
---
```

```
[~/.../eval/p0-t0-esprima-logging(master)]$ cat output.js 
```
```js
function foo(a, b, c) {
    console.log(`Entering foo(${ a }, ${ b }, ${ c }) at line 1`);
    let x = 'tutu';
    let y = function (x) {
        console.log(`Entering <anonymous function>(${ x }) at line 3`);
        return x * x;
    }(2);
    let z = (e => {
        console.log(`Entering <anonymous function>(${ e }) at line 4`);
        return e + 1;
    })(4);
    console.log(x, y, z);
}
```

Ejecución de la salida:

```
foo(1, 'wut', 3);[~/.../eval/p0-t0-esprima-logging-CristoNavarro(master)]$ node output.js 
Entering foo(1, wut, 3) at line 1
Entering <anonymous function>(2) at line 3
Entering <anonymous function>(4) at line 4
tutu 4 5
```

Vea aquí [El AST Espree del ejemplo](https://astexplorer.net/#/gist/30fd4865621d99718672b1cd53d6c3c9/latest) usado como entrada en la ejecución anterior. Use el parser de `espree` pasándole la opción `ecmaVersion`:

```js
const ast = espree.parse(code, {ecmaVersion:6});
```

## Reto 2: Número de Línea

Añada el número de línea a la información de log de la función en la que se entra:

```
[~/javascript-learning/esprima-pegjs-jsconfeu-talk(develop)]$ ./p0-t0-esprima-logging-sol.js input.js -o salida.js
input:
```
```js
function foo(a, b) {
  var x = 'blah';
  var y = (function (z) {
    return z+3;
  })(2);
}
foo(1, 'wut', 3);
```
```
---
Output in file 'salida.js'
[esprima-pegjs-jsconfeu-talk(develop)]$ cat salida.js
```
```js
function foo(a, b) {
    console.log(`Entering foo(${ a },${ b }) at line 1`);
    var x = 'blah';
    var y = function (z) {
        console.log(`Entering <anonymous function>(${ z }) at line 3`);
        return z + 3;
    }(2);
}
foo(1, 'wut', 3);
```

```
[esprima-pegjs-jsconfeu-talk(develop)]$ node salida.js 
Entering foo(1,wut) at line 1
Entering <anonymous function>(2) at line 3
```

## Recursos

### Material para la Práctica

* En el [Repo ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk) encontrará material para esta práctica
* [AST de la función de entrada usada como ejemplo](https://astexplorer.net/#/gist/ee28a7c80b48178607f998b8242746bc/72adda89322262c0089b79c77023912d87754dbf)
* [Trasparencias explicando este código](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk/blob/master/jsconfeu-logging.pdf)

### Debugging

* [Debugging Client Code with Chrome](https://javascript.info/debugging-chrome)
* [Debugging NodeJS with Chrome and Visual Studio Code](/assets/temas/introduccion-a-javascript/debugging)

### Commander

* El módulo npm [commander.js](https://www.npmjs.com/package/commander)
  - [Examples](https://github.com/tj/commander.js/tree/master/examples) en el repo del modulo
[commander.js](https://www.npmjs.com/package/commander)


### Soluciones (No disponibles)

* [Una Solución](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk-private/blob/private/p0-t0-esprima-logging-sol.js) 
* [Solucion con los retos](https://github.com/ULL-ESIT-PL-1920/p0-t0-esprima-logging-reto-DanielGlezExp)

## Entrega

En el `package.json` introduzca 

* Entradas adicionales `scripts/test-1`, `scripts/test-2` etc, con los comandos para la ejecución de su solución contra diferentes programas de prueba. Algo así:

  ```js
  "scripts": {
        "test-1": "node src/my-sol-logging-espree.js test/prueba-1.js",
        ...
  }
  ```
* Una entrada `scripts/test` que ejecute su solución contra todos los programas de prueba

## References

* [Tipos de Nodos del AST](/assets/temas/tema0-introduccion-a-pl/espree-visitorkeys)
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* [Escodegen repo en GitHub](https://github.com/estools/escodegen)
  - [Escodegen API Doc](https://github.com/estools/escodegen/wiki/API)