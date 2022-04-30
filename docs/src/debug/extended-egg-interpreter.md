---
title: Extending Egg
key: extended-egg
published: true
date: 2022/05/02
delivery: "2022/05/12"
order: 14
layout: Practica
prev: /practicas/egg-oop-parser.md
sidebar: auto
template: "https://github.com/LL-ESIT-PL-2122/extended-egg-template"
rubrica: 
  - El REPL funciona correctamente
  - Las clases de los ASTs disponen de los métodos adecuados
  - Las asignaciones han sido implementadas correctamente
  - El analizador léxico de Egg usa un analizador léxico generado por el generador de analizadores léxicos del alumno
  - Comprende la interpretación de las funciones Egg mediante funciones JS
  - Comprende el manejo de ámbitos
  - Contiene suficientes tests
  - Se provee un workflow sencillo para convertir rápidamente un ejemplo operativo en un test 
  - "Estudio de covering"
  - Se ha hecho CI con GitHub Actions
  - Módulo bien documentado 
  - Informe hecho con Vuepress desplegado
  - Se ha publicado como módulo y se ha hecho un buen uso del versionado semántico en la evolución del módulo
---

# {{$frontmatter.title }}

## Interpreting Property Nodes

The first thing to do is to fill the class `Property` inside the file `src/ast.js` providing not only the constructor but the `evaluate` and `leftEvaluate` methods.

Here is a proposal template:

```js{5-20}
class Property {
  constructor(tree) { ... }

  evaluate(env) {
    if (this.operator.type == "word" && this.operator.name in specialForms) { 
      // Is there any meaning for s.t. like while[<(x,4), ... ]?
    }

    let theObject = this.operator.evaluate(env);
    let propsProcessed = this.args.map((arg) => arg.evaluate(env));
    let propName = checkNegativeIndex(theObject, propsProcessed[0]);

    if (theObject[propName] || propName in theObject) {
      // theObject has a property with name "propName"
      // Write here the code to get the specified property
    } else if (typeof theObject === "function") {
      // theObject is a function, curry the function
    } else {
      throw new TypeError(`Evaluating properties for Object "${JSON.stringify(theObject)}" properties: "${JSON.stringify(propsProcessed)}"`);
    }
  }

  leftEvaluate(env) {
    // Interpret s.t. as a[2,3].b in the expression =(a[2,3].b, 4) 
  }
}
```

For the method `evaluate`  we can follow the same structure of the `evaluate` of `Apply` nodes.
The object is in the `operator` child and the properties in the `args` array.

We check in line 13 that the object really has that property. If so, we have to iteratively traverse the properties indexing in the property the previous object to obtain the new object.  Take care of negative indices like in `x[-1, -2]` and cases in which the index returns a function object, like in `=(x, 4["toFixed"])`, since in that cases the function is itended to be a method and has to be **bind**ed  to the object.

## Negative Indices in arrays

The interpreter has to understand indexation on negative indices. The consequence is that when accessing properties, we must check if that is the case.  A solution is to write a helper and use it wherever is needed:

```js
function checkNegativeIndex(obj, element) {
  if (Array.isArray(obj) &&  element < 0 ) {
    element += obj.length;
  }
  return element;
}
```

Another is to do Monkey Patching in the object class.

## Monkey Patching 

Instead of using `checkNegativeIndex`, we can alternatively add to the object class a method `at` that is called `object.at(property)` and returns `object[property]`  but when `property` is a negative number and `object` is an array, it  returns `object[length+property]`. Then we can use `at` wherever is needed. Choose the option that suits you.

You can also use Monkey Patching  to extend any of the basic classes. For instance, 
the following code augments the `Number` class with methods for the numeric operations:

```js
const binOp = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

[ "+", "-", "*", "/",].forEach(op => {
  Number.prototype[op] = function(...args) {
  try {
    let sum = this;
    for(let i=0; i<args.length; i++) {
      sum = binOp[op](sum, args[i]);
    }
    return sum;
  } catch (e) {
     throw new Error(`Error in Number method '${op}'\n`,e)
  }
}; 
}) // end of forEach
```

