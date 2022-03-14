# Lexical Analysis with Moo

## moo: Simple Example

```js
const moo = require('moo')
const inspect = require('util').inspect;
const ins = (x) => console.log(inspect(x, {depth: null}));

let lexer = moo.compile({
    WS: /[ \t]+/,
    comment: /\/\/.*?$/,
    number: /0|[1-9][0-9]*/,
    string: /"(?:\\["\\]|[^\n"\\])*"/,
    lparen: '(',
    rparen: ')',
    keyword: ['while', 'if', 'else', 'moo', 'cow'],
    NL: { match: /\n/, lineBreaks: true },
});

lexer.reset(
//123456789AB
 'while (10) cow\nmoo'
)

console.log(lexer.next()) // -> { type: 'keyword', value: 'while' }
console.log(lexer.next()) // -> { type: 'WS', value: ' ' }
console.log(lexer.next()) // -> { type: 'lparen', value: '(' }
console.log(lexer.next()) // -> { type: 'number', value: '10' }
console.log(lexer.next()) // )
console.log(lexer.next()) // cows
console.log(lexer.next()) // "\n"
console.log(lexer.next()) // moo
console.log('result='+ins(lexer.next())) // undefined
console.log('result='+ins(lexer.next())) // undefined
console.log('result='+ins(lexer.next())) // undefined
```

## Skipping White Spaces in Moo

A moo lexer object is an [Generator](https://javascript.info/generators), you can use `filter()` and `map()` which are built-in to JavaScript. 

See moo issue: <https://github.com/no-context/moo/issues/156>

```js 
const moo = require('moo')
const lex = moo.compile({
  // If one rule is /u then all must be
  ws: { match: /\p{White_Space}+/u, lineBreaks: true },
  word: /\p{XID_Start}\p{XID_Continue}*/u,
  op: moo.fallback,
});
```

`ID_Start` characters are derived from the Unicode `General_Category`. In set notation:

```js
/[\p{L}\p{Nl}\p{Other_ID_Start}-\p{Pattern_Syntax}-\p{Pattern_White_Space}]/u
```

`ID_Continue characters` in set notation is:

```js
/[\p{ID_Start}\p{Mn}\p{Mc}\p{Nd}\p{Pc}\p{Other_ID_Continue}-\p{Pattern_Syntax}-\p{Pattern_White_Space}]/
```

See <https://unicode.org/reports/tr31/>


The expression `moo.fallback` matches anything else. 
I believe is similar to: 
```js
{ match: /(?:.|\n)/u, lineBreaks: true}  
```

Observe how we feed the lexer using the `reset` method.
Using the spread operator on the returned generator we get an array with the token 
objects:

```js
const result = [...lex.reset('while ( a < 3 ) { a += 1; }')];
```

Something like:

```js
[
  {
    type: 'word',
    value: 'while',
    text: 'while',
    toString: [Function: tokenToString],
    offset: 0,
    lineBreaks: 0,
    line: 1,
    col: 1
  },
  {
    type: 'ws',
    value: ' ',
    text: ' ',
    toString: [Function: tokenToString],
    offset: 5,
    lineBreaks: 0,
    line: 1,
    col: 6
  },
  ... etc.
]
```

We can filter the array:

```js
let filtered = result.filter(t => t.type !== 'ws');
console.log(filtered.map(function (t) { return { type: t.type, value: t.value } }) );
```

No longer white spaces:

```js
[
  { type: 'word', value: 'while' }, { type: 'op', value: '(' },
  { type: 'word', value: 'a' }, { type: 'op', value: '<' },
  { type: 'op', value: '3' }, { type: 'op', value: ')' },
  { type: 'op', value: '{' }, { type: 'word', value: 'a' },
  { type: 'op', value: '+=' }, { type: 'op', value: '1;' },
  { type: 'op', value: '}' }
]
```

Regrettably, Nearley.JS requires a Moo compatible lexer. That means we have to wrap the returned array in a lexer complaining with a Moo API!

