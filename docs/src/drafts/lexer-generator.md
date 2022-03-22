---
title: Lexer Generator
permalink: /practicas/lexer-generator
published: true
date: 2022/03/22
delivery: "2022/03/31"
order: 11
layout: Practica
prev: egg-parser.md
sidebar: true
template: "https://github.com/crguezl/egg-parser-template"
rubrica:
  - El paquete está publicado en GitHub Registry
  - "Opcional: La función exportada se llama con un array de pares `[[NAME, /(?<NAME>, ...)/] ... ]` en la que el nombre del token aparece repetido dos veces. Modifique la interfaz para que reciba sólo un array de expresiones regulares con nombre `[/(?<NAME> ...)/, ... ]`"
  - El módulo exporta las funciones adecuadas
  - Contiene suficientes tests 
  - "Opcional: estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Los informes están bien presentados
  - "La documentación es completa" 
  - "Opcional: publicar la documentación de la API usando GitHub Pages en la carpeta `docs/`"
  - Las *pruebas de producción* funcionan bien
  - El superproyecto está correctamente estructurado usando submódulos
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
  - "Opcional: se proporciona información de localización (offset, etc.)"
  - Manejo de errores y blancos
  - Calidad del código
video:
  clase20200401: gO49wnWoE_s 
  clase20200325: 4jmsZbEpW7g
  clase20200324: xCNs1fT1KOc
---

## Objetivos

Usando el repo de la asignación de esta tarea construya un paquete npm y 
publíquelo como paquete privado en GitHub Registry con ámbito `@ULL-ESIT-PL-2122`  y con nombre el nombre de su repo `lexgen-code-aluAtGitHub`

Una parte de los conceptos y habilidades a ejercitar con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). 

El módulo deberá exportar una función que construye analizadores léxicos:

```js
const buildLexer =require('@ULL-ESIT-PL-2122/lexgen-code-aluAtGitHub');
```

La función importada `buildLexer` se llamará con un array de expresiones regulares.
Cada una de las expresiones regulares deberá ser un paréntesis con nombre.
El nombre del paréntesis es el nombre del token/terminal.

```js 
  const SPACE = /(?<SPACE>\s+|\/\/.*)/;
  const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
  const ID = /(?<ID>\b([a-z_]\w*)\b)/;
  const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
  const OP = /(?<OP>[+*\/=-])/;

  const myTokens = [ {match: SPACE, ignore: true}, RESERVEDWORD, ID, STRING, OP ];
```

Este array describe el léxico del lenguaje. La llamada `buildLexer(myTokens)` retornará una función `lexer` que es el analizador léxico

```js
const lexer = buildLexer(myTokens);
```

Se establecen las siguientes consideraciones semánticas:

* Si un token es un objeto y tiene la propedad  `ignore: true` sus matching serán ignorados y no se añadirán a la lista de tokens 
* El token `ERROR` es especial y es automáticamente retornado por el analizador léxico generado `lexer` en el caso de que la  entrada contenga un error
* Si en la lista aparece un token de la forma `EOF: SomeValue` el token `EOF` será retornado cuando se alcance el final de la entrada con valor asociado `SomeValue`. En otro caso se retornará `null` para indicar el final de la entrada

Este es un ejemplo mas concreto de como usar la librería:

```js
const buildLexer = require('@ull-esit-pl-1920/p10-t2-lexgen-code-aluXXX');

const SPACE = /(?<SPACE>\s+|\/\/.*)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>\b([a-z_]\w*))\b/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP]
];

const lexer = buildLexer(myTokens);
```

cuando `lexer` es llamada con una cadena de entrada retorna la secuencia de tokens de esa cadena conforme a la descripción léxica proveída:

```js
str = 'const varName = "value"';
r = lexer(str);
let expected = [
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'varName' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"value"' }
];

test(str, () => {
  expect(r).toEqual(expected);
});
```