that combined with currying allows to achieve examples like this one:

```ruby
➜  egg-oop-parser-solution git:(master) cat examples/curry-method.egg 
do (
  print(4["+"][5](3)), 
  print(4.+[5](3)),    # Same thing 12
  print(4["*"][5](3)), # 4["*"](5, 3) # 60
  print(6["/"][2](3)), # 6["/"](2, 3) # 1
  print(6["-"][2](3))  # 6["/"](2, 3) # 1
)
``` 

```
➜  egg-oop-parser-solution git:(master) bin/egg examples/curry-method 
12
12
60
1
1
```

## Leftvalues and Extended Assignments

We have to define the `leftEvaluate` method to support expressions like `set(a[0, -1].x, 3)` in this program:

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/set-simple.egg 
do(
    def(a, [[1,{x:2}],3]),
    set(a[0, -1].x, 3),
    print(a)
)
```
```
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/set-simple
[[1,{"x":3}],3]
```

Remember that **we defined references in Egg** as an array where the first element is the JS reference to an Egg scope, an object, an array, a map, etc. and the following elements describe the position inside the object.

For instance, for the expression `set(a[0, -1].x, 3)`, if `leftSide` denotes the AST for `a[0, -1].x`,  the call `leftSide.leftEvaluate(env)` has to return an array with the entry for `a` in its scope `env["a"]` and then the computed indices `0`, something like `a.length-1` and  `"x"`. Notice that when the `leftEvaluate` of a property node is called, necessarily the `leftSide` has to be a reference.  


Recall that `leftEvaluate` is called from `set`. 
To help you with this task, here I leave to you an implementation of `set`:

```js
specialForms['='] = specialForms['set'] = function(args, env) {
  if (args.length !== 2) {
    throw new SyntaxError(`Bad use of set '${JSON.stringify(args, null, 0)}.substring(0,20)}'`);
  }

  let valueTree = args[args.length-1];
  let value = valueTree.evaluate(env);

  let leftSide = args[0];
  let [s, ...index] = leftSide.leftEvaluate(env);

  let last = index.length-1
  for (let j = 0; j < last; j++) {
    index[j] = checkNegativeIndex(s, index[j]);
    s = s[index[j]];
  }
  index[last] = checkNegativeIndex(s, index[last]);
  s[index[last]] = value;

  return value;
}
``` 

## Currying

!!!include(includes/currying.md)!!!

You have to add the code in lines 12-14 to return the curryfied function:

```js{12-14}
  evaluate(env) {
    if (this.operator.type == "word" && this.operator.name in specialForms) { 
      // ... ?
    }

    let theObject = this.operator.evaluate(env);
    let propsProcessed = this.args.map((arg) => arg.evaluate(env));
    let propName = checkNegativeIndex(theObject, propsProcessed[0]);

    if (theObject[propName] || propName in theObject) {
      // ... theObject has a property with name "propName" 
    } else if (typeof theObject === "function") {
      // theObject is a function, curry the function 
      // using propsProcessed as fixed arguments
    } else 
      throw new TypeError(`...`);
  }
```


## Eval and Parsing

Coming back to the `evaluate` method of the `Property` nodes, it may be worth considering this lines of code that were in the code of the `evaluate` method of the `Apply` nodes:

```js{1-3}
evaluate(env) {
  if (this.operator.type == "word" && this.operator.name in specialForms) { 
    // Is there any meaning for s.t. like while[<(x,4), ... ]?
  }
  ...
}
```

Not much comes to my mind that may mean *The attribute of a language construct*. 

One that may be useful is to return an object with two properties:
- The AST of the corresponding `Apply` node 
- The current scope/env

With that in mind and adding an `eval` function, we can write Egg programs like the following:

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/specialform-property-4.egg
(
    def(b,4),
    def(state, do[
        print(+(b,1))
    ]),
    =(state.scope.b, 9),
    print(Object.keys(state)), # ["ast","scope"]
    print(state.ast), # the AST of do(print(+(b,1))))
    eval(state)       # 10 evals the AST in the current scope
)
```

