---
title: "Promise readfile"
published: true
date: "2022/10/31 02"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=784"
delivery: "2022/11/03"
key: promise-readfile
layout: Practica
order: 9
prev: race-condition.md
next: promise-all.md
rubrica:
  - "código correcto"
  - "Informe bien elaborado"
---


# {{ $frontmatter.title }}

Escriba un programa `index.js` que provee una versión con promesas  `readFilePromise` de la función [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback) que pueda ser usada así:

```js
readFilePromise(programName, 'utf8')
  .then(data => console.log('Data:\n'+data))
  .catch(error => console.log('Error:\n'+error));
```

Once you have written your solution you can test it with

```
➜  readfilepromise-solution git:(master) ✗ npm test

> ../src/readfilepromise@1.0.0 test
> node test/test.mjs

Data:
Prueba de lectura
```
