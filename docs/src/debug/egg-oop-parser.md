---
title: "Adding OOP to the Egg Parser"
key: egg-oop-parser
published: true
date: 2022/04/12
delivery: "2022/04/28"
order: 13
layout: Practica
sidebar: auto
template: "https://github.com/ULL-ESIT-PL-2122/egg-oop-parser-template"
rubrica: 
  - Added properties with brackets
  - Added dot selector for objects 
  - Added Array literal notation 
  - Added Object literal notation
  - The lexer generator module has being extended to support lexical transformations
  - "Added token transformation replace/WORD COLON/STRING COMMA/g"
  - "Correctly solves lexical ambiguity for numbers <code>4.+(5).+(3.2)</code>"
  - "Currying works with methods <code>4[\"+\", 5](3)</code>"
  - Contiene suficientes tests
  - Se provee un workflow sencillo para convertir rápidamente un ejemplo operativo en un test 
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Módulo bien documentado 
  - Informe hecho con Vuepress desplegado
  - Se ha publicado como módulo y se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {{$frontmatter.title }}

<!-- Only the + implemented as method of numbers. Need to implemetn the rest ... -->

## Introducción

En esta práctica, queremos aumentar la expresividad de nuestro lenguaje. 

El siguiente ejemplo muestra algunas de las extensiones que introducimos en esta práctica:

```js
➜  egg-oop-parser-solution git:(master) cat examples/object-colon-selector.egg 
do (
  def(x, {
    c: [1, 2, 3], # array literals!
    gc:  fun(
           element(self, "c") # old way works
         ), 
    sc:  fun(value, # look at the left side of the assignment!
           =(self.c[0], value)
         ),
    inc: fun( 
           =(self.c[0], +(self.c[0], 1)) 
         ) 
  }),
  print(x),
  print(x.gc()),    # [1, 2, 3]
  x.sc(4),
  print(x.gc()),    # [4,2,3]
  x.inc(),
  print(x.gc()),    # [5,2,3]
  print(x.c.pop()), # 3
  print(x.c)        # [5,2]
)
```

Observe las funcionalidades introducidas:

* Se han añadido las llaves `{}` para referirse a objetos literales: `def(x, { ... })`
* Se han añadido los corchetes `[]` para referirse a *array literals* `[1, 2, 3]`
* Es posible acceder a las propiedades de un objeto usando el punto como en `x.c`
* Es posible acceder a las propiedades de un objeto usando corchetes como en `self.c[0]`

- Added Object literal notation
- The lexer generator module has being extended to support lexical transformations
- "Added token transformation replace/WORD COLON/STRING COMMA/g"
- "Correctly solves lexical ambiguity for numbers <code>4.+(5).+(3.2)</code>"
- "Currying works <code>4[\"+\", 5](3)</code>"

## The Dot Ambiguity: Property dot or Mantissa dot?

Al introducir el *dot* para seleccionar la propiedad del objeto se produce una ambiguedad con el punto en los flotantes:

```js
➜  egg-oop-parser-solution git:(master) ✗ cat test/examples/dot-num.egg 
print(4.3.toFixed(2))
```

Se propone que la ambiguedad se resuelva dando prioridad a la interpretación como *punto de número* si el punto va seguido de un dígito, en otro caso estamos accediendo a la propiedad del número:

```
➜  egg-oop-parser-solution git:(master) bin/eggc.js test/examples/dot-num.egg 
➜  egg-oop-parser-solution git:(master) ✗ npx evm test/examples/dot-num.json  
4.30
```

Esto es diferente de lo que hace JS:

```js
➜  pl2122apuntes git:(main) node
Welcome to Node.js v16.0.0.
Type ".help" for more information.
> 4.toFixed(2)
4.toFixed(2)
^^

Uncaught SyntaxError: Invalid or unexpected token
> (4).toFixed(2)
'4.00'
```

## Adding Lexical Transformations to our Lexer Generator Module

Para facilitar la labor de hacer esta práctica es conveniente que volvamos al módulo [lexer-generator](/practicas/lexer-generator) y modifiquemos un poco su API dotandolo de la capacidad de añadir transformaciones léxicas.

Para ello la función `nearleyLexer` recibirá ahora un parámetro adicional de un objeto con opciones.

```js
let lexer = nearleyLexer(tokens, { transform: transformerFun});
```

La única opción que vamos a implementar es `transform`. Que aplica la función `transformerFun` a cada uno de los `tokens` del objeto lexer generado por `nearleyLexer`. En nuestro caso queremos transformar las secuencias `WORD COLON` en  secuencias `STRING COMMA` de manera que `x: 4` sea equivalente a escribir `"x", 4"`

```js
function colonTransformer(tokens) {
  // ... s/WORD COLON/STRING COMMA/g
 return tokens;
}
```

 Este es un ejemplo de uso de la nueva funcionalidad:


To achieve the goal we have to modify the `reset` method of our nearley compatible object:

```js
const nearleyLexer = function(regexps, options) {
  const {validTokens, lexer} = buildLexer(regexps);
  validTokens.set("EOF");
  return {
    // ...
    reset: function(data, info) { 
      // ... Work here!
    },
 // ...
}
```


## Recursos

* [Egg Virtual Machine with OOP extensions for Windows/Linux/Mac OS](https://github.com/crguezl/oop-evm-releases/releases/tag/v1.0.0)
* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [Vídeo *Programando un bucle REPL para el lenguaje Egg*](https://youtu.be/5gIlt6r29lw)
* El módulo [@ull-esit-pl/example2test](https://www.npmjs.com/package/@ull-esit-pl/example2test)


