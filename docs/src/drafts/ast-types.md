---
title: "ast-types"
permalink: /practicas/ast-types
published: true
date: 2022/02/24
delivery: "2022/03/17"
order: 9
layout: Practica
prev: 
sidebar: auto
rubrica: 
  - El paquete está publicado en gitHub Registry con el ámbito de la organización
  - Contiene un ejecutable que se ejecuta correctamente (<code>--help</code>, etc.)
  - The <code>spread</code> has been extended for SpreadElements inside an ArrayExpression 
  - El módulo exporta las funciones adecuadas
  - Contiene tests 
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Módulo bien documentado 
  - Informe hecho con Vuepress desplegado
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {{ $frontmatter.title }}

## Objetivos

Construya un paquete npm y 
publíquelo en [GitHub Registry](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#what-is-github-registry) con ámbito `@ULL-ESIT-PL-2122` y nombre el nombre del repo asignado.

El módulo además de exportar la función `spread` provee un ejecutable `spread` que se llama así:

```
spread input.js output.js
```

el cual realiza [una traducción del operador es6 `...` a versiones anteriores de JS](/temas/introduccion-a-pl/master-the-art-of-the-ast.html#translating-the-es6-spread-operator-to-es5) sobre `input.js` dejando la salida en `output.js`. Tiene una solución en la sección [Translating the ES6 spread operator ... to ES5](/temas/introduccion-a-pl/master-the-art-of-the-ast.html#translating-the-es6-spread-operator-to-es5) de estos apuntes.

Una parte de los conceptos y habilidades a adquirir con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). Léala con detenimiento antes de hacer esta práctica. 

## Pruebas

Deberá añadir pruebas usando [Mocha y Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) o [Jest](/temas/introduccion-a-javascript/jest).
Repase las secciones [Testing with Mocha and Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) y [Jest](/temas/introduccion-a-javascript/jest). Añada un estudio de covering. See the notes in [covering](/temas/introduccion-a-javascript/covering). Añada CI con GitHub Actions.

## Informe y Documentación

[Documente](/temas/introduccion-a-javascript/documentation)
el módulo incorporando un `README.md`: Como se instala, como se usa el ejecutable, como se carga la librería, etc.

Use GitHub Pages en el directorio `docs`.

No haga el informe de la práctica en el `README.md`  sino que utilice el generador estático [Vuepress](https://vuepress.vuejs.org/guide/) para hacer el informe.

Para el [despliegue](https://vuepress.vuejs.org/guide/deploy.html#deploying) del informe puede 

- mover los ficheros generados por VuePress del directorio `src/.vuepress/dist/` 
al directorio `docs/`).
- Recuerde poner `base` en su Vuepress `config.js` con el nombre de su repo. Algo así:

  ```js
  module.exports = {
    title: 'Lab ast-types Report',
    base: '/ast-types-casiano-rodriguez-leon-alumno5/',
    ...
  }
  ```
- Añada un fichero con nombre [`.nojekyll`](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) en su directorio `docs/`.

La documentación de la API de la función exportada usando [JsDoc](/temas/introduccion-a-javascript/documentation.html) la puede dejar accesible en el despliegue (directorio `docs/api`) o puede tratar de integrarla con [Vuepress JsDoc Plugin](https://vuepress-jsdoc-example.vercel.app/code/). 

Añada el informe de Covering también (directorio `docs/covering` o similar).


## Challenge: SpreadElements inside an ArrayExpression

With ES6 spread syntax it is easy to create a new array using an existing array:

```js
let parts = ['shoulders', 'knees'];
let lyrics = ['head', ...parts, 'and', 'toes'];
//  ["head", "shoulders", "knees", "and", "toes"]
```

The same can be done in former versions of JS using `Array.concat`:

```js
> parts = ['shoulders', 'knees'];
> lyrics = [].concat(['head'], parts, ['and'], ['toes'])
[ 'head', 'shoulders', 'knees', 'and', 'toes' ] // makes a shallow copy of parts
> lyrics = ['head'].concat(parts).concat(['and', 'toes']) // same
``` 

But can be achieved with other strategies.

Extend your translator to cover this use of the spread operator inside an `ArrayExpression`.

Publish it and update the version following the
[Semantic Versioning](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#semantic-versioning)
rules.

## References

### ast-types

* [ast-types in this notes](/temas/introduccion-a-pl/master-the-art-of-the-ast.html#ast-types)
* [ast-types examples in crguezl/hello-ast-types](https://github.com/crguezl/hello-ast-types)

### Packages

* [Creating and Publishing a node.js Module in GitHub and NPM Registries](/temas/introduccion-a-javascript/creating-and-publishing-npm-module)
* [Módulos](/temas/introduccion-a-javascript/modulos)
* [Node.js docs. Modules: ECMAScript modules](https://nodejs.org/api/esm.html#introduction)
* [Node.js Packages](/temas/introduccion-a-javascript/nodejspackages)
* [Instalación de Módulos desde GitHub](/temas/introduccion-a-javascript/nodejspackages.html#instalaci%C3%B3n-desde-github)
* [Introducción a los Módulos en JS](https://lenguajejs.com/automatizadores/introduccion/commonjs-vs-es-modules/) por Manz
* [@ull-esit-dsi-1617/scapegoat](https://www.npmjs.com/package/@ull-esit-dsi-1617/scapegoat) en npm
* [How to install an npm package from GitHub directly?](https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly) in StackOverflow
* [Working with scoped packages](https://docs.npmjs.com/getting-started/scoped-packages)
* [npm-scope manual: Scoped packages](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)
* [Package.json documentation en npm site](https://docs.npmjs.com/files/package.json)

### Testing 

* [Jest](/temas/introduccion-a-javascript/jest)
* [Mocha](/temas/introduccion-a-javascript/mocha)

### Documentation

* [Vuepress](https://vuepress.vuejs.org/guide/)
  * [Deployment](https://vuepress.vuejs.org/guide/deploy.html#deploying)
  * [Vuepress JsDoc Plugin](https://vuepress-jsdoc-example.vercel.app/code/)
  * [jsdoc2vuepress](https://www.npmjs.com/package/jsdoc2vuepress)
  * [Vuepress Autodoc Plugin](https://bprinty.github.io/vuepress-plugin-autodoc/#overview)
* [.nojekyll](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) Bypassing Jekyll on GitHub Pages
* [JSDoc and others](/temas/introduccion-a-javascript/documentation) in this notes

### Semantic versioning and npm

* [Semantic versioning and npm](https://docs.npmjs.com/getting-started/semantic-versioning)
* [Semantic Versioning: Why You Should Be Using it](https://www.sitepoint.com/semantic-versioning-why-you-should-using/) SitePoint
* [YouTube Video: Semantic versioning and npm](https://youtu.be/kK4Meix58R4)
* [El comando npm version](https://docs.npmjs.com/cli/version)
