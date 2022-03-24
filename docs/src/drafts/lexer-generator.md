---
title: Lexer Generator
permalink: /practicas/lexer-generator
published: true
date: 2022/03/23
delivery: "2022/03/31"
order: 11
layout: Practica
prev: 
sidebar: auto
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

# {{ $frontmatter.title }}

## Objetivos

Usando el repo de la asignación de esta tarea construya un paquete npm y 
publíquelo como paquete privado en GitHub Registry con ámbito `@ULL-ESIT-PL-2122`  y con nombre el nombre de su repo `lexgen-code-AluXXXteamName`

Una parte de los conceptos y habilidades a ejercitar con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). 

El módulo deberá exportar un objeto con dos funciones 

```js
module.exports = { buildLexer, nearleyLexer };
```

que construyen analizadores léxicos. 

## La función buildLexer 

```js
const { buildLexer } =require('@ULL-ESIT-PL-2122/lexgen-code-aluTeam');
```

La función importada `buildLexer` se llamará con un array de expresiones regulares.
Cada una de las expresiones regulares deberá ser un paréntesis con nombre.
El nombre del paréntesis será el nombre/`type` del token/terminal.

```js 
  "use strict";
const { buildLexer } =require('@ULL-ESIT-PL-2122/lexgen-code-aluTeam');

const SPACE = /(?<SPACE>\s+)/; SPACE.skip = true;
const COMMENT = /(?<COMMENT>\/\/.*)/; COMMENT.skip = true;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const NUMBER = /(?<NUMBER>\d+)/; NUMBER.value = v => Number(v);
const ID = /(?<ID>\b([a-z_]\w*)\b)/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const PUNCTUATOR = /(?<PUNCTUATOR>[-+*\/=;])/;
const myTokens = [SPACE, COMMENT, NUMBER, RESERVEDWORD, ID, STRING, PUNCTUATOR];

const { validTokens, lexer } = buildLexer(myTokens);

console.log(validTokens);
const str = 'const varName \n// An example of comment\n=\n 3;\nlet z = "value"';
const result = lexer(str);
console.log(result);
```

El array

```js
myTokens = [SPACE, COMMENT, NUMBER, RESERVEDWORD, ID, STRING, PUNCTUATOR];
```

describe el componente léxico del lenguaje. 

La llamada 

```js 
{ validTokens, lexer } = buildLexer(myTokens)
``` 

retornará 

1. Un objeto con una función `lexer` que es el analizador léxico y 
2. Un mapa JS `validTokens` con claves los /tipos de tokens y valores las RegExps asociadas.

### El Mapa validTokens

Estos son los contenidos de `ValidTokens` volcados por la línea `console.log(validTokens);` en el ejemplo:

```js
➜  lexer-generator-solution git:(master) ✗ node examples/hello.js
Map(8) {
  'SPACE' => /(?<SPACE>\s+)/ { skip: true },
  'COMMENT' => /(?<COMMENT>\/\/.*)/ { skip: true },
  'NUMBER' => /(?<NUMBER>\d+)/ { value: [Function (anonymous)] },
  'RESERVEDWORD' => /(?<RESERVEDWORD>\b(const|let)\b)/,
  'ID' => /(?<ID>\b([a-z_]\w*)\b)/,
  'STRING' => /(?<STRING>"([^\\"]|\\.")*")/,
  'PUNCTUATOR' => /(?<PUNCTUATOR>[-+*\/=;])/,
  'ERROR' => /(?<ERROR>.+)/
}
```

### El token ERROR 

Observe como aparece un nuevo token `ERROR` como último en el mapa. El token `ERROR` es especial y será automáticamente retornado por el analizador léxico generado `lexer` en el caso de que la  entrada contenga un error.

### El analizador lexer 

Cuando `lexer` es llamada con una cadena de entrada retornará el array de tokens de esa cadena conforme a la descripción léxica proveída:

Así, cuando al analizador léxico le damos una entrada como esta:

```js
const str = 'const varName \n// An example of comment\n=\n 3;\nlet z = "value"';
const result = lexer(str);
console.log(result);
```

deberá producir una salida como esta:

```js
[
  { type: 'RESERVEDWORD', value: 'const', line: 1, col: 1, length: 5 },
  { type: 'ID', value: 'varName', line: 1, col: 7, length: 7 },
  { type: 'PUNCTUATOR', value: '=', line: 3, col: 1, length: 1 },
  { type: 'NUMBER', value: 3, line: 4, col: 2, length: 1 },
  { type: 'PUNCTUATOR', value: ';', line: 4, col: 3, length: 1 },
  { type: 'RESERVEDWORD', value: 'let', line: 5, col: 1, length: 3 },
  { type: 'ID', value: 'z', line: 5, col: 5, length: 1 },
  { type: 'PUNCTUATOR', value: '=', line: 5, col: 7, length: 1 },
  { type: 'STRING', value: '"value"', line: 5, col: 9, length: 7 }
]
```

### El atributo skip 

Observe como en el array retornado no aparecen los tokens `SPACE` ni `COMMENT`. 
Esto es así porque pusimos los atributos `skip` de las correspondientes expresiones regulares a `true`:

