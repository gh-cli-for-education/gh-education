---
title: "egg-parser"
published: true
date: 2022/03/18
delivery: "2022/03/24"
order: 10
layout: Practica
prev: ast-types.md
sidebar: true
rubrica: 
  - El paquete está publicado en gitHub Registry con el ámbito de la organización
  - Contiene un ejecutable que se ejecuta correctamente (<code>--help</code>, etc.)
  - The <code>parse</code> builds the correct ASTs for the Egg language for a sufficient number of examples
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

El módulo  exportará un objeto con al menos la propiedad `{ parseFromfile }`. 

* `parseFromFile(inputFile)` es una función que devuelve el AST construído a partir de los contenidos del programa `inputFile`

Se deberá proveer un ejecutable `eggc` con una interfaz como esta:

```
➜  prefix-lang git:(master) ✗ bin/eggc.js -h
Usage: eggc [options] <origin>

Compile a Egg lang file

Arguments:
  origin                   The path of the file to compile

Options:
  -V, --version            output the version number
  -o, --out <destination>  Path for output file. If it isn't specified the path of the origin file will be
                           used,changing the extension to .json
  -h, --help               display help for command
```

Puede usar el ejecutable `evm` (las siglas corresponden a Egg virtual Machine) del paquete ["@crguezl/eloquentjsegg"](https://www.npmjs.com/package/@crguezl/eloquentjsegg) para comprobar que los ASTs generados funcionan. 

Sigue un ejemplo (compatible ["@crguezl/eloquentjsegg"](https://www.npmjs.com/package/@crguezl/eloquentjsegg) versión 1.2.6) de como debería funcionar nuestro parser `eggc`:

```ruby
➜  prefix-lang git:(master) ✗ cat test/examples/array.egg 
do(
  def(x, arr(arr(1,4),5,7)),
  print([](x,0)), # [1,4]
  print([](x,1))  # 5
)
```

Nuestro parser deberà producir un AST conforme a la especificación dada en la sección [Anatomía de los AST para Egg](/temas/syntax-analysis/ast.html#anatomia-de-los-ast-para-egg)

```
➜  prefix-lang git:(master) ✗ bin/eggc.js test/examples/array.egg -o test/ast/array.json
```

Algo como esto:

```json
➜  prefix-lang git:(master) ✗ cat test/ast/array.json
{
  "type": "apply",
  "operator": {
    "type": "word",
    "offset": 0,
    "lineBreaks": 0,
    "line": 1,
    "col": 1,
    "name": "do"
  },
  "args": [
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "offset": 6,
        "lineBreaks": 0,
        "line": 2,
        "col": 3,
        "name": "def"
      },
      "args": [
        {
          "type": "word",
          "offset": 10,
          "lineBreaks": 0,
          "line": 2,
          "col": 7,
          "name": "x"
        },
        {
          "type": "apply",
          "operator": {
            "type": "word",
            "offset": 13,
            "lineBreaks": 0,
            "line": 2,
            "col": 10,
            "name": "arr"
          },
          "args": [
            {
              "type": "apply",
              "operator": {
                "type": "word",
                "offset": 17,
                "lineBreaks": 0,
                "line": 2,
                "col": 14,
                "name": "arr"
              },
              "args": [
                {
                  "type": "value",
                  "value": 1,
                  "raw": "1"
                },
                {
                  "type": "value",
                  "value": 4,
                  "raw": "4"
                }
              ]
            },
            {
              "type": "value",
              "value": 5,
              "raw": "5"
            },
            {
              "type": "value",
              "value": 7,
              "raw": "7"
            }
          ]
        }
      ]
    },
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "offset": 35,
        "lineBreaks": 0,
        "line": 3,
        "col": 3,
        "name": "print"
      },
      "args": [
        {
          "type": "apply",
          "operator": {
            "type": "word",
            "offset": 41,
            "lineBreaks": 0,
            "line": 3,
            "col": 9,
            "name": "[]"
          },
          "args": [
            {
              "type": "word",
              "offset": 44,
              "lineBreaks": 0,
              "line": 3,
              "col": 12,
              "name": "x"
            },
            {
              "type": "value",
              "value": 0,
              "raw": "0"
            }
          ]
        }
      ]
    },
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "offset": 61,
        "lineBreaks": 0,
        "line": 4,
        "col": 3,
        "name": "print"
      },
      "args": [
        {
          "type": "apply",
          "operator": {
            "type": "word",
            "offset": 67,
            "lineBreaks": 0,
            "line": 4,
            "col": 9,
            "name": "[]"
          },
          "args": [
            {
              "type": "word",
              "offset": 70,
              "lineBreaks": 0,
              "line": 4,
              "col": 12,
              "name": "x"
            },
            {
              "type": "value",
              "value": 1,
              "raw": "1"
            }
          ]
        }
      ]
    }
  ]
}
```

A continuación podemos usar el ejecutable `evm` para interpretar el árbol:

```
➜  prefix-lang git:(master) ✗ npx evm test/ast/array.json
[ 1, 4 ]
5
```

en el directorio `node_modules/@crguezl/eloquentjsegg/examples` tiene algunos ejemplos de programas egg  que puede usar para comprobar el buen funcionamiento de su parser:

```
➜  prefix-lang git:(master) ✗ ls  node_modules/@crguezl/eloquentjsegg/examples 
array.egg       greater-x-5.egg main2.js        one.egg         sum.egg         unbalanced.egg
expcomma.egg    if.egg          one-err-2.egg   scope.egg       sum.egg.evm
fun.egg         main.js         one-err.egg     string.egg      two.egg
```


## Publicación del módulo 

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

### ASTs Anatomy

* [Esprima AST syntax and format](https://docs.esprima.org/en/latest/syntax-tree-format.html)
* [The ESTree Spec](https://github.com/estree/estree)
  * [es2015](https://github.com/estree/estree/blob/master/es2015.md)


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