Cuando se encuentra una entrada errónea `lexer ` produce un token con nombre `ERROR`:

```js
str = ' // Entrada con errores\nlet x = 42*c';
r = lexer(str);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ERROR', value: '42*c' }
];
```

Esta entrada es errónea por cuanto no hemos definido el token para los números.
El token `ERROR` es especial en cuanto con que casa con cualquier entrada errónea.

Véase también el último ejemplo con errores en la [sección Pruebas](#pruebas)

## Prerequisitos

Tóme esta práctica con calma por cuanto me parece es  complicada en el estado de conocimientos de RegExps en el que estamos. 
Nos ha faltado una clase para establecer las bases necesarias.

En este vídeo se introducen los conceptos de expresiones regulares que son necesarios
para la realización de esta práctica. Especialmente 

* `lastindex` en el minuto 19:30 
* El uso de la sticky flag `/y` a partir del minuto 30
* Construcción de analizador léxico minuto 33:45

<youtube id="xCNs1fT1KOc"></youtube>

En  los primeros 25 minutos de este vídeo se explica como realizar la práctica:

* Analizadores Léxicos: 03:00
<youtube id="4jmsZbEpW7g"></youtube>

Estúdielos antes de seguir adelante

<!--
## Descripción del Lenguaje Léxico: parámetros de entrada de la función 

El léxico del lenguaje se describe mediante un array de pares `[String, /regExp/]`:

```js
[[nombreDelToken1, /regExpDelToken1/] ... [nombreDelTokenN, /regExpDelTokenN/]
```

Sigue un ejemplo de descripción de un analizador léxico 
para un pequeño lenguaje:

```js
const SPACE = /(?<SPACE>\s+)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>\b([a-z_]\w*))\b/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP]
];

```
-->

## Sugerencias

Puede partir de este código en el que se combina el uso de sticky y los grupos con nombre


```js
const str = 'const varName = "value"';
console.log(str);

const SPACE = /(?<SPACE>\s+)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>([a-z_]\w+))/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const tokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID], 
  ['STRING', STRING], ['OP', OP] 
];

const tokenNames = tokens.map(t => t[0]);
const tokenRegs  = tokens.map(t => t[1]);

const buildOrRegexp = (regexps) => {
  const sources = regexps.map(r => r.source);
  const union = sources.join('|');
  // console.log(union);
  return new RegExp(union, 'y');
};

const regexp = buildOrRegexp(tokenRegs);

const getToken = (m) => tokenNames.find(tn => typeof m[tn] !== 'undefined');

let match;
while (match = regexp.exec(str)) {
  //console.log(match.groups);
  let t = getToken(match.groups);
  console.log(`Found token '${t}' with value '${match.groups[t]}'`);
}
```

escribiendo una función `makeLexer` que recibe como argumentos un array `tokens`
como en el ejemplo y retorna una función que hace el análisis léxico 
correspondiente a esos tokens.

## Pruebas

Deberá añadir pruebas usando [Jest](/temas/introduccion-a-javascript/jest}). Amplíe este ejemplo:

