---
title: Async map
published: true
date: "2022/10/10 02"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=781"
delivery: "2022/11/03"
key: asyncmap
layout: Practica
order: 7
prev: intro2sd.md
next: 
rubrica:
  - "Código de la práctica correcto"
  - "Informe bien elaborado"
---

# {{ $frontmatter.title }}


## Descripción de la Práctica 

Para la realización de esta práctica estudie el tema [Async Programming in JavaScript](/temas/async/).

El objetivo es escribir un programa Node.js que usando `fs.readFile` 

1. lea **en paralelo** un conjunto de ficheros pasados como argumentos en línea de comandos y 
2. produzca como salida la concatenación de los mismos en el orden especificado. 
 
Evite usar `fs.readFileSync` y use `fs.readFile(path[, options], callback)`. 

Este sería un ejempplo de uso:

```
$ concat -f one.txt -f two.txt -f three.txt -o salida.txt
```

## commander

Con [commander](https://www.npmjs.com/package/commander?activeTab=readme) es posible indicar una opción que se puede repetir

```js
const program = require('commander');
function collect(value, previous) {
  return previous.concat([value]);
}
program.option('-c, --collect <value>', 'repeatable value', collect, []);
program.parse(process.argv);
console.log(program.collect)
```

```
$ node repeatable-option-commander.js -c a -c b -c c
[ 'a', 'b', 'c' ]
```
## Requisitos

1. Lea la sección [The Async Module](/temas/async/async-js) de los apuntes y encuentre una solución usando `Async`. Considere la posibilidad de excepciones debidas a que alguno de los ficheros no exista
3. Encuentre  una solución sin hacer uso de `Async` ¿Cómo lo haría?
4. Haciendo abstracción de la solución encontrada en el paso anterior escriba una función `asyncMap` que funcione como el `map` del módulo `Async`:

  ```js
  asyncMap(inputs, (item, cb) => fs.readFile(item, cb), (err, contents) => { ... });
  ```

## Versiones usadas en este texto

Versiones usadas de los módulos en los ejemplos:

```
➜  daniel-alu0101040882 git:(main) ✗ jq '.dependencies' package.json 
```

```json
{
  "async": "^3.2.0",
  "commander": "^6.2.0"
}
```

## Referencias

* Tema [Async Programming in JavaScript](/temas/async/)
* Sección [The Async Module](/temas/async/async-js)
* <https://caolan.github.io/async/v3/>
