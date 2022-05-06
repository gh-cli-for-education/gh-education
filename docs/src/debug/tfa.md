---
title: "TFA: Final Project PL"
categories: ["temas", "practicas"]
permalink: /tfa
sidebar: auto
---

## Introduction

* Any proposal related to what is seen in the course is welcome. Check with the teacher.
* The ideas proposed here are to extend the [Egg] language(https://github.com/ULL-ESIT-PL-1819/egg)
but you can propose a TFA with another topic related to PL.
* An idea may be to extend Egg with a DSL with functionalities to facilitate the resolution of problems in a specific context that is of interest to the student. See the sections [Strategy Pattern](#strategy-pattern-use) and [Egg extensions via *use*](#egg-via-use-extensions)


<!--
### Making Egg to wait for Async Operations

Una manera de simplificar todo el manejo de la asincronía en Egg
es modificar la forma en la que todo se evalúa: Cambiar  los métodos
`evaluate` para que sean funciones `async` y se haga un `await` en todas 
las llamadas a las evaluaciones (como una versión `asyncAwaitEvaluate` del `evaluate` que ya hemos visto). 

Vea como reescribimos nuestro anterior ejemplo de `fetch`:

```
[~/.../src/egg(async)]$ pwd -P
/Users/casiano/local/src/javascript/PLgrado/eloquentjsegg
[~/.../PLgrado/eloquentjsegg(async)]$ cat examples/fetch-2.egg
```
```ruby
do{
  :=(res, fetch("https://api.github.com/users/github")),
  :=(json, res.json()),
  print(json)
}
```

Veamos el resultado de una ejecución:

```
[~/.../PLgrado/eloquentjsegg(async)]$ bin/egg.js examples/fetch.egg
```
```js
{
  login: 'github',
  id: 9919,
  node_id: 'MDEyOk9yZ2FuaXphdGlvbjk5MTk=',
  avatar_url: 'https://avatars1.githubusercontent.com/u/9919?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/github',
  ...
  created_at: '2008-05-11T04:37:31Z',
  updated_at: '2020-02-07T13:08:07Z'
}
```
-->
  
## Async and Await en Egg

### Introduction to Asynchronous Programming in Egg

#### Promises in Egg

At this point the Egg machine can handle promises as
that it is possible in Egg to call the methods of JavaScript objects
and promises are nothing but JS Objects.

Suppose we extend Egg with a `fetch` object that implements the JS fetch API:

```js
topEnv['fetch'] = require('node-fetch');
```

In versions higher than 17 `fetch` is part of the Node.js core as an ESM module.

We can immediately write Egg programs like this:

```
[~/.../egg/crguezl-egg(private2019)]$ cat examples/fetch.egg
```
```js
➜  egg-oop-parser-solution git:(master) ✗ cat examples/fetch.egg 
(
  fetch("https://api.github.com/users/github")
    .then(->(res, res.json()))
    .then(->( json, 
      print(json)
    ))
) 
```

Al ejecutarlo obtenemos:

```js
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/fetch
{"login":"github","id":9919,"node_id":"MDEyOk9yZ2FuaXphdGlvbjk5MTk=","avatar_url":"https://avatars.githubusercontent.com/u/9919?v=4","gravatar_id":"","url":"https://api.github.com/users/github","html_url":"https://github.com/github","followers_url":"https://api.github.com/users/github/followers","following_url":"https://api.github.com/users/github/following{/other_user}","gists_url":"https://api.github.com/users/github/gists{/gist_id}","starred_url":"https://api.github.com/users/github/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/github/subscriptions","organizations_url":"https://api.github.com/users/github/orgs","repos_url":"https://api.github.com/users/github/repos","events_url":"https://api.github.com/users/github/events{/privacy}","received_events_url":"https://api.github.com/users/github/received_events","type":"Organization","site_admin":false,"name":"GitHub","company":null,"blog":"https://github.com/about","location":"San Francisco, CA","email":null,"hireable":null,"bio":"How people build software.","twitter_username":null,"public_repos":410,"public_gists":0,"followers":0,"following":0,"created_at":"2008-05-11T04:37:31Z","updated_at":"2022-04-08T10:02:08Z"}
```

#### Callbacks en Egg

Veamos un ejemplo de asíncronía en Egg con callbacks.
Extendamos Egg con un objeto que provee acceso al sistema de
archivos:

```js
topEnv['fs'] = require('fs');
```

Me he encontrado con algunos problemas cuando probé a escribir este programa:

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/fs.egg 
do (
  fs.readFile("examples/no-existe.egg", "utf8", 
    fun(err, data, 
      if(==(err, null), print(data), print(err))
    )),
  fs.readFile("examples/fs.egg", "utf8", 
    fun(err, data, 
      if(==(err, null), print(data), print(err))
    ) # end fun
  ) # end fs.readFile
)
```

The problem is that JS calls the callback
with a single argument `err` when an error occurs and with two
`(err, data)` when the operation succeeds.

This JS behavior causes the current version of the Egg virtual machine to protest saying that it expects the number of arguments to match the number of declared parameters. Unfortunately, when there is an error JS calls the Egg-callback with a different number of arguments than it was declared with.

The thing has several solutions, but at this moment I have opted for the fastest one, which has been that Egg does not protest against calls with a number of arguments less than those that were declared.

Another issue in this example is that in some versions Egg lacks the JS `null` object and
the convention is that JS calls the callback with `cb(null, data)` to indicate the absence of an error. Again there are numerous ways to approach this issue, but a simple one is to warn the Egg virtual machine of the existence of `null` so that it doesn't protest:

```js
topEnv['null'] = null;
topEnv['true'] = true;
...
```

Sigue un ejemplo de ejecución:

```js
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/fs
{"errno":-2,"code":"ENOENT","syscall":"open","path":"examples/no-existe.egg"}
do (
  fs.readFile("examples/no-existe.egg", "utf8", 
    fun(err, data, 
      if(==(err, null), print(data), print(err))
    )),
  fs.readFile("examples/fs.egg", "utf8", 
    fun(err, data, 
      if(==(err, null), print(data), print(err))
    ) # end fun
  ) # end fs.readFile
)
```

#### Recursos sobre Async 

* [Book *The Modern Javascript Tutorial*. Chapter Promises, async/await](https://javascript.info/async)
* Vídeo [Cómo funciona Async/Await en menos de 15 minutos](https://youtu.be/u2axmPnxUoo) YouTube Vídeo por Appdelante

## Scope Analysis

Aunque el lenguaje  Egg dispone de ámbitos, los errores de ámbito (variables no declaradas) solo se detectan en tiempo de ejecución:

```ruby
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ cat examples/set-error-compile.egg
set(x, 4)
```

Si lo ejecutamos nos da un  run-time error:

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ bin/egg.js examples/set-error-compile.egg
ReferenceError: Tried setting an undefined variable: x
```

De lo que se trata aquí es de detectar los errores lo mas temprano posible, antes de que se ejecute el programa recorriendo el AST y buscando los nodos de usos de *words* que no han sido definidos en un ámbito superior:

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ bin/egg.js -c examples/set-error-compile.egg
ReferenceError: Trying to use the undefined symbol x
```

En esta variante de Egg la opción `-c` usada compila el programa pero no lo ejecuta. 

En esta fase de análisis de ámbito también se pueden comprobar algunos otros tipos de errores de uso. 

Por ejemplo si se anima, puede extender Egg con declaraciones de la forma `const(a,4)` para constantes. 

Podemos entonces recorrer el AST comprobando que no se hace ningún intento de modificación (`set(a, ...)`) de esa variable en su ámbito de declaración.

### Referencias

* [Scope Analysis Notes]()
* Vea el Capítulo [Análisis del Contexto](/temas/scope-analysis/analisis-dependiente-del-contexto) en estos apuntes y lea el capítulo *Symbol Table Structure* y el Chapter 3 del libro de Muchnik:

## Egg to JS Compiler

Extend the translator from Egg to JavaScript as described in
[generating-js](/themes/translation/egg-2-js) making it as complete as possible.


## Lua Compiler

Using an interpreter for a large enough subset of the [Lua Grammar](https://github.com/kach/nearley/blob/master/examples/lua.ne) in Nearley.js by translating to Egg trees or directly to JS.

## Add Object Inheritance to Egg

It could be via a `child` method like this:

```js
do(
  def(x, object ( 
    "c", 0,
    "gc", ->{element[self, "c"]},
    "sc", ->{value, =(self, "c", value)},
    "inc", ->{=(self, "c", +(element[self, "c"],1))}
  )),
  def(y, child(x)),
  print(y.sc(5)),
  print(y.c)
)
```
La declaración `def(y, child(x))` hace que el objeto `y` herede las propiedades y métodos del objeto `x`

## Añadir Clases 

Sigue un posible ejemplo:


```ruby
do(
  class(Math, 
    {
      constructor: fun(x, y, 
        do(
          =(self.x, x),
          =(self.y, y)
        )
      ),
      sum: fun(+(self.x, self.y))
    }
  ),
  do( /* main */
    def(a, Math.new(2,3)),
    print(a.sum()); // 5
  )
)
```

## Valores por defecto de los parámetros de una función

Esta extensión consiste en añadir la posibilidad de que los
últimos parámetros de una función tengan valores por defecto y puedan ser omitidos en la llamada:

```js
do (
  def(f, fun(x, default(y, 3)), default(z, 2),
    do (
      print(x+y+z)
    )
  ),
  f(3),      # 8
  f(3, 5),   # 10
  f(3, 1, 9) # 13
)
```

Puede resultarte útil leer este tutorial  [JavaScript Default Parameters](https://www.javascripttutorial.net/es6/javascript-default-parameters/)
si decides abordar esta extensión.

## Operador spread

Se trata de añadir a Egg un operador `spread` que funcione como el de JS
permitiendo que un `spread(array)` sea expandido en llamadas a funciones donde se esperan múltiples elementos y al revés: que los múltiples argumentos de una función sean colocados en un array dentro del cuerpo de la función.

Sigue un ejemplo:


```ruby
do (
  def(f1, fun(x, y, # f1 espera dos argumentos
    do (
      +(x,y)
    )
  )),
  def(z, array(1,4)),
  print(f1(spread(z))), # Lo llamamos con un array. Resultado: 5
  def(g, fun(a, spread(x), # g espera uno o mas argumentos
    do (
      +(x[0], x[1])
    )
  )),
  print(g(1, 4, 5)) # a es 1 y x es [4, 5]. Resultado: 9
)
```

## Mejorar Información de Localizacion y Errores en Run Time

Traspase la información de localización de los tokens (línea, offset, punto de comienzo, etc.) en los nodos del árbol AST. Lo ideal es que para cada nodo se disponga de donde empieza el código asociado al nodo y de donde termina. Por ejemplo, dado un AST:

```
APPLY(op: W[n:if], args:ARRAY(W[n: true], V[v:4], V[V:5]]) # `if(true,4,5) 
``` 

calcular un atributo `loc` para los nodos `APPLY`y los nodos `PROPERTY` con información sobre la línea y columna de comienzo del `APPLY` y su final. Aproveche dicha información para mejorar los errores en tiempo de ejecución.


## AST Optimizations

### Plegado de Constantes

Se trata de añadir al compilador de Egg una fase de optimización que haga plegado de constantes.

Por ejemplo, cuando se le da como entrada un programa como este:

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ cat examples/optimize.egg
```
```ruby
do (
  :=(x, +(*(2, 3), -(5, 1))) # 2 * 3 + (5 - 1) == 10
)
```
Si se compila con la opción `--optimize` de lugar a un plegado de constantes (o en inglés [constant folding](https://en.wikipedia.org/wiki/Constant_folding))

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ bin/egg.js --optimize -c examples/optimize.egg
```

El código resultante produce un programa equivalente a `:= (x, 10)`:

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ cat examples/optimize.egg.evm
```
```js
{
  "type": "apply",
  "operator": {
    "type": "word",
    "name": "do"
  },
  "args": [
    {
      "type": "apply",
      "operator": {
        "type": "word",
        "name": ":="
      },
      "args": [
        {
          "type": "word",
          "name": "x"
        },
        {
          "type": "value",
          "value": 10
        }
      ]
    }
  ]
}
```

* [constant folding](https://en.wikipedia.org/wiki/Constant_folding) en la Wikipedia
* Puede usar [estraverse](https://github.com/estools/estraverse) para recorrer el AST buscando por árboles constantes

See the book [Advanced Compiler Design Implementation](https://books.google.es/books/about/Advanced_Compiler_Design_Implementation.html?id=Pq7pHwG1_OkC&redir_esc=y) by Muchnick.


### Other Machine Independent Optimizations

Otras posibles optimizaciones son:

- [Loop invariant code motion](https://www.tuhh.de/es/esd/research/wcc/optimizations/loop-invariant-code-motion.html)
- [Constant Propagation](https://cran.r-project.org/web/packages/rco/vignettes/opt-constant-propagation.html)
- Dead code elimination

## Strategy Pattern: use 

La idea es introducir una función `use` que es parecida a `require` 
pero con la diferencia de que extiende el lenguaje `Egg-aluXX`
mediante una librería escrita en JavaScript. 

Esto es, alguien del mundo mundial, un programador llamado Y entusiasmado por tu lenguaje `Egg-aluXX` 
extiende el lenguaje `egg-aluXX` con una librería llamada `egg-aluXX-tutu` que publica en [npm](http://npmjs.com).  
Y lo ha hecho añadiendo en `specialForms` y `topEnv` nuevas funcionalidades. Puede hacerlo porque importa tu módulo en el que tu exportas los hashes `specialForms` y `topEnv`.

Una sentencia como `use('tutu')` debe hacer que el intérprete `egg` haga un `require` de `egg-aluXX-tutu` (que se supone ha sido previamente instalada en `node_modules/`) y que las funcionalidades exportadas por `egg-aluXX-tutu` estén disponibles al programa Egg.

Como posibles ejemplos de uso, véanse las siguientes 
secciones 

