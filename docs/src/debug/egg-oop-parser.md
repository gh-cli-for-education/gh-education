---
title: "Adding OOP to the Egg Parser"
key: egg-oop-parser
published: true
date: 2022/04/12
delivery: "2022/04/28"
permalink: /practicas/egg-oop-parser/
order: 13
layout: Practica
prev: lexer-interpreter.md
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
  - "Currying works <code>4[\"+\", 5](3)</code>"
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
## Modificaciones en el módulo de Generación de Analizadores Léxicos

Para facilitar la labor de hacer esta práctica es conveniente que volvamos al módulo [egg-parser](/practicas/egg-parser.html) y modifiquemos un poco su API para la fabricación del intérprete que vamos a construir.




## AST Classes and AST Interpretation



## Fundamentos

Esta es la segunda de una serie de prácticas sobre el lenguaje **Egg**.
Lea el capítulo 12 "*A Programming Language*" del libro EJS:

* [Eloquent JS. Chapter 12. Project: A Programming Language](http://eloquentjavascript.net/12_language.html)

Salte la sección **Parsing** de ese capítulo y pase directamente a la sección **The Evaluator**.

## Recursos

* Puede encontrar una solución a algunos de los problemas planteados en esta práctica en la rama `master` de este repo [ULL-ESIT-PL-1617/egg](https://github.com/ULL-ESIT-PL-1617/egg). 
* También puede encontrarlo como módulo en npm [@crguezl/eloquentjsegg](https://www.npmjs.com/package/@crguezl/eloquentjsegg) 
* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)
* [El lenguaje egg: repo en GitHub](https://github.com/ULL-ESIT-PL-1617/egg). Contiene una solución a los  [problemas de separar el analizador léxico del sintáctico](#lexsep) así como al de [separar los códigos y los tres ejecutables](#separe). También tiene ejemplos de pruebas en Mocha y Chai
* [NodeJS Readline gist](https://gist.github.com/crguezl/430642e29a2b9293317320d0d1759387): un sencillo gist que te enseña a usar `readline` para hacer un bucle interactivo. Quizá conviene que lo leas cuando llegues a la sección del [problema del REPL](#repl)
* En el repo [ULL-ESIT-PL-1617/interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg) se muestra como hacer un bucle REPL
* [Vídeo *Programando un bucle REPL para el lenguaje Egg*](https://youtu.be/5gIlt6r29lw)
* [XRegExp](http://xregexp.com/)
* El módulo [@ull-esit-pl/example2test](https://www.npmjs.com/package/@ull-esit-pl/example2test)
* Tests. Mocking and Stubbing
    * [Sinon API](http://sinonjs.org/releases/v1.17.7/)
    * [Side effects of stubbing console in tests](https://gyandeeps.com/console-stubbing/)
    * [Unit Test like a Secret Agent with Sinon.js](http://elijahmanor.com/unit-test-like-a-secret-agent-with-sinon-js/) by Elijah Manor
* VSCode Extension Egg Tools: [Adds syntax highlighting and code snippets for the Egg language by EloquentJS](https://marketplace.visualstudio.com/items?itemName=jasonhaxstuff.egg-tools)