That when executed produces:

```json
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/specialform-property-4
["ast","scope"]
{"type":"apply","operator":{"type":"word","name":"do"},"args":[{"type":"apply","operator":{"type":"word","name":"print"},"args":[{"type":"apply","operator":{"type":"word","name":"+"},"args":[{"type":"word","name":"b"},{"type":"value","value":1}]}]}]}
10
```

## Maps, Hashes or Dictionaries

Hashes are easy to implement. Here you have an example of use:

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/map-colon-leftside.egg
(
  def(x, map(x: 4, y: map(z: 3))),
  print(x),                     # {"x":4,"y":{"z":3}}
  print(x[y:"z"]),              # 3
  =(x.y.z, 50),
  print(x.y)                    # {"z":50}
)
```
```json
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/map-colon-leftside
{"x":4,"y":{"z":3}}
3
{"z":50}
``` 

## Objects

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/object-colon-selector.egg 
do (
  def(x, {
    c: [1, 2, 3], # array literals!
    gc:  fun(
           element(self, "c") # old way works
         ), 
    sc:  fun(value, # look at the left side of the assignment!
           =(self.c[0], value)
         ),
    inc: fun( 
           =(self.c[0], +(self.c[0], 1)) 
         ) 
  }),
  print(x),
  print(x.gc()),    # [1, 2, 3]
  x.sc(4),
  print(x.gc()),    # [4,2,3]
  x.inc(),
  print(x.gc()),    # [5,2,3]
  print(x.c.pop()), # 3
  print(x.c)        # [5,2]
)
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/object-colon-selector 
{"c":[1,2,3]}
[1,2,3]
[4,2,3]
[5,2,3]
3
[5,2]
```

To do it, 

1. Add the corresponding function entry to `specialForms["object"]`  
2. Create a new environment for the object having as parent the current environment 
3. Create the object as a JS object so that it has all the properties of JS objects
4. Add `self` to the object environment. Has to reference the just created object
5. Traverse the `args` ASTs (has to be a forest with an even number of trees) taking the key value pair on each step
6. Evaluate the pairs key, value in the context of the object environment
7. Return the just created object


## Require

Expand the language with a `require`  expression to allow the use of libraries.

Review the video *How to implement the "require" functionality*

<youtube id="qffmnSCRR3c"></youtube>

