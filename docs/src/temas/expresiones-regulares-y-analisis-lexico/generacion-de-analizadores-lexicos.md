# Como Escribir un Generador de Analizadores Léxicos

## Sugerencias para la construcción de buildLexer

El siguiente código ilustra el uso combinado de la opción sticky y los grupos con nombre para 
encontrar la solución a esta práctica:

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

escribiendo una función `buildLexer` que recibe como argumentos un array `tokens`
como en el ejemplo y retorna una función que hace el análisis léxico 
correspondiente a esos tokens.

## Analizadores Léxicos usando la Sticky flag

Si combinamos la flag sticky con el uso de paréntesis con nombre 
podemos construir un analizador léxico.

Recuerda que la función de un analizador léxico es la de proporcionarnos
un stream de tokens a partir de la cadena de entrada. 

Por ejemplo, el tokenizer de `espree` funciona así:

```js
> const espree = require('espree')
undefined
> espree.tokenize('var a = "hello"')
[
  Token { type: 'Keyword', value: 'var', start: 0, end: 3 },
  Token { type: 'Identifier', value: 'a', start: 4, end: 5 },
  Token { type: 'Punctuator', value: '=', start: 6, end: 7 },
  Token { type: 'String', value: '"hello"', start: 8, end: 15 }
]
```

Queremos hacer algo parecido.

Para ello usaremos el hecho de que podemos acceder al paréntesis que casa
via el nombre:

```js
> RE = /(?<NUM>\d+)|(?<ID>[a-z]+)|(?<OP>[-+*=])/y;
/(?<NUM>\d+)|(?<ID>[a-z]+)|(?<OP>[-+*=])/y
> input = 'x=2+b'
'x=2+b'
> while (m = RE.exec(input)) { console.log(m.groups) }
[Object: null prototype] { NUM: undefined, ID: 'x', OP: undefined }
[Object: null prototype] { NUM: undefined, ID: undefined, OP: '=' }
[Object: null prototype] { NUM: '2', ID: undefined, OP: undefined }
[Object: null prototype] { NUM: undefined, ID: undefined, OP: '+' }
[Object: null prototype] { NUM: undefined, ID: 'b', OP: undefined }
```

Puesto que la expresión regular es un OR, sólo una de las subexpresiones
casa y el resto está `undefined`. 
Para detectar el token debemos recorrer el objeto buscando la clave cuyo valor no 
está `undefined`:

```js
> RE = /(?<NUM>\d+)|(?<ID>[a-z]+)|(?<OP>[-+*=])/y;
/(?<NUM>\d+)|(?<ID>[a-z]+)|(?<OP>[-+*=])/y
> input = 'x=2+b'
'x=2+b'
> names = ['NUM', 'ID', 'OP']
[ 'NUM', 'ID', 'OP' ]
> while (m = RE.exec(input)) { 
  console.log(names.find(n => m.groups[n] !== undefined)) }
ID
OP
NUM
OP
ID
```

El siguiente ejemplo ilustra la técnica:

```
[~/.../practicas/p2-t2-lexer(master)]$ cat sticky.js
```

