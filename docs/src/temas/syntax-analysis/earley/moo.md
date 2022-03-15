---
toc: true
---
# Lexical Analysis with Moo

By default, nearley splits the input into a stream of characters. This is
called *scannerless* parsing.

## Lexing with Moo

The `@lexer` directive instructs Nearley to use a lexer you've defined inside a
[Javascript block](grammar#additional-js) in your grammar.

nearley supports and recommends [Moo](https://github.com/tjvr/moo), a
super-fast lexer. Construct a lexer using `moo.compile`.

When using a lexer, there are two ways to match tokens:

  - Use `%token` to match a token with **type** `token`.

    ```
    line -> words %newline
    ```

  - Use `"foo"` to match a token with **text** `foo`.

    This is convenient for matching keywords:

    ```
    ifStatement -> "if" condition "then" block
    ```

Here is an example of a simple grammar:

```js
@{%
const moo = require("moo");

const lexer = moo.compile({
  ws:     /[ \t]+/,
  number: /[0-9]+/,
  word: { match: /[a-z]+/, type: moo.keywords({ times: "x" }) },
  times:  /\*/
});
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

expr -> multiplication {% id %} | trig {% id %}

# Use %token to match any token of that type instead of "token":
multiplication -> %number %ws %times %ws %number {% ([first, , , , second]) => first * second %}

# Literal strings now match tokens with that text:
trig -> "sin" %ws %number {% ([, , x]) => Math.sin(x) %}
```

```
✗ nearleyc nearley-with-moo-example.ne -o nearley-with-moo-example.js 
✗ nearley-test -qi '2 * 3' nearley-with-moo-example.js 
[ 6 ]
}
✗ nearley-test -qi 'sin 3' nearley-with-moo-example.js 
[ 0.1411200080598672 ]
```

Have a look at [the Moo documentation](https://github.com/tjvr/moo#usage) to
learn more about writing a tokenizer.

You use the parser as usual: call `parser.feed(data)`, and nearley will give
you the parsed results in return.

## Custom lexers

nearley recommends using a [moo](https://github.com/tjvr/moo)-based lexer.
However, you can use any lexer that conforms to the following interface:

- `next()` returns a token object, which could have fields for line number,
  etc. Importantly, a token object *must* have a `value` attribute.
- `save()` returns an info object that describes the current state of the
  lexer. nearley places no restrictions on this object.
- `reset(chunk, info)` sets the internal buffer of the lexer to `chunk`, and
  restores its state to a state returned by `save()`.
- `formatError(token)` returns a string with an error message describing a
  parse error at that token (for example, the string might contain the line and
  column where the error was found).

> Note: if you are searching for a lexer that allows indentation-aware
> grammars (like in Python), you can still use moo. See [this
> example](https://gist.github.com/nathan/d8d1adea38a1ef3a6d6a06552da641aa) or
> the
> [moo-indentation-lexer](https://www.npmjs.com/package/moo-indentation-lexer)
> module.


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

## Skipping Tokens in Moo

Use  [Moo-ignore](https://github.com/ULL-ESIT-PL/moo-ignore).

Moo-ignore (🐄) is a wrapper around the [moo](https://www.npmjs.com/package/moo) tokenizer/lexer generator that provides a [nearley.js](https://github.com/hardmath123/nearley) compatible lexer with the capacity to ignore specified tokens.

Moo-ignore is a wrapper around the moo tokenizer/lexer generator that provides a nearley.js compatible lexer with the capacity to ignore specified tokens.

Then you can use it in your Nearley.js program and ignore some tokens like white spaces and comments:


```js
@{%
const tokens = require("./tokens");
const { makeLexer } = require("../index.js");

let lexer = makeLexer(tokens);
lexer.ignore("ws", "comment");

const getType = ([t]) => t.type;
%}

@lexer lexer

S -> FUN LP name COMMA name COMMA name RP 
      DO 
        DO  END SEMICOLON 
        DO END 
      END
     END

name  ->      %identifier {% getType %}
COMMA ->       ","        {% getType %}
LP    ->       "("        {% getType %}
RP    ->       ")"        {% getType %}
END   ->      %end        {% getType %}
DO    ->      %dolua      {% getType %}
FUN   ->      %fun        {% getType %}
SEMICOLON ->  ";"         {% getType %}
```

Alternatively, you can set to ignore some tokens in the call to `makeLexer`:

```js
let lexer = makeLexer(tokens, ["ws", "comment"]);
```

Or you can also combine both ways:

```js
let lexer = makeLexer(tokens, ["ws"]);
lexer.ignore("comment");
```

For sake of completeness, here is the contents of the file `tokens.js` we have used in the former code:

```js
const { moo } = require("moo-ignore");

module.exports = {
    ws: { match: /\s+/, lineBreaks: true },
    comment: /#[^\n]*/,
    lp: "(",
    rp: ")",
    comma: ",",
    semicolon: ";",
    identifier: {
        match: /[a-z_][a-z_0-9]*/,
        type: moo.keywords({
            fun: "fun",
            end: "end",
            dolua: "do"
        })
    }
}
```

See the [tests](https://github.com/ULL-ESIT-PL/moo-ignore/tree/main/test) folder in this distribution for more examples of use. Here is a program that tests the former example:

```js
const nearley = require("nearley");
const grammar = require("./test-grammar.js");

let s = `
fun (id, idtwo, idthree)  
  do   #hello
    do end;
    do end # another comment
  end 
end`;

try {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  parser.feed(s);
  console.log(parser.results[0]) /* [ 'fun', 'lp', 'identifier', 'comma',
          'identifier', 'comma', 'identifier', 'rp',
          'dolua',      'dolua', 'end', 'semicolon',
          'dolua',      'end', 'end', 'end' */
} catch (e) {
    console.log(e);
}
```

## A moo lexer object is a Generator

A moo lexer object is a [Generator](https://javascript.info/generators), you can use `filter()` and `map()` which are built-in to JavaScript. 

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

