---
title: "ast-types"
permalink: /practicas/ast-types
published: true
date: 2022/02/24
delivery: "2022/03/17"
order: 9
layout: Practica
prev: npm-module.md
sidebar: auto
rubrica: 
  - El paquete está publicado en npmjs con ámbito <code>aluXXX</code>
  - Contiene un ejecutable que se ejecuta correctamente (<code>--help</code>, etc.)
  - The folding has been extended for Array Membership literal nodes 
  - El módulo exporta las funciones adecuadas
  - Contiene suficientes tests 
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Los informes están bien presentados (informe en el superrepo)
  - "La documentación es completa: API, ejecutable, instalación, etc." 
  - "Opcional: publicar la documentación de la API usando GitHub Pages en la carpeta <code>docs/</code>"
  - 
    - Las <i>pruebas de producción</i> funcionan bien
    - Probar que la librería está accesible y funciona 
    - Probar que el ejecutable queda correctamente instalado, puede ser ejecutado con el nombre publicado y produce salidas correctas
  - El superproyecto está correctamente estructurado usando submódulos
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {{ $frontmatter.title }}

## Objetivos

Construya un paquete npm y 
publíquelo en [npmjs](https://www.npmjs.com/) con ámbito `@aluXXX` y con nombre `spread-2-es5` 

El módulo además de exportar la función `spread` provee un ejecutable `spread` que se llama así:

```
spread input.js output.js
```

el cual realiza [una traducción del operador es6 `...` a versiones anteriores de JS](/temas/introduccion-a-pl/master-the-art-of-the-ast.html#translating-the-es6-spread-operator-to-es5) sobre `input.js` dejando la salida en `output.js`.

Una parte de los conceptos y habilidades a adquirir con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). Léala con detenimiento antes de hacer esta práctica. 

## Ámbitos

Deberá publicar el paquete en [npmjs](https://www.npmjs.com/) con ámbito `@aluXXX` y con nombre `constant-folding`.

Para saber sobre ámbitos, vea la sección [Scopes and Registries](/temas/introduccion-a-javascript/creating-and-publishing-npm-module#scopes-and-registries).

## Pruebas

Deberá añadir pruebas usando [Mocha y Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) o [Jest](/temas/introduccion-a-javascript/jest).
Repase las secciones [Testing with Mocha and Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) y [Jest](/temas/introduccion-a-javascript/jest).

## Documentación

[Documente](/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md` y la documentación de la función exportada usando [JsDoc](/temas/introduccion-a-javascript/documentation.html).
Repase la sección [Documenting the JavaScript Sources](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#documenting-the-javascript-sources)

## Pruebas de Producción

En el repo asignado `testing-constant-folding-aluXXX` añada las pruebas necesarias
para comprobar que la última versión del paquete publicado se instala y puede ser usado.
Repase la sección [Testing in Production](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-in-production)

## Superproject with Git Submodule

Usando `git submodule` configure como super-project el repo asignado `super-constant-folding-aluXXX` para que contenga
a a los dos repos: en el que ha desarrollado el módulo npm `constant-folding-aluXXX` y el repo para las pruebas en tiempo de producción `testing-constant-folding-aluXXX`.

El informe de la práctica `README.md` se hace en este repo.

Repase la sección [Making a Project with the two repos: git submodule](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#making-a-project-with-the-two-repos-git-submodule)

## Challenge: Spread in array literals

With spread syntax it is easy to create a new array using an existing array:

```js
let parts = ['shoulders', 'knees'];
let lyrics = ['head', ...parts, 'and', 'toes'];
//  ["head", "shoulders", "knees", "and", "toes"]
```
This can be done in former versions of JS using concat:

```js
lyrics = [].concat('head', parts, ['and'], ['toes'])
``` 

Here is a simpler example:

```js
let arr = [1, 2, 3];
let arr2 = [...arr];       // makes a copy of arr
let arr3 = [].concat(arr); // makes a copy of arr
``` 

Extend your translator to consider only the last case: spread operator on an array `[...b]`
(feel free to consider the general case if you have time).

Publish it and update the version following the
[Semantic Versioning](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#semantic-versioning)
rules.

## References

### Constant Folding

* [Transformación de plegado de constantes](/temas/introduccion-a-pl/master-the-art-of-the-ast.html#constant-folding) en estos apuntes
* Babel plugin [minify-constant-folding](https://github.com/babel/minify/tree/master/packages/babel-plugin-minify-constant-folding)

### Packages

* [Creating and Publishing a node.js Module in GitHub and NPM Registries](/temas/introduccion-a-javascript/creating-and-publishing-npm-module)
* [Módulos](/temas/introduccion-a-javascript/modulos)
* [Node.js Packages](/temas/introduccion-a-javascript/nodejspackages)
* [Instalación de Módulos desde GitHub](/temas/introduccion-a-javascript/nodejspackages.html#instalaci%C3%B3n-desde-github)
* [Introducción a los Módulos en JS](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/) por Manz
* [@ull-esit-dsi-1617/scapegoat](https://www.npmjs.com/package/@ull-esit-dsi-1617/scapegoat) en npm
* [How to install an npm package from GitHub directly?](https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly) in StackOverflow
* [Working with scoped packages](https://docs.npmjs.com/getting-started/scoped-packages)
* [npm-scope manual: Scoped packages](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)
* [Package.json documentation en npm site](https://docs.npmjs.com/files/package.json)

### Testing and Documentation

* [Jest](/temas/introduccion-a-javascript/jest)
* [Mocha](/temas/introduccion-a-javascript/mocha)
* [Documentation](/temas/introduccion-a-javascript/documentation)

### Semantic versioning and npm

* [Semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning)
* [Semantic Versioning: Why You Should Be Using it](https://www.sitepoint.com/semantic-versioning-why-you-should-using/) SitePoint
* [YouTube Video: Semantic versioning and npm](https://youtu.be/kK4Meix58R4)
* [El comando npm version](https://docs.npmjs.com/cli/version)
