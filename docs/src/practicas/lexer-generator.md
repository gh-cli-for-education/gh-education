---
title: Lexer Generator
published: true
date: 2022/03/23
delivery: "2022/04/07"
order: 11
layout: Practica
prev: egg-parser.md
next: egg-interpreter.md
sidebar: auto
template: "https://github.com/crguezl/egg-parser-template"
rubrica:
  - El paquete está publicado en GitHub Registry y se instala correctamente
  - El módulo exporta los generadores léxicos y funcionan correctamente 
  - "Se proporciona información de localización (offset, etc.)"
  - El manejo de errores con el token <code>ERROR</code> es correcto
  - Manejo de "tokens skip" correcto
  - Contiene tests comprobando el atributo de transformación <code>value</code>
  - Contiene tests comprobando la compatibilidad del lexer generado con Nearley.JS (egg-parser)
  - "Opcional: estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Los informes están bien presentados (Vuepress)
  - "La documentación es completa" 
  - "Opcional: publicar la documentación de la API usando GitHub Pages en la carpeta <code>docs/</code>"
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
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

La primera functión `buildLexer` devolverá un generador de analizadores léxicos genérico, mientras que la segunda `nearleyLexer` devolverá un [analizador léxico compatible con Nearley.JS](https://nearley.js.org/docs/tokenizers#custom-lexers). 

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
const { validTokens, lexer } = buildLexer(myTokens)
``` 

retornará 

1. Un objeto con una función `lexer` que es el analizador léxico y 
2. Un mapa JS `validTokens` con claves los nombres/tipos de tokens y valores las RegExps asociadas.

### El Mapa validTokens

Estos son los contenidos de `ValidTokens` volcados por la línea `console.log(validTokens);` en el ejemplo anterior:

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

## Vídeos de clase explicando los fundamentos necesarios

### 2020/03/24

En este vídeo se introducen los conceptos de expresiones regulares que son necesarios
para la realización de esta práctica. Especialmente 

* El uso de `lastindex` se introduce en el minuto 19:30 
* El uso de la sticky flag `/y` a partir del minuto 30
* Construcción de analizador léxico minuto 33:45

<youtube id="xCNs1fT1KOc"></youtube>

### 2020/03/25

En  los primeros 25 minutos de este vídeo se explica como realizar una versión ligeramente diferente de esta práctica:

* Analizadores Léxicos: 03:00

<youtube id="4jmsZbEpW7g"></youtube>

Estúdielos antes de seguir adelante

## Sugerencias para la construcción de buildLexer

Lea la sección 
* [Como Escribir un Generador de Analizadores Léxicos](/temas/expresiones-regulares-y-analisis-lexico/generacion-de-analizadores-lexicos)

## La función nearleyLexer

A partir del analizador léxico generado por `buildLexer(regexps)` contruimos un segundo analizador 
léxico con [la API que requiere nearley.JS](https://nearley.js.org/docs/tokenizers#custom-lexers). Este es el código completo de la versión actual:

```js{17,29,30}
const nearleyLexer = function(regexps) {
  debugger;
  const {validTokens, lexer} = buildLexer(regexps);
  validTokens.set("EOF");
  return {
    currentPos: 0,
    buffer: '',
    lexer: lexer,
    validTokens: validTokens,
    regexps: regexps,
    /**
     * Sets the internal buffer to data, and restores line/col/state info taken from save().
     * Compatibility not tested
     */
    reset: function(data, info) { 
      this.buffer = data || '';
      this.currentPos = 0;
      let line = info ? info.line : 1;
      this.tokens = lexer(data, line);
      return this;
    },
    /**
     * Returns e.g. {type, value, line, col, …}. Only the value attribute is required.
     */
    next: function() { // next(): Token | undefined;
      if (this.currentPos < this.tokens.length)
        return this.tokens[this.currentPos++];
      else if (this.currentPos == this.tokens.length) {
        let token = {}; 
        Object.assign(token, this.tokens[this.currentPos-1]);
        token.type = "EOF"
        this.currentPos++; //So that next time will return undefined
        return token; 
      }
    },
    has: function(tokenType) {
      return validTokens.has(tokenType);
    },
    /**
     * Returns an object describing the current line/col etc. This allows nearley.JS
     * to preserve this information between feed() calls, and also to support Parser#rewind().
     * The exact structure is lexer-specific; nearley doesn't care what's in it.
     */
    save: function() {
      return this.tokens[this.currentPos];
    }, // line and col
    /**
     * Returns a string with an error message describing the line/col of the offending token.
     * You might like to include a preview of the line in question.
     */
    formatError: function(token) {
      return `Error near "${token.value}" in line ${token.line}`;
    } // string with error message
  };
}
```

::: danger Modified Line!
Inside the `reset` method there was a bug. 
Important line that you must confirm is in your version:

```js
      this.currentPos = 0;
```
::: 

### nearleyLexer retorna siempre EOF 

Este nuevo lexer va a retornar siempre el token reservado `EOF` cuando se alcance el final de la entrada. Es por eso que lo añadimos al mapa de tokens válidos:

```js
  validTokens.set("EOF");
``` 

y en `next()` lo retornamos cuando detectamos el final de la entrada:

```js
    next: function() { // next(): Token | undefined;
      if (this.currentPos < this.tokens.length)
        return this.tokens[this.currentPos++];
      else if (this.currentPos == this.tokens.length) {
        let token = {}; 
        Object.assign(token, this.tokens[this.currentPos-1]);
        token.type = "EOF"
        this.currentPos++; //So that next time will return undefined
        return token; 
      }
    },
```

::: danger Modified Line!
Inside the `next` method there was a bug. 
Important lines that you must confirm is in your version:

```js
  let token = {}; 
  Object.assign(token, this.tokens[this.currentPos-1]);
```
::: 

## Pruebas

Deberá añadir pruebas usando [Jest](/temas/introduccion-a-javascript/jest). 

Sigue un ejemplo:

```
➜  lexer-generator-solution git:(master) ✗ pwd -P
/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/lexer-generator/lexer-generator-solution
➜  lexer-generator-solution git:(master) ✗ ls test
build-lexer.test.js          test-grammar-2-args.ne       test-grammar-error-tokens.ne test-grammar.ne
egg                          test-grammar-combined.ne     test-grammar.js
```
```
➜  lexer-generator-solution git:(master) ✗ cat test/build-lexer.test.js 
```

* Contenidos de [test/build-lexer.test.js](/temas/introduccion-a-javascript/jest-build-lexer-example)

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

### Cubrimiento de las pruebas

* Añada pruebas para comprobar que el post-procesador `value` funciona correctamente
* Amplíe este ejemplo para comprobar que el analizador `nearleyLexer`  puede ser utilizado correctamente desde Nearley.JS.
* Sustituya el analizador léxico basado en  `moo-ignore`/`moo` usado en su práctica [egg-parser](/practicas/egg-parser.html) por el correspondiente analizador generado con el generador de esta práctica y compruebe que funciona. **Añádalo como una prueba de buen funcionamiento**.

## Integración Contínua usando GitHub Actions

Use [GitHub Actions](/temas/introduccion-a-javascript/github-actions) para la ejecución de las pruebas

## Documentación

[Documente](/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md` y la documentación de la función exportada.

## Publicar como paquete npm en GitHub Registry

Usando el repo de la asignación de esta tarea publique el paquete como paquete privado en GitHub Registry con ámbito `@ULL-ESIT-PL-2122`  y nombre el nombre de su repo `lexgen-code-aluTeam`

## Semantic Versioning

* Publique una mejora en la funcionalidad del módulo. Por ejemplo añada la opción `/u`
a la expresión regular creada para que Unicode sea soportado. De esta forma un analizador léxico como este debería funcionar:

```js
✗ cat hello-unicode.js 
"use strict";

const {buildLexer} = require("../src/main.js");

const SPACE = /(?<SPACE>\p{White_Space}+)/; SPACE.skip = true;
const COMMENT = /(?<COMMENT>\/\/.*)/; COMMENT.skip = true;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const NUMBER = /(?<NUMBER>\p{N}+)/; 
const ID = /(?<ID>\p{L}(\p{L}|\p{N})*)/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const PUNCTUATOR = /(?<PUNCTUATOR>[-+*\/=;])/;
const myTokens = [SPACE, COMMENT, NUMBER, RESERVEDWORD, ID, STRING, PUNCTUATOR];

const { validTokens, lexer } = buildLexer(myTokens);

console.log(validTokens);

const str = "const αβ६६७ \u205F = ६६७ + Ⅻ"; // ६६७ + Ⅻ"; // \u205F medium mathematical space
const result = lexer(str);
console.log(result);
```

Que daría como salida:

```js
✗ node hello-unicode.js
Map(8) {
  'SPACE' => /(?<SPACE>\p{White_Space}+)/ { skip: true },
  'COMMENT' => /(?<COMMENT>\/\/.*)/ { skip: true },
  'NUMBER' => /(?<NUMBER>\p{N}+)/,
  'RESERVEDWORD' => /(?<RESERVEDWORD>\b(const|let)\b)/,
  'ID' => /(?<ID>\p{L}(\p{L}|\p{N})*)/,
  'STRING' => /(?<STRING>"([^\\"]|\\.")*")/,
  'PUNCTUATOR' => /(?<PUNCTUATOR>[-+*\/=;])/,
  'ERROR' => /(?<ERROR>(.|\n)+)/
}
[
  { type: 'RESERVEDWORD', value: 'const', line: 1, col: 1, length: 5 },
  { type: 'ID', value: 'αβ६६७', line: 1, col: 7, length: 5 },
  { type: 'PUNCTUATOR', value: '=', line: 1, col: 15, length: 1 },
  { type: 'NUMBER', value: '६६७', line: 1, col: 17, length: 3 },
  { type: 'PUNCTUATOR', value: '+', line: 1, col: 21, length: 1 },
  { type: 'NUMBER', value: 'Ⅻ', line: 1, col: 23, length: 1 }
```



¿Como debe cambiar el nº de versión?

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

* Tema [Expresiones Regulares y Análisis Léxico](/temas/expresiones-regulares-y-analisis-lexico)  
  * [Sección lastindex](/temas/expresiones-regulares-y-analisis-lexico/#lastindex)
  * [Sticky flag](/temas/expresiones-regulares-y-analisis-lexico/#sticky-flag-y-searching-at-position)
  * [Analizadores Léxicos usando la Sticky flag](/temas/expresiones-regulares-y-analisis-lexico/#analizadores-lexicos-usando-la-sticky-flag)
* Sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module)
* [Jest](/temas/introduccion-a-javascript/jest)
* Sección [GitHub Registry](/temas/introduccion-a-javascript/github-registry)
* Sección [GitHub Actions](/temas/introduccion-a-javascript/github-actions)
* Sección [Módulos](/temas/introduccion-a-javascript/modulos)
* Sección [Node.js Packages](/temas/introduccion-a-javascript/nodejspackages)
* Sección [Documentation](/temas/introduccion-a-javascript/documentation)
