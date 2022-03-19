---
title: "egg-parser"
published: true
date: 2022/03/18
delivery: "2022/03/24"
order: 10
layout: Practica
prev: ast-types.md
sidebar: true
template: "https://github.com/crguezl/egg-parser-template"
rubrica: 
  - El paquete está publicado en GitHub Registry con el ámbito de la organización
  - Contiene un ejecutable que se ejecuta correctamente (<code>--help</code>, etc.)
  - The <code>parser</code> builds the correct ASTs for the Egg language for a sufficient number of examples
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

* `parseFromFile(inputFile)` es una función que devuelve el AST construído a partir de los contenidos del programa en lenguaje Egg contenido en el fichero con nombre `inputFile`

La gramática del lenguaje Egg se describe en la sección [Gramáticas Independientes del Contexto](/temas/syntax-analysis/teoria.html#gramaticas-independientes-del-contexto).

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

Nuestro parser deberà por tanto producir un AST conforme a la especificación dada en la sección [Anatomía de los AST para Egg](/temas/syntax-analysis/ast.html#anatomia-de-los-ast-para-egg). Esto es, deberá estar conforme a esta gramática árbol:

```
ast: VALUE{value}
   | WORD{name} 
   | APPLY( operator:WORD args:( ast * ))
```

Los `APPLY` tienen dos atributos `operator` y `args`. `args` es un ARRAY con tantos elementos como argumentos admite el `operator`. Los nodos `WORD` son nodos hoja y tienen al menos el atributo `name`. 
Los nodos `VALUE` tienen al menos el atributo `value`.

Por ejemplo, el AST para `+(a,*(4,5))` se podría describir mediante este término: 

```ruby
APPLY(
  operator: WORD{name: +},
  args: [
    WORD{name: a}, 
    APPLY(
      operator: WORD{name:*}, 
      args: [VALUE{value:4}, VALUE{value:5}]
    )
   ]
)
``` 

El ejecutable ` bin/eggc.js` deberá producir un fichero JSON con el ast:

```
✗ bin/eggc.js test/examples/array.egg -o test/ast/array.json
```

Puede ver los contenidos del ast para el ejemplo [test/examples/array.egg](https://github.com/ULL-ESIT-PL-1617/egg/blob/539ddbc8f63d51641626dc03395796e3c01c2789/examples/array.egg) haciendo click sobre este enlace:

[➜  prefix-lang git:(master) ✗ cat test/ast/array.json](/temas/syntax-analysis/earley/array-json)

A continuación podemos usar el ejecutable `evm` para interpretar el árbol:

```
➜  prefix-lang git:(master) ✗ npx evm test/ast/array.json
[ 1, 4 ]
5
```

Observe que puesto que el paquete ["@crguezl/eloquentjsegg"](https://www.npmjs.com/package/@crguezl/eloquentjsegg) ha sido instalado localmente, necesitamos hacer uso de [npx](https://www.npmjs.com/package/npx) para ejecutar el intérprete `evm`.

::: tip
`npx <command>[@version] [command-arg]...` executes `<command>` either from a local `node_modules/.bin`, or from a central cache (usually in `~/.npm/cacache`), installing any packages needed in order for `<command>` to run. By default, `npx` will check whether `<command>` exists in `$PATH`, or in the local project binaries, and execute that. If `<command>` is not found, it will be installed prior to execution.
::: 

En el directorio `node_modules/@crguezl/eloquentjsegg/examples` tiene algunos ejemplos de programas egg  que puede usar para comprobar el buen funcionamiento de su parser:

```
➜  prefix-lang git:(master) ✗ ls  node_modules/@crguezl/eloquentjsegg/examples 
array.egg       greater-x-5.egg main2.js        one.egg         sum.egg         unbalanced.egg
expcomma.egg    if.egg          one-err-2.egg   scope.egg       sum.egg.evm
fun.egg         main.js         one-err.egg     string.egg      two.egg
```

::: danger Nota de Advertencia

En algunos de los ejemplos, vídeos, repos, etc. que acompañan esta práctica puede notar algunas 
inconsistencias en el lenguaje Egg debidas a que casi en cada curso hemos ido haciendo alias de algunos de los nombres de los constructos. Por ejemplo, a veces  en un vídeo en vez de `fun` usamos `->` y en algún ejemplo en los apuntes en vez de `element` se usa `<-`, etc. También en algún ejemplo aparecen llavitas `{` y `}` en vez de paréntesis (de nuevo una llave aquí es un alias del correspondiente paréntesis). Son cambios triviales que no deberían afectar a la comprensión del texto.
:::

## Publicación del módulo 

Una parte de los conceptos y habilidades a adquirir con esta práctica se explican en la sección [Creating and publishing a node.js module en GitHub y en NPM](/temas/introduccion-a-javascript/creating-and-publishing-npm-module). Léala con detenimiento antes de hacer esta práctica. 

## Pruebas

Deberá añadir pruebas usando [Mocha y Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) o [Jest](/temas/introduccion-a-javascript/jest).
Repase las secciones [Testing with Mocha and Chai](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#testing-with-mocha-and-chai) y [Jest](/temas/introduccion-a-javascript/jest).

Añada un estudio de covering. See the notes in [covering](/temas/introduccion-a-javascript/covering). 

Añada CI con GitHub Actions.

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
    title: 'Lab egg-parser Report',
    base: '/egg-parser-casiano-rodriguez-leon-alumno5/',
    ...
  }
  ```
- Añada un fichero con nombre [`.nojekyll`](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/) en su directorio `docs/`.

La documentación de la API de la función exportada usando [JsDoc](/temas/introduccion-a-javascript/documentation.html) la puede dejar accesible en el despliegue (directorio `docs/api`) o puede tratar de integrarla con [Vuepress JsDoc Plugin](https://vuepress-jsdoc-example.vercel.app/code/). 

Añada el informe de Covering también (directorio `docs/covering` o similar).


## Challenge

* Asegúrese de producir mensajes de error significativos informando de los números de línea y columna correctos

## References

### Nearley.js 

* [Repo ULL-ESIT-PL/learning-nearley](https://github.com/ULL-ESIT-PL/learning-nearley/)
* [Nearley.JS Home Page](https://nearley.js.org/)

### moo

* [Tokenizers for nearley.js](https://nearley.js.org/docs/tokenizers)
* [moo-ignore](https://www.npmjs.com/package/moo-ignore)
* [moo](https://www.npmjs.com/package/moo/)

### Testing 

* [Mocha](/temas/introduccion-a-javascript/mocha)
* [Jest](/temas/introduccion-a-javascript/jest)

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

