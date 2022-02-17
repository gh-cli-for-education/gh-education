---
title: "Lunar to JS"
published: false
date: 2022/02/21
delivery: "2022/03/03"
order: 7
layout: Practica
prev: "esprima-logging.md"
rubrica:
  - "Opciones en línea de comandos (-o, -V, -h, etc.)"
  - "Traduce correctamente de lunar a JS"
  - "Refleja la asociatividad y prioridad de operaciones correcta"
  - Da información correcta de los números de línea
  - El <code>package.json</code> tiene scripts para ejecutar el programa
---

# Práctica {{ $frontmatter.title }}

## Descripción de la Tarea

[Lunar Arithmetic](https://en.wikipedia.org/wiki/Lunar_arithmetic),  is a version of arithmetic in which the addition and multiplication operations on numbers are defined as the `max` and `min` operations. Thus, in lunar arithmetic,

$$2+7=\max\{2,7\}=7$$ y $$2*7=\min\{2,7\}=2$$

Escriba un traductor de expresiones aritméticas lunares a un programa JavaScript.
Por ejemplo, la entrada `2 + 3 * 5` debería ser traducida al siguiente código JS:

```js
console.log(Math.max(2, Math.min(3,5)))
```

Para ello 

1. Escriba un programa Jison que produzca un AST Espree conteniendo el correspondiente código JS. A continuación 
2. Utilice [escodegen.generate(ast)](https://github.com/estools/escodegen) para generar el código JS. 

## References

* [Lunar Arithmetic](https://en.wikipedia.org/wiki/Lunar_arithmetic)
* See the examples in the repo [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
* [Tipos de Nodos del AST](/temas/introduccion-a-pl/espree-visitorkeys)
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* [Escodegen repo en GitHub](https://github.com/estools/escodegen)
  - [Escodegen API Doc](https://github.com/estools/escodegen/wiki/API)
* [Análisis Sintáctico Ascendente en JavaScript](http://crguezl.github.io/pl-html/node43.html)
* [Jison Documentation](https://gerhobbelt.github.io/jison/docs//)
* [Folder jison/examples from the Jison distribution](https://github.com/zaach/jison/tree/master/examples)
* [Jison Debugger](https://nolanlawson.github.io/jison-debugger/)
* [Precedencia y Asociatividad](http://crguezl.github.io/pl-html/node57.html)
    - [Repo de ejemplo crguezl/jison-prec](https://github.com/crguezl/jison-prec)
* [Construcción de las Tablas para el Análisis SLR](http://crguezl.github.io/pl-html/node49.html)
* [Algoritmo de Análisis LR (yacc/bison/jison)](http://crguezl.github.io/pl-html/node55.html)
* [Repo ULL-ESIT-PL-1718/jison-aSb](https://github.com/ULL-ESIT-PL-1718/jison-aSb)
* [Repo ULL-ESIT-PL-1718/ull-etsii-grado-pl-jisoncalc](https://github.com/ULL-ESIT-PL-1718/ull-etsii-grado-pl-jisoncalc)