```js
const SPACE = /(?<SPACE>\s+)/; SPACE.skip = true;
const COMMENT = /(?<COMMENT>\/\/.*)/; COMMENT.skip = true;
```

### El atributo value 

Si se fija en los detalles observará que en el array de tokens, el atributo `value` del token `NUMBER` no es 
la cadena `"3"`  sino el número `3`:

```js
{ type: 'NUMBER', value: 3, line: 4, col: 2, length: 1 },
```

Esto ha ocurrido porque hemos dotado a la regexp de `NUMBER` de un atributo `value` que es una función que actua como *postprocessor*:

```js
const NUMBER = /(?<NUMBER>\d+)/; NUMBER.value = v => Number(v);
```

### Sobre la conducta del lexer ante un error 

Cuando se encuentra una entrada errónea `lexer ` produce un token con nombre `ERROR`:

```js
const str = 'const varName = {};';
r = lexer(str);
expected = [
  { type: 'RESERVEDWORD', value: 'const', line: 1, col: 1, length: 5 },
  { type: 'ID', value: 'varName', line: 1, col: 7, length: 7 },
  { type: 'PUNCTUATOR', value: '=', line: 1, col: 15, length: 1 },
  { type: 'ERROR', value: '{};', line: 1, col: 17, length: 3 }
];
```

Esta entrada es errónea por cuanto no hemos definido el token para las llaves.
El token `ERROR` es especial en cuanto con que casa con cualquier entrada errónea.

Véase también el último ejemplo con errores en la [sección Pruebas](#pruebas)

## Prerequisitos

Tóme esta práctica con calma por cuanto me parece  complicada en el estado de conocimientos de RegExps en el que estamos. Nos han faltado clases para establecer las bases necesarias.

En este vídeo se introducen los conceptos de expresiones regulares que son necesarios
para la realización de esta práctica. Especialmente 

* `lastindex` en el minuto 19:30 
* El uso de la sticky flag `/y` a partir del minuto 30
* Construcción de analizador léxico minuto 33:45

<youtube id="xCNs1fT1KOc"></youtube>

En  los primeros 25 minutos de este vídeo se explica como realizar una versión ligeramente diferente de esta práctica:

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

Deberá añadir pruebas usando [Jest](/temas/introduccion-a-javascript/jest}). 

Sigue un ejemplo:

