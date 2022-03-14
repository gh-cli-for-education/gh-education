---
title: Parsing with Nearley.js
clases: [ '2021/05/10', '2021/05/05', '2021/05/04', '2021/05/03', '2021/04/28' ]
---


## Introduction to Nearley.js

This section describes the nearley grammar language, in which you can describe
grammars for nearley to parse. Grammars are conventionally kept in `.ne` files.
You can then use `nearleyc` to compile your `.ne` grammars to JavaScript
modules.

You can find many examples of nearley grammars online, as well as some in the
`examples/` directory of the 
[Github repository](http://github.com/Hardmath123/nearley).

### Vocabulary

- A *terminal* is a single, constant string or a token. For example, the
  keyword `"if"` is a terminal.
- A *nonterminal* describes a set of possible strings. For example, all "if"
  statements can be described by a single nonterminal whose value depends on
  the condition and body of the if statement.
- A *rule* (or production rule) is a definition of a nonterminal. For example,
  
  ```ne
  ifStatement -> "if" condition "then" statement "endif"
  ```
  is the rule according to which the if statement nonterminal, `ifStatement`,
  is parsed. It depends on the nonterminals `condition` and `statement`. A
  nonterminal can be described by multiple rules. For example, we can add a
  second rule

  ```ne
  ifStatement -> "if" condition "then" statement "else" statement "endif"
  ```
  
  to support "else" clauses.

By default, nearley attempts to parse the first nonterminal defined in the
grammar. In the following grammar, nearley will try to parse input text as an
`expression`.

```ne
expression -> number "+" number
expression -> number "-" number
expression -> number "*" number
expression -> number "/" number
number -> [0-9]:+
```

You can use the pipe character `|` to separate alternative rules for a
nonterminal. In the example below, `expression` has four different rules.

```
expression ->
    number "+" number
  | number "-" number
  | number "*" number
  | number "/" number
```

::: warning Empty String 
The keyword `null` stands for the **epsilon rule** $\epsilon$, which matches nothing. The
following nonterminal matches zero or more `cow`s in a row, such as
`cowcowcow`:

```ne
a -> null | a "cow"
```
::: 

### Postprocessors

By default, nearley wraps everything matched by a rule into an array. For
example, when `rule -> "tick" "tock"` matches the string `"ticktock"`, it
creates the "parse tree" `["tick", "tock"]`. 

Most of the time, however, you
need to process that data in some way: for example, you may want to filter out
whitespace, or transform the results into a custom JavaScript object.

For this purpose, each rule can have a **postprocessor**: a JavaScript function
that transforms the array and returns a "processed" version of the result.
Postprocessors are wrapped in `{% %}`s:

```js
expression -> number "+" number {%
    function(data) {
        return {
            operator: "sum",
            leftOperand:  data[0],
            rightOperand: data[2] // data[1] is "+"
        };
    }
%}
number -> [0-9]:+ {% d => parseInt(d[0].join("")) %}
```

The rules above will parse the string `5+10` into 

```js 
{ 
  operator: "sum",
  leftOperand: 5, 
  rightOperand: 10 
}
```

The postprocessor can be any function with signature 

```js 
function(data, location, reject)
```

Here,

- `data: Array` is an array that contains the results of parsing each part of
  the rule. Note that it is still an array, even if the rule only has one part!
  You can use the built-in `{% id %}` postprocessor to convert a one-item array
  into the item itself `d => d[0]`.

  For **arrow function** users, a convenient pattern is to decompose the `data`
  array within the argument of the arrow function:

  ```js
  expression ->
      number "+" number {% ([fst, _, snd]) => fst + snd %}
    | number "-" number {% ([fst, _, snd]) => fst - snd %}
    | number "*" number {% ([fst, _, snd]) => fst * snd %}
    | number "/" number {% ([fst, _, snd]) => fst / snd %}
  ```

- `location: number` is the index (zero-based) at which the rule match starts.
  You might use this to show the location of an expression in an error message.

  ::: warning Better forget
  Note: Many [tokenizers](tokenizers) provide line, column, and offset
  information in the Token object. If you are using a tokenizer, then it is
  better to use that information than the nearley-provided variable, which
  would only tell you that it saw the nth _token_ rather than the nth
  _character_ in the string.
  :::

- `reject: Object` is a unique object that you can return to signal that this
  rule doesn't *actually* match its input.

  Reject is used in some edge cases. For example, suppose you want sequences of
  letters to match variables, except for the keyword `if`. In this case, your
  rule may be

  ```js
  variable -> [a-z]:+ {%
      function(d,l, reject) {
          const name = d[0].join('');
          if (name === 'if') {
              return reject;
          } else {
              return { name };
          }
      }
  %}
  ```
  ::: warning Reject is slow 
  Grammars using `reject` are not context-free, and are often much
  slower to parse. 
  ::: 

nearley provides one built-in postprocessor:

- `id` returns the first element of the `data` array. This is useful to
  extract the content of a single-element array: `foo -> bar {% id %}`

### More syntax: tips and tricks

See [Comments and Charsets in Nearley.jss](nearley-comments-charsets)


#### EBNF: Repetitions and parenthesis

nearley supports the `*`, `?`, and `+` operators from
[EBNF](https://en.wikipedia.org/wiki/Extended_Backus–Naur_form) as shown:

```
batman -> "na":* "batman" # nananana...nanabatman
```

You can also use **capture groups with parentheses**. Its contents can be anything
that a rule can have:

```
banana -> "ba" ("na" {% id %} | "NA" {% id %}):+
```

### Macros

Macros allow you to create polymorphic rules:

```ne
# Matches "'Hello?' 'Hello?' 'Hello?'"
matchThree[X] -> $X " " $X " " $X
inQuotes[X] -> "'" $X "'"

main -> matchThree[inQuotes["Hello?"]]
```

Macros are dynamically scoped, which means they see arguments passed to parent
macros:

```ne
# Matches "Cows oink." and "Cows moo!"
sentence[ANIMAL, PUNCTUATION] -> animalGoes[("moo" | "oink" | "baa")] $PUNCTUATION
animalGoes[SOUND] -> $ANIMAL " " $SOUND # uses $ANIMAL from its caller

main -> sentence["Cows", ("." | "!")]
```

Macros are expanded at compile time and inserted in places they are used. They
are not "real" rules. Therefore, macros *cannot* be recursive (`nearleyc` will
go into an infinite loop trying to expand the macro-loop). They must also be
defined *before* they are used (except by other macros).

### Additional JS

For more intricate postprocessors, or any other functionality you may need, you
can include chunks of JavaScript code between production rules by surrounding
it with `@{% ... %}`:

```ne
@{%
const cowSays = require("./cow.js");
%}

cow -> "moo" {% ([moo]) => cowSays(moo) %}
```

Note that it doesn't matter where you add these; they all get hoisted to the
top of the generated code.

### Importing other grammars

You can include the content of other grammar files:

```ne
@include "../misc/primitives.ne" # path relative to file being compiled
sum -> number "+" number # uses "number" from the included file
```

There are some common nonterminals like "integer" and "double-quoted string"
that ship with nearley to help you prototype grammars efficiently. You can
include them using the `@builtin` directive:

```ne
@builtin "number.ne"
main -> int:+
```

(Note that we mean "efficient" in the sense that you can get them set up very
quickly. The builtins are _inefficient_ in the sense that they make your parser
slower. For a "real" project, you would want to switch to a lexer and implement
these primitives yourself!)

See the [`builtin/`](https://github.com/kach/nearley/tree/master/builtin) directory on Github for more details. Contributions are
welcome!

Note that including a file imports *all* of the nonterminals defined in it, as
well as any JS, macros, and configuration options defined there.

### What's next?

Now that you have a grammar, you're ready to [learn how to use it to build a
parser!](parser)

* [Nearley.JS Home Page](https://nearley.js.org/)
* [Nearley.JS GitHub repo](https://github.com/kach/nearley) is a JS parser generator using the Early algorithm
  * [Nearley.js Grammar in Nearley.js](https://github.com/kach/nearley/blob/master/lib/nearley-language-bootstrapped.ne)
* [Repo ULL-ESIT-PL/learning-nearley](https://github.com/ULL-ESIT-PL/learning-nearley/)

## Lexical Analysis with Moo 

* [Nearley.JS Compatible Tokenizers](https://nearley.js.org/docs/tokenizers)
* See section [Lexical Analysis with Moo](moo)

## Performance of NearleyJS

This study by Toby Ho shows a case in which NearleyJS is 200 times slower than a Recursive Descendant Functional parser :disappointed:.

<youtube id="njWmVljrhEE"></youtube> 

## The Earley Algorithm

See the section [The Earley Algorithm Explained](algorithm)

## References

* [Toby Ho Course on How to Make a Parser with Nearley.JS](toby-ho-course)
* [Tokenizers for nearley.js](https://nearley.js.org/docs/tokenizers)
* [fun-lang in Nearley.js](https://github.com/airportyh/fun-lang) GitHub Repo by Toby Ho
  * [scripts](https://github.com/airportyh/fun-lang/tree/master/scripts) folder: How to run the compiler
  * Toby Ho has published a more advanced version of the language as a npm package:  [play-lang](https://www.npmjs.com/package/play-lang)
* [Parsing in JavaScript: Tools and Libraries](https://tomassetti.me/parsing-in-javascript/)

### moo

* [moo](https://www.npmjs.com/package/moo/)
* [moo-ignore](https://www.npmjs.com/package/moo-ignore)