Here is a link to the [Repo corresponding to the video](https://github.com/ULL-ESIT-MII-CA-1718/ejs-chapter10-modules/tree/master/require).

In this exercise:

* Memoize libraries so they don't load twice
* Try to add this functionality without touching the main code using the strategy pattern + registry pattern

### Example

Module code:

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/require/module.egg 
# module. Exports z
do(
  print("inside module"),
  def(z, map(inc: ->(x, 
                     +(x,1)
                   ) # end fun
           ) # end map
  ), # end of def
  z  # el último valor será exportado
)
```

Client program:

```ruby
➜  egg-oop-parser-solution git:(master) ✗ cat examples/require/client.egg
do(
  def(z, require("examples/require/module.egg")),
  print(z.inc(4)),
  def(w, require("examples/require/module.egg"))
)
```

Ejecución:

```
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/require/client
inside module
5
```

Notice how `inside module` appears only once even though the module is *required* twice


## For Loops

Extend the language with one or more types of `for` loops

### Conventional For Loop

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ cat examples/for.egg
```
```ruby
do(
  for(define(x, 0), <(x, 5), ++(x),
    print(x)
  )
)
```

```
[.../TFA-04-16-2020-03-22-00/davafons(casiano)]$ bin/egg.js examples/for.egg
0
1
2
3
4
```

### For Each Loop

We already have a loop to go through the iterable objects, since the generated JS objects have easy acces to their methods:

```
➜  eloquentjsegg git:(private2021) ✗ cat examples/for-js.egg 
```

```js
(
  def(a, [4,3,2,1]),
  a.forEach(
    fun(x,i,ra, 
      print("Element",i,"of ",ra,"is",x)
    )
  )
)
```                                                                                  

Que cuando se ejecuta:

```     
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/for-js    
Element 0 of  [4,3,2,1] is 4
Element 1 of  [4,3,2,1] is 3
Element 2 of  [4,3,2,1] is 2
Element 3 of  [4,3,2,1] is 1
```

## Tests

Add a `test` folder and in it the
test programs `test/test.js` (Mocha or Jest, use whichever you prefer).


## Continuous Integration

Use GitHub Actions para añadir CI al proyecto

To install Private Packages inside a GitHub Action review these sections:

* [GitHub Actions. The Secrets context](/temas/introduccion-a-javascript/github-actions.html#the-secrets-context)
* [Installing Private Packages in a GitHub Action](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#installing-private-packages-in-a-github-action)

## GitHub Registry

Publique el intérprete extendido como módulo en GH Registry en el ámbito `@ull-esit-pl-2122`.

Puesto que este paquete contiene ejecutables es conveniente que lea la sección
[bin](https://docs.npmjs.com/files/package.json#bin) de la documentación de npm.js sobre package.json:

```
[~/.../crguezl-egg(master)]$ jq .bin package.json
```
```js
{
  "egg": "./bin/egg.js",
  "evm": "./bin/evm.js"
}
```


## Recursos

* [GitHub Actions. The Secrets context](/temas/introduccion-a-javascript/github-actions.html#the-secrets-context)
* [Installing Private Packages in a GitHub Action](/temas/introduccion-a-javascript/creating-and-publishing-npm-module.html#installing-private-packages-in-a-github-action)
* [latest-version-cli](https://github.com/sindresorhus/latest-version-cli) Get the latest version of an npm package
* [Egg Virtual Machine with OOP extensions for Windows/Linux/Mac OS](https://github.com/crguezl/oop-evm-releases/releases/tag/v1.0.0)
* [Eloquent JS: Chapter 11. Project: A Programming Language](http://eloquentjavascript.net/11_language.html)


* Módulo en npm [@crguezl/eloquentjsegg](https://www.npmjs.com/package/@crguezl/eloquentjsegg) 

* [El lenguaje egg: repo en GitHub](https://github.com/ULL-ESIT-PL-1617/egg). Contiene un analizador sintáctico PDR y una solución a los  problemas de separar el analizador léxico del sintáctico PDR así como al de separar los códigos y los tres ejecutables. También tiene ejemplos de pruebas en Mocha y Chai
* [NodeJS Readline gist](https://gist.github.com/crguezl/430642e29a2b9293317320d0d1759387): un sencillo gist que te enseña a usar `readline` para hacer un bucle interactivo. Quizá conviene que lo leas cuando llegues a la sección del [problema del REPL](#repl)
* En el repo [ULL-ESIT-PL-1617/interpreter-egg](https://github.com/ULL-ESIT-PL-1617/interpreter-egg) se muestra como hacer un bucle REPL
* [Vídeo *Programando un bucle REPL para el lenguaje Egg*](https://youtu.be/5gIlt6r29lw)

  <youtube id="5gIlt6r29lw"></youtube>
* [XRegExp](http://xregexp.com/): Un módulo que provee regexp extendidas 
* El módulo [@ull-esit-pl/example2test](https://www.npmjs.com/package/@ull-esit-pl/example2test) 
* Tests. Enlaces sobre Mocking and Stubbing
    * [Sinon API](http://sinonjs.org/releases/v1.17.7/)
    * [Side effects of stubbing console in tests](https://gyandeeps.com/console-stubbing/)
    * [Unit Test like a Secret Agent with Sinon.js](http://elijahmanor.com/unit-test-like-a-secret-agent-with-sinon-js/) by Elijah Manor
* VSCode Extension Egg Tools: [Adds syntax highlighting and code snippets for the Egg language by EloquentJS](https://marketplace.visualstudio.com/items?itemName=jasonhaxstuff.egg-tools)