```js
const str = 'const varName = "value"';
console.log(str);

const SPACE = /(?<SPACE>\s+)/;
const RESERVEDWORD = /(?<RESERVEDWORD>\b(const|let)\b)/;
const ID = /(?<ID>([a-z_]\w+))/;
const STRING = /(?<STRING>"([^\\"]|\\.")*")/;
const OP = /(?<OP>[+*\/-=])/;

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

## Como obtener el nombre de una RegExp con nombre

Consideremos una expresión regular con nombre:

```js 
> NUM = /(?<NUM>\d+)/
/(?<NUM>\d+)/
```
La siguiente expresión regular tiene dos paréntesis para capturar el nombre y el resto de la regexp:

```js
> getName = /^[(][?]<(\w+)>(.+)[)]$/
/^[(][?]<(\w+)>(.+)[)]$/
```

Cuando se tiene una regexp `Re`, el atributo `Re.source` contiene la cadena que defina la expresión regular.

Asi pues, cuando hacemos `getName.exec(NUM.source)` obtenemos:

```js
> r = getName.exec(NUM.source)
[
  '(?<NUM>\\d+)',
  'NUM',
  '\\d+',
  index: 0,
  input: '(?<NUM>\\d+)',
  groups: undefined
]
```

En el primer paréntesis casamos con el nombre y en el segundo con la regexp:

```js
> r[1]
'NUM'
> r[2]
'\\d+'
```

Para que nuestro generador de analizadores léxicos pueda funcionar cada una de las regexp proveídas debe tener un único paréntesis con nombre. Podemos comprobar si el cuerpo de la regexp en `r[2]` contiene mas paréntesis con nombre haciendo algo como esto:

```js
> OP = /(?<OP>(?<OP2>[+*\/=-]))/
/(?<OP>(?<OP2>[+*\/=-]))/
> r = getName.exec(OP.source)
[
  '(?<OP>(?<OP2>[+*\\/=-]))',
  'OP',
  '(?<OP2>[+*\\/=-])',
  index: 0,
  input: '(?<OP>(?<OP2>[+*\\/=-]))',
  groups: undefined
]
```

```js
> hasNamedParen = /[(][?]<(\w+)>(.+)[)]/
/[(][?]<(\w+)>(.+)[)]/
> hasNamedParen.exec(r[2])
[
  '(?<OP2>[+*\\/=-])',
  'OP2',
  '[+*\\/=-]',
  index: 0,
  input: '(?<OP2>[+*\\/=-])',
  groups: undefined
]
```


## Referencias

* Tema [Expresiones Regulares y Análisis Léxico](/temas/expresiones-regulares-y-analisis-lexico)  
  * [Sección lastindex](/temas/expresiones-regulares-y-analisis-lexico/#lastindex)
  * [Sticky flag](/temas/expresiones-regulares-y-analisis-lexico/#sticky-flag-y-searching-at-position)
  * [Analizadores Léxicos usando la Sticky flag](/temas/expresiones-regulares-y-analisis-lexico/#analizadores-lexicos-usando-la-sticky-flag)
* [Lab lexer-generator](/practicas/lexer-generator.html)
* [Example: using sticky matching for tokenizing](https://2ality.com/2015/07/regexp-es6.html#example-using-sticky-matching-for-tokenizing) inside 
the chapter [New regular expression features in ECMAScript 6](https://2ality.com/2015/07/regexp-es6.html#example-using-sticky-matching-for-tokenizing)

## Referencias Adicionales sobre Análisis Léxico

* [Ejemplo de Analizador Léxico para JS](https://github.com/crguezl/ull-etsii-grado-pl-minijavascript/blob/gh-pages/tokens.js)
* [Descripción de la Práctica: Analizador Léxico para Un Subconjunto de JavaScript](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicaanalisislexicotdop2018.html) gitbooks.io
* [Compiler Construction by Wikipedians](https://books.google.es/books?id=nMZnyp_zW8AC&pg=PA570#v=onepage&q=Lexical&f=false). Chapter  Lexical Analysis
* [Un caso a estudiar: El módulo npm lexical-parser](https://github.com/Eitz/lexical-parser)
* [Esprima. Chapter 3. Lexical Analysis (Tokenization)](https://esprima.readthedocs.io/en/latest/lexical-analysis.html)
    - [RepoULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk](https://github.com/ULL-ESIT-GRADOII-PL/esprima-pegjs-jsconfeu-talk)
* [jison-lex](https://github.com/zaach/jison-lex)
* [lexer](https://github.com/aaditmshah/lexer)
* [Expresiones Regulares en Flex](https://ull-esit-pl-1617.github.io/apuntesingenieriainformaticaPL/node19.html)

<!--
### Práctica p9-t2-lexer

* [Práctica Escribir un Analizador Léxico para Javascript (p9-t2-lexer)](practicas/p9-t2-lexer/README.md)

### Práctica p9-t2-lexer-with-server

* [Práctica Autenticación y Analizador Léxico para Javascript  (p9-t2-lexer-with-server)](practicas/p9-t2-lexer/README-with-server-lab)
-->