```
[~/.../github-actions-learning/lexer-generator(master)]$ pwd -P
/Users/casiano/local/src/github-actions-learning/lexer-generator
[~/.../github-actions-learning/lexer-generator(master)]$ cat test.js
```
```js
// If you want debugging output run it this way:
// DEBUG=1 npm test
const debug = process.env["DEBUG"];
const { inspect } = require('util');
const ins = (x) => { if (debug) console.log(inspect(x, {depth: null})) };

const buildLexer =require('./index');

const SPACE = /(?<SPACE>\s+|\/\/.*)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>\b([a-z_]\w*))\b/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/=-])/;

const myTokens = [
  ['SPACE', SPACE], ['RESERVEDWORD', RESERVEDWORD], ['ID', ID],
  ['STRING', STRING], ['OP', OP]
];

let str, lexer, r;
lexer = buildLexer(myTokens);

str = 'const varName = "value"';
ins(str);
r = lexer(str);
ins(r);
let expected = [
  { type: 'RESERVEDWORD', value: 'const' },
  { type: 'ID', value: 'varName' },
  { type: 'OP', value: '=' },
  { type: 'STRING', value: '"value"' }
];

test(str, () => {
  expect(r).toEqual(expected);
});

str = 'let x = a + \nb';
ins(str);
r = lexer(str);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ID', value: 'a' },
  { type: 'OP', value: '+' },
  { type: 'ID', value: 'b' }
];
ins(r);
test(str, () => {
  expect(r).toEqual(expected);
});

str = ' // Entrada con errores\nlet x = 42*c';
ins(str);
r = lexer(str);
ins(r);
expected = [
  { type: 'RESERVEDWORD', value: 'let' },
  { type: 'ID', value: 'x' },
  { type: 'OP', value: '=' },
  { type: 'ERROR', value: '42*c' }
];

test(str, () => {
  expect(r).toEqual(expected);
});
```

Ejemplo de ejecución:

```
[~/.../github-actions-learning/lexer-generator(master)]$ npm test

> @ULL-ESIT-PL-2122/lexer-generator@1.0.0 test /Users/casiano/local/src/github-actions-learning/lexer-generator
> jest        👈 use jest!

 PASS  ./test.js
  ✓ const varName = "value" (4ms)
  ✓ let x = a +
b
  ✓  // Entrada con errores
let x = 42*c (1ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.126s
Ran all test suites.
```

## Integración Contínua usando GitHub Actions

Use [GitHub Actions](/temas/introduccion-a-javascript/github-actions) para la ejecución de las pruebas

## Documentación

[Documente](/assets/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md` y la documentación de la función exportada.

## Publicar como paquete npm en GitHub Registry

Usando el repo de la asignación de esta tarea publique el paquete como paquete privado en GitHub Registry con ámbito `@ULL-ESIT-PL-2122`  y nombre el nombre de su repo `lexgen-code-aluAtGitHub`

## Pruebas de Producción

En un nuevo repo `lexgen-testing-aluGitHub` añada las pruebas
para comprobar que el paquete publicado 
se instala y puede ser usado correctamente.

Usando `git submodule` configure un super-repo para que contenga
a ambos repos: el del módulo `lexgen-code-aluAtGitHub` y el repo de pruebas de producción `lexgen-testing-aluGitHub`.

## Semantic Versioning

* Publique una mejora en la funcionalidad del módulo. Por ejemplo añada la opción `/u`
a la expresión regular creada para que Unicode sea soportado. ¿Como debe cambiar el nº de versión?

* Opcional: Un defecto que tiene el diseño del módulo es que el nombre de la expresión regular que define el token aparece dos veces: dentro de la regexp y en el array y debe ser la misma. Cambie la interfaz para que sólo aparezca una vez. ¿Como debe cambiar el nº de versión?

<!--
## Mejoras 2022

* Nos. de línea
* Transformers
* next (compatibilidad con nearley)
* reset(chunk, info) sets the internal buffer of the lexer to chunk, and restores its state to a state returned by save().
* formatError(token)
* has(name) returns true if the lexer can emit tokens with that name. This is used to resolve %-specifiers in compiled nearley grammars.
-->

## Referencias

* Tema [Expresiones Regulares y Análisis Léxico]({{site.baseurl}}/temas/expresiones-regulares-y-analisis-lexico)  
* Sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module)
* [Jest](/temas/introduccion-a-javascript/jest)
* Sección [GitHub Registry](/temas/introduccion-a-javascript/github-registry)
* Sección [GitHub Actions](/temas/introduccion-a-javascript/github-actions)
* Sección [Módulos](/temas/introduccion-a-javascript/modulos)
* Sección [Node.js Packages](/temas/introduccion-a-javascript/nodejspackages)
* Sección [Documentation](/temas/introduccion-a-javascript/documentation)
