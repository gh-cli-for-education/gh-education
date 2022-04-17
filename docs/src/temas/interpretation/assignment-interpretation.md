---
prev: /temas/interpretation/ast-interpretation.md
next: /temas/interpretation/function-interpretation.md
---
# Interpretation of Assignment Expressions

The initial way to assign a binding a value in Egg is via `def`ine. 
This construct acts as a way both to define new bindings and to give existing ones a new value.

As a consequence, when you try to give a nonlocal binding a new value, you will end up defining a local one with the same name instead. 

The problem here is to add a special interpreter for `set(x, value)`, similar to `def(x, value)`, which

1. Does not create a new binding in the current scope
2. Updates the entry in the nearest scope (local, parent, grand-parent, etc.) in which a binding with name `x` exist
3. If no binding with name `x` exists, throws a `ReferenceError`.

This example illustrates the kind of behavior we want:

```js
➜  eloquentjsegg git:(private2122) cat examples/scope.egg 
do( 
  def(x,9), /* def crea una nueva variable local */
  def(f, fun( /* fun creates a new scope */
    do(
      def(x, 4), 
      print(x) # 4
    )
  )),
  def(g, fun(set(x, 8))), /* set no crea una nueva variable local */
  f(),
  print(x), # 9
  g(),
  print(x) # 8
)
➜  eloquentjsegg git:(private2122) bin/egg.js examples/scope.egg 
4
9
8
```

## l-values and r-values

Some languages use the idea of **l-values** and **r-values**, deriving from the typical mode of evaluation on the left and right-hand side of an assignment statement. 

* An **l-value** refers to an object that persists beyond a single expression. 
* An **r-value** is a temporary value that does not persist beyond the expression that uses it.

In many languages, notably the C family, l-values have storage addresses that are programmatically accessible to the running program (e.g., via some address-of operator like "`&`" in C/C++), meaning that they are variables or de-referenced references to a certain memory location. 

Form the prespective of interpretation and translation, the same sub-expresion `x` has different meanings depending on the side of the assignment in which it is:

```js
x = x
```
On the left side `x` is a reference or a binding, on the right side is a value: the value stored on that reference. 

## leftEvaluate  

Our `evaluate` methods do not work here, since they interpret the expressions in a r-value context.

The proposal is to introduce `leftEvaluate` methods in the AST node classes that evaluate the expressions in a l-value context. Something like the following code for `specialForms['=']`:

```js{10}
specialForms['='] = specialForms['set'] = function(args, env) { 
  if (args.length !== 2 || args[0].type === 'value') {
    throw new SyntaxError('Bad use of set');
  }

  let valueTree = args[args.length-1];
  let value = valueTree.evaluate(env);

  let leftSide = args[0];
  let [scope, name] = leftSide.leftEvaluate(env);
  scope[name] = value;

  return value;
}
```

## Exercise

Try to write the `leftEvaluate` method(s) for Egg. Allow only words on the left side of any assignment

::: danger Future Work

Although by now we will restrict to allow only words on the left side of any assignment, we aim to increase expressiveness and to allow assignments that can contains expressions like the `=(y["y"][1], 9)` or `=(self.c, a)` in the following example:

```js{4}
do (
  def (x, [[1,2], [3,4]]),
  =(x[0], 9), # [9, [3,4]]
  print(x), # [ 9, [ 3, 4 ] ]
  
  def(y, map(x:4, y: array(0,7))),
  =(y["y"][1], 9), # map(x:4, y: [0,9])
  print(y["y", 1]), # 9
  print(y), # { x: 4, y: [ 0, 9 ] }

  def(z, { c:4, g: fun(a, =(self.c, a))}),
  print(z.c),    # 4
  print(z.g(8)), # 8
  print(z.c)     # 8
)
```

That we will compile and execute like here:

```
➜  egg-oop-parser-solution git:(master) ✗ bin/eggc.js examples/set-lefteval.egg
➜  egg-oop-parser-solution git:(master) ✗ bin/evm examples/set-lefteval.json   
[9,[3,4]]
[0,9]
{"x":4,"y":[0,9]}
4
8
8
```
::: 

## See also

* See also section [Fixing Scope](https://eloquentjavascript.net/12_language.html#i_Y9ZDMshYCQ) in the EloquentJS book
* Puede encontrar una solución al problema en la rama `inicial` de este repo [ULL-ESIT-PL-1617/egg/](https://github.com/ULL-ESIT-PL-1617/egg/tree/inicial). La rama `inicial` como su nombre indica contiene además del código  descrito en el capítulo de EloquentJS las soluciones a los ejercicios propuestos en el capítulo del libro.