```
➜  lexer-generator-solution git:(master) ✗ pwd -P
/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/lexer-generator/lexer-generator-solution
➜  lexer-generator-solution git:(master) ✗ ls test
build-lexer.test.js          test-grammar-2-args.ne       test-grammar-error-tokens.ne test-grammar.ne
egg                          test-grammar-combined.ne     test-grammar.js
➜  lexer-generator-solution git:(master) ✗ cat test/build-lexer.test.js 
```
```js
// If you want debugging output run it this way:
// DEBUG=1 npm test
// @ts-check
/**
 * @author Casiano Rodriguez Leon <aluXXX@ull.edu.es>
 * @since 28/03/2122
 * This file imports the buildLexer function and tests it
 */

'use strict';

const { buildLexer } = require('../src/main.js');

describe('buildLexer', () => {
  const SPACE = /(?<SPACE>\s+|\/\/.*)/; SPACE.skip = true;
  const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
  const ID = /(?<ID>\b([a-z_]\w*)\b)/;
  const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
  const OP = /(?<OP>[+*\/=-])/;

  const myTokens = [
    SPACE,
    RESERVEDWORD,
    ID,
    STRING,
    OP,
  ];

  const { lexer } = buildLexer(myTokens);

  test('Assignment to string', () => {
    const str = 'const varName = "value"';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'const',
        col: 1,
        line: 1,
        length: 5,
      },
      {
        type: 'ID',
        value: 'varName',
        col: 7,
        line: 1,
        length: 7,
      },
      {
        type: 'OP',
        value: '=',
        col: 15,
        line: 1,
        length: 1,
      },
      {
        type: 'STRING',
        value: '"value"',
        col: 17,
        line: 1,
        length: 7,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('Assingment spanning two lines', () => {
    const str = 'let x = a + \nb';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'let',
        col: 1,
        line: 1,
        length: 3,
      },
      {
        type: 'ID',
        value: 'x',
        col: 5,
        line: 1,
        length: 1,
      },
      {
        type: 'OP',
        value: '=',
        col: 7,
        line: 1,
        length: 1,
      },
      {
        type: 'ID',
        value: 'a',
        col: 9,
        line: 1,
        length: 1,
      },
      {
        type: 'OP',
        value: '+',
        col: 11,
        line: 1,
        length: 1,
      },
      {
        type: 'ID',
        value: 'b',
        col: 1,
        line: 2,
        length: 1,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('Input with errors', () => {
    const str = ' // Input with errors\nlet x = 42*c\nconst a = b';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'let',
        col: 1,
        line: 2,
        length: 3,
      },
      {
        type: 'ID',
        value: 'x',
        col: 5,
        line: 2,
        length: 1,
      },
      {
        type: 'OP',
        value: '=',
        col: 7,
        line: 2,
        length: 1,
      },
      {
        type: 'ERROR',
        value: '42*c',
        col: 9,
        line: 2,
        length: 4,
      },
      {
        type: 'RESERVEDWORD',
        value: 'const',
        col: 1,
        line: 3,
        length: 5,
      },
      {
        type: 'ID',
        value: 'a',
        col: 7,
        line: 3,
        length: 1,
      },
      {
        type: 'OP',
        value: '=',
        col: 9,
        line: 3,
        length: 1,
      },
      {
        type: 'ID',
        value: 'b',
        col: 11,
        line: 3,
        length: 1,
      },
    ];
    expect(result).toEqual(expected);
  });

  test('Input with errors that aren\'t at the end of the line', () => {
    const str = 'let 2x = "hello"';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'let',
        col: 1,
        line: 1,
        length: 3,
      },
      {
        type: 'ERROR',
        value:  "2x = \"hello\"",
        col: 5,
        line: 1,
        length: 12,
      }
    ];
    expect(result).toEqual(expected);
  });

  test('Shouldn\'t be possible to use unnamed Regexps', () => {
    const OP = /([+*\/=-])/;

    expect(() => buildLexer([OP]).lexer).toThrowError(/named/);
  });

  test('Shouldn\'t be possible to use Regexps named more than once', () => {
    const OP = /(?<OP>(?<OP2>[+*\/=-]))/;

    expect(() => buildLexer([OP]).lexer).toThrowError(/named/);
  });

  test('Should be possible to use Regexps with look behinds', () => {
    const OP = /(?<OP>a(?<=b))/;

    expect(() => buildLexer([OP]).lexer).not.toThrowError(/named/);
  });
});

describe('buildLexer with unicode', () => {
  const SPACE = /(?<SPACE>\s+|\/\/.*)/; SPACE.skip = true;
  const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
  const ID = /(?<ID>\b([a-z_]\w*)\b)/;
  const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
  const OP = /(?<OP>[+*💠\/=-])/;

  const myTokens = [
    SPACE,
    RESERVEDWORD,
    ID,
    STRING,
    OP,
  ];

  const { lexer } = buildLexer(myTokens);

  test('Use of emoji operation', () => {
    const str = 'const varName = "value" 💠 "a"';
    const result = lexer(str);
    const expected = [
      {
        type: 'RESERVEDWORD',
        value: 'const',
        col: 1,
        line: 1,
        length: 5,
      },
      {
        type: 'ID',
        value: 'varName',
        col: 7,
        line: 1,
        length: 7,
      },
      {
        type: 'OP',
        value: '=',
        col: 15,
        line: 1,
        length: 1,
      },
      {
        type: 'STRING',
        value: '"value"',
        col: 17,
        line: 1,
        length: 7,
      },
      {
        type: 'OP',
        value: '💠',
        col: 25,
        line: 1,
        length: 2,
      },
      {
        type: 'STRING',
        value: '"a"',
        col: 28,
        line: 1,
        length: 3,
      },
    ];
    expect(result).toEqual(expected);
  });
});
```

Ejemplo de ejecución:

```
➜  lexer-generator-solution git:(master) ✗ npm test                           

> @ull-esit-pl-2122/lexgen-code-casiano-rodriguez-leon@3.1.1 test
> jest --coverage

 PASS  test/build-lexer.test.js
  buildLexer
    ✓ Assignment to string (2 ms)
    ✓ Assingment spanning two lines (1 ms)
    ✓ Input with errors
    ✓ Input with errors that aren't at the end of the line (1 ms)
    ✓ Shouldn't be possible to use unnamed Regexps (4 ms)
    ✓ Shouldn't be possible to use Regexps named more than once (1 ms)
    ✓ Should be possible to use Regexps with look behinds
  buildLexer with unicode
    ✓ Use of emoji operation

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   64.58 |    58.33 |      50 |   64.58 |                   
 main.js  |   64.58 |    58.33 |      50 |   64.58 | 69,89-118         
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.291 s
Ran all test suites.
```

Amplíe este ejemplo para comprobar que el analizador generado puede ser utilizado desde Nearley.JS.

## Integración Contínua usando GitHub Actions

Use [GitHub Actions](/temas/introduccion-a-javascript/github-actions) para la ejecución de las pruebas

## Documentación

[Documente](/assets/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md` y la documentación de la función exportada.

## Publicar como paquete npm en GitHub Registry

Usando el repo de la asignación de esta tarea publique el paquete como paquete privado en GitHub Registry con ámbito `@ULL-ESIT-PL-2122`  y nombre el nombre de su repo `lexgen-code-aluTeam`

## Pruebas de Producción

En un nuevo repo `lexgen-testing-aluGitHub` añada las pruebas
para comprobar que el paquete publicado 
se instala y puede ser usado correctamente.

Usando `git submodule` configure un super-repo para que contenga
a ambos repos: el del módulo `lexgen-code-aluTeam` y el repo de pruebas de producción `lexgen-testing-aluGitHub`.

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
