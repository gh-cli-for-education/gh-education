---
title: "A Hello World Translator"
published: false
date: 2022/02/21
delivery: "2022/03/03"
order: 7
layout: Practica
sidebar: auto
prev: "esprima-logging.md"
rubrica:
  - "Opciones en línea de comandos (-o, -V, -h, etc.)"
  - "Traduce correctamente las expresiones fuente a JS"
  - "Refleja la asociatividad y prioridad de operaciones correcta"
  - Se han añadido paréntesis   y funcionan correctamente
  - El <code>package.json</code> tiene scripts para ejecutar el programa
  - Ha añadido tests suficientes
  - Se hace integración Continua usando GitHub Actions
---

# A Hello World Translator

## Descripción de la Tarea

Let us consider a notation of arithmetic in which the `@` and `&` symbols on numbers are defined as the `max` and `min` operations. Thus, with this notation

$$12 @ 7=\max\{12,7\}=12$$ 

and

$$12 \& 7=\min\{12,7\}=7$$

Escriba un traductor de estas expresiones aritméticas a un programa JavaScript que las compute y las imprima.

Supondremos que el mínimo `&` tiene mas prioridad que el máximo `@`. Por ejemplo, la entrada $234 @ 325 \&  57$ debería ser traducida al siguiente código JS:

```js
console.log(Math.max(234, Math.min(325,57)))
```

Para ello 

1. Escriba un programa [Jison](/temas/syntax-analysis/analisis-LR/#introduccion-al-analisis-lr) que produzca un AST compatible Espree conteniendo el correspondiente código JS. A continuación 
2. Utilice [escodegen.generate(ast)](https://github.com/estools/escodegen) para generar el código JS

## Paréntesis

Añada paréntesis al lenguaje para que se pueda alterar la prioridad por defecto. Por ejemplo $$3\&(22@4) = 3$$ 
debería traducirse por:
   
```js
console.log(Math.min(3, Math.max(22, 4)));
```

## Pruebas

Añada [pruebas](/temas/introduccion-a-javascript/pruebas) usando [Mocha y Chai](/temas/introduccion-a-javascript/mocha) o [Jest](/temas/introduccion-a-javascript/jest)

## Continuous Integration

Añada Integración contínua usando [GitHub Actions](/temas/introduccion-a-javascript/github-actions)

## References

* See the examples in the repo [crguezl/hello-jison](https://github.com/crguezl/hello-jison)
* [https://astexplorer.net](https://astexplorer.net)
* [Tipos de Nodos del AST](/temas/introduccion-a-pl/espree-visitorkeys)
* [Espree](https://github.com/eslint/espree)
  * [Options for parse and tokenize methods](https://github.com/eslint/espree#options)
* [Escodegen repo en GitHub](https://github.com/estools/escodegen)
  - [Escodegen API Doc](https://github.com/estools/escodegen/wiki/API)
* [Análisis Sintáctico Ascendente en JavaScript](http://crguezl.github.io/pl-html/node43.html)
* [Jison](/temas/syntax-analysis/analisis-LR/#introduccion-al-analisis-lr)
* [Jison Documentation](https://gerhobbelt.github.io/jison/docs//)
* [Folder jison/examples from the Jison distribution](https://github.com/zaach/jison/tree/master/examples)
* [Jison Debugger](https://nolanlawson.github.io/jison-debugger/)
* [Precedencia y Asociatividad](http://crguezl.github.io/pl-html/node57.html)
    - [Repo de ejemplo crguezl/jison-prec](https://github.com/crguezl/jison-prec)
* [Construcción de las Tablas para el Análisis SLR](http://crguezl.github.io/pl-html/node49.html)
* [Algoritmo de Análisis LR (yacc/bison/jison)](http://crguezl.github.io/pl-html/node55.html)
* [Repo ULL-ESIT-PL-1718/jison-aSb](https://github.com/ULL-ESIT-PL-1718/jison-aSb)
* [Repo ULL-ESIT-PL-1718/ull-etsii-grado-pl-jisoncalc](https://github.com/ULL-ESIT-PL-1718/ull-etsii-grado-pl-jisoncalc)
* [Lunar Arithmetic](https://en.wikipedia.org/wiki/Lunar_arithmetic)

