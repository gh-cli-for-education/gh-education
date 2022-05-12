---
title: "Translating from Egg to JavaScript" 
categories: ["practicas"] 
rubrica:
  - "Se añadió  una opción -j --js al ejecutable o bien en su directorio bin hay un nuevo ejecutable egg2js.js que permite hacer la traducción"
  - "Traduce correctamente todos los ejemplos en la descripción de la práctica"
  - "La solución presentada respeta el principio OPEN/CLOSED"
  - "En lo posible se respeta la semántica de Egg y en dodne no se documenta apropiadamente"
  - "El número de constructos Egg traducidos es un criterio en la calificación de esta práctica"
  - "Opcional: Se proporciona información de localización (offset, etc.)"
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
  - El superproyecto está correctamente estructurado usando submódulos
  - Se ha publicado en GitHub Registry 
  -
    - Pruebas
    - Se provee una carpeta `examples`  con ejemplos de programas `egg``
    - Se ha automatizado el proceso de pasar del "*ejemplo que funciona*" a "*test unitario que prueba que funciona*"
    - Se hace integración contínua tanto en desarrollo como en producción
  - 
    - Documentación
    - Ejecutables, Lenguaje, ASTs, etc.
    - Documentación del módulo npm (API) y ejecutables 
    - "Opcional: publicar la documentación de la API usando GitHub Pages en la carpeta `docs/`. Informe de cubrimiento"
--- 

# {{ $frontmatter.title }}

## Goals

Write a translator from the [Egg](https://eloquentjavascript.net/12_language.html) language to the JavaScript language.

Reuse your parser to create the parse trees. Add traversal functions of the ASTs to generate the JS code.

## The Compiler

Add a `-j --js` option to your compiler executable, or add a new `egg2js.js` executable to your `bin` directory to do the translation
 

## A simple example: examples/times.egg

When the program is given input with Egg expressions of type *apply* like these:

```ruby
$ cat examples/times.egg
print(
 +(3,
    *(4,
      5
    )
  ),
  -(9,3)
)
```

should output an `examples/times.js` file with output similar to this:

```js
➜  crguezl-egg-2-js-2021 git:(main) ✗ bin/egg2js.js -j examples/times.egg 
➜  crguezl-egg-2-js-2021 git:(main) ✗ cat examples/times.js
const Egg = require("runtime-support");
Egg.print((3 + (4 * 5)), (9 - 3));
```

## Adding Methods to AST Node Classes

An approach that I have followed when doing this practice is to add `generateJS` methods to each of the different types of AST nodes that are responsible for generating the JS code corresponding to that type of node:

```js
class Apply {
  ...

  generateJS(scope) {
    if (this.operator.type === 'word') {
      if (generateJSForms[this.operator.name]) {
        return generateJSForms[this.operator.name](this.args, scope);
      } 
      else {
        let opTranslation = this.operator.generateJS(scope);
        if (scope[opTranslation]) {
          let argsTranslated = this.args.map(arg => arg.generateJS(scope));
          return `${opTranslation}(${argsTranslated})`; 
        } 
        else { 
          ...
        }
      }
    } else if (this.operator.type == 'apply') {
      ...
    }
  }
}
```

## Strategy Pattern Again: Un mapa de generadores de JS

To make it easier to generate JS code you may find it useful to follow the *Strategy Pattern* and have a module that exports a `generateJS` map/hash whose keys are
the same as in `specialForms` and `topEnv` and the values are the corresponding
JS code generation functions. In this way we avoid as far as possible violating the OPEN/CLOSED principle:

```js

let generateJSForms = Object.create(null);

['+', '-', '*', '/', '==', '<', '>', '&&', '||' ].forEach(op => {
  generateJSForms[op] = function(args, scope) {
    ...
  }
});

generateJSForms["print"] = function(args, scope) {
  ...
};

generateJSForms["do"] = function(args, scope) {
  ...
};

generateJSForms["fun"] = generateJSForms["->"] = function(args, scope) {
  ...
};

generateJSForms["="] = generateJSForms["set"] = function(args, scope) {
  ... 
};

generateJSForms[':='] = 
generateJSForms['def'] = 
generateJSForms['define'] = function(args, scope) {
  ...
};

