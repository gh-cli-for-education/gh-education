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

Para la realización de esta práctica /repase el tema [Async Programming in JavaScript](/temas/async/).

El objetivo es escribir un programa Node.js que usando `fs.readFile` 

1. lea **en paralelo** un conjunto de ficheros pasados como argumentos en línea de comandos y 
2. produzca como salida la concatenación de los mismos en el orden especificado. 
 
No se considera una solución usar `fs.readFileSync` o timers (`setTimeout` etc.) o usar promesas. Se pide una solución usando callbacks.
Use `fs.readFile(path[, options], callback)`. 

Este sería un ejemplo de uso:

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

Ejecución:

```
$ node repeatable-option-commander.js -c a -c b -c c
[ 'a', 'b', 'c' ]
```
## Entrega

### Solución con el Módulo async-js

Lea la sección [The Async Module](/temas/async/async-js) de los apuntes y encuentre una solución usando `Async`. 

Considere la posibilidad de excepciones debidas a que alguno de los ficheros no exista. 

Si no se le ocurre una solución, puede consultar las soluciones a la pregunta [NodeJS - How to read multiple files asynchronously and write read contents to one file](https://stackoverflow.com/questions/39020704/nodejs-how-to-read-multiple-files-asynchronously-and-write-read-contents-to-on) en StackOverflow.

### Solucion sin usar el Módulo async-js

A continuación, busque  una solución para este problema sin hacer uso de `Async` ¿Cómo lo haría?
No se considera una solución usar `fs.readFileSync` o timers (`setTimeout` etc.) o usar promesas. Se pide una solución usando callbacks.

### Abstracción de la solución

Haciendo abstracción de la solución encontrada en el paso anterior escriba una función `asyncMap` que funcione como el `map` del módulo `Async` y que sirva 
para cualuier función asíncrona que siga el patrón de `callback(err, result)`:

  ```js
  asyncMap(inputs, (item, cb) => fs.readFile(item, cb), (err, contents) => { ... });
  ```

### Variante del Problema: Serial en vez de paralelo

Ahora cambiamos el problema para lea **en secuencial** el conjunto de ficheros pasados como argumentos en línea de comandos y 
produzca como salida la concatenación de los mismos en el orden especificado. Las mismas restricciones que en el caso anterior.

Provea una  función general `series` que secuencialice cualquier array de funciones asíncronas.
Debe funcionar tal como lo hace la función `series`  del módulo [Async.js](/temas/async/async-js).

Esta sería la forma de uso de la función `series`:

```js
series(program.files, (file, cb) => fs.readFile(file, cb),  function(err, results)  {
    if (err == null) {
      let file = fs.createWriteStream(program.output);
      file.on('error', err => { throw new Error("Error en la apertura del archivo " + program.output + " " + err) });
      results.forEach(i => { file.write(i + '\n'); });
      file.end();
    } else {
         throw new Error("Fallo en la lectura de los ficheros\n" + err)
    }
});
```


## Referencias

* Tema [Async Programming in JavaScript](/temas/async/)
* Sección [The Async Module](/temas/async/async-js) de estos apuntes
* El manual del módulo async: <https://caolan.github.io/async/v3/>
* Pregunta [NodeJS - How to read multiple files asynchronously and write read contents to one file](https://stackoverflow.com/questions/39020704/nodejs-how-to-read-multiple-files-asynchronously-and-write-read-contents-to-on) en StackOverflow