module.exports = { generateJSForms };
```

## Consideraciones semánticas 

The `do` in Egg returns the last expression evaluated, whereas a JS block is not an expression.
So I can't translate `do(...)` directly into a JS `{ ... }` block.

So `do(...)` could be attempted to be translated following this scheme:

```ruby
➜  egg2js-solution git:(master) cat examples/generatingJS/do.egg
print(
  do(
    def(a,1),
    =(a,9),
    def(b, +(a,1))
  )
)
```                                                                                         

```js
➜  egg2js-solution git:(master) bin/egg.js examples/generatingJS/do.egg -J    
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
runtimeSupport.print((() => {
  var $a, $b;
  $a = 1;
  $a = 9
  return $b = ($a + 1);
})())
```

In general, make sure that any JS program resulting from the translation of an Egg program produces the same results as when the Egg program is parsed.
 
## Runtime Library Support

You may find it useful to write a `runtime-support.js` library with functions that support running the translated JS programs. Something like that:

```js
➜  egg2js-solution git:(master) ✗ cat lib/generateJS/runtimeSupport.js 
runtimeSupport = {
  /**
   * print function emulating egg print behavior
   * @param  {...any} args 
   */
  print: (...args) => {
    console.log(...args);
    return args;
  }
  /* ... */
};

module.exports = runtimeSupport;
```


## A more complex example: Managing Scopes

When variables and functions are declared and new scopes are created like in this example (assume that in addition to the functions the `do` has its own scope):

```js
➜  egg2js-solution git:(master) ✗ cat examples/generatingJS/hello-scope.egg
print("computed value = ", 
  do(
    def(x,4),
    def(inc, fun(w, do(
        def(y, 999),
        +(w,1)
      ) # do
    ) # fun
    ),# def
    def(z,-1),
    set(x, inc(x))
  )
)
```

The translation should produce the equivalent JavaScript code:

```
➜  egg2js-solution git:(master) ✗ bin/egg.js examples/generatingJS/hello-scope.egg -J
```
```js
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
runtimeSupport.print('computed value = ', (() => {
  var $x, $inc, $z;
  $x = 4;
  $inc = ($w) => {
    return (() => {
      var $y;
      $y = 999;
      return ($w + 1)
    })()
  };
  $z = -1;
  return $x = $inc($x)
})())
```

Notice how we prefix source variables with "`$`" so that statements like `def(x,4)` become:

```js
  var $x, $inc, $z;
  $x = 4;
```

this is done so that *translated variables* don't **collide** with auxiliary variables that we might need to introduce to support the translation.

Observe how is the translation that we have made of a `do`:

```ruby
➜  egg2js-solution git:(master) ✗ cat examples/generatingJS/do.egg
print(
  do(
    def(a,1),
    =(a,9),
    def(b, +(a,1))
  )
)                                                                                           
```

lo hemos convertido en:

```js
       
➜  egg2js-solution git:(master) ✗ bin/egg.js examples/generatingJS/do.egg -J         
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
runtimeSupport.print((() => {
  var $a, $b;
  $a = 1;
  $a = 9
  return $b = ($a + 1);
})())
```

See how the scope is created using an anonymous function `(() => { ... })()` that is executed on the fly *so that it returns the last expression evaluated*.

We have not made use of a direct translation of a `do` by a compound statement

```js
{ ... }
```

and we have taken this pains to respect the semantics of Egg.

## Translating applys onto applys

Note that in Egg the operator of an apply can itself be an apply as in this example with the expression `f(2)(4)`:

```js
➜  egg2js-solution git:(master) ✗ cat examples/generatingJS/funfun.egg
do(
  def(f, fun(x, fun(y, +(x,y)))),
  print(f(2)(4)) # 6
)
```

Es por tanto necesario traducir correctamente el operador: 

```
➜  egg2js-solution git:(master) ✗ bin/egg.js examples/generatingJS/funfun.egg -J
```
```js
const path = require('path');
const runtimeSupport = require(path.join('/Users/casianorodriguezleon/campus-virtual/2122/pl2122/practicas-alumnos/egg2js/egg2js-solution/lib/eggInterpreter', "..", "generateJS", "runtimeSupport"));
(() => {
  var $f;
  $f = ($x) => {
    return ($y) => {
      return ($x + $y)
    }
  };
  return runtimeSupport.print($f(2)(4))
})()
```

## Visual Appearance of the Generated Code

You can use some module like this:

* [js-beautify](https://www.npmjs.com/package/js-beautify) npm module

to improve the visual appearance of the exit code

## Simplifications

You don't need to translate all of your Egg language, just the most important features. At least the examples used on this page should work.

## References

* [Repo ULL-ESIT-PL-2122/egg2js-solution](https://github.com/ULL-ESIT-PL-2122/egg2js-solution) private
* [Repo ULL-ESIT-GRADOII-PL/egg2js](https://github.com/ULL-ESIT-GRADOII-PL/egg2js) private
* [Lab Generating JS 2020/2021](https://ull-esit-pl-2021.github.io/practicas/generating-js)
  * [labs generating js 2020/2021](https://github.com/orgs/ULL-ESIT-PL-2021/repositories?q=generating-js&type=all&language=&sort=)
* [Apuntes 2019/2020 de PL: Compilador de Egg a JS](https://ull-esit-pl-1819.github.io/introduccion/tfa/#compilador-de-egg-a-js)