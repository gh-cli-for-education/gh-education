When the argument used to index a function object is not an attribute of the function 

```ruby 
someFun[arg1, ... ] # and "arg1" is not a property of "someFun"
```

then we want `arg1, ...` to be interpreted as arguments for `someFun` and the expression returns the [currying of the function](https://en.wikipedia.org/wiki/Currying) on `arg1, ...`. 

For instance:

```ruby
✗ cat examples/curry-no-method.egg        
print(+[4](2))
```

In Egg `+` is a function that takes an arbritrary number of numbers:

$$+: \cup_{i=1}^{\infty}\mathbb{R}^i \longrightarrow \mathbb{R}$$

and returns its sum. The curried $+[4]: \cup_{i=1}^{\infty}\mathbb{R}^i \longrightarrow \mathbb{R}$ is the function defined by $+[4](x_2, \cdots, x_n) = +(4, x_2, \cdots, x_n)$.

Execution:

```
✗ bin/eggc.js examples/curry-no-method.egg
✗ npx evm examples/curry-no-method.json   
6
```

However, if the attribute exists we want an ordinary property evaluation, as in this example:

```ruby
➜  egg-oop-parser-solution git:(master) cat examples/function-length-property.egg
do(
    def(f, fun(x, y, +(x,y))),
    print(f["numParams"]) # JS length property is not supported
)
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/function-length-property
2
```

We have added an attribute `numParams` to the Egg Function objects that reutrns the number of parameters in its declaration.

Later in this lab we will introduce the *dot operator* `a.b`  for objects. Basically `a.b` and `a["b"]` are the same thing. This is why the former program can be rewritten this way:

```
➜  egg-oop-parser-solution git:(master) ✗ cat  examples/curry-no-method-dot.egg
```
```ruby 
print(+.4(2))
```
```                                                                       
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/curry-no-method-dot 
6
```

This is another example of currying in Egg:

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

The ambiguities that arise in the expression `4.+` will be discussed in the [incoming sections](#the-dot-ambiguity-property-dot-or-mantissa-dot). 

```
➜  egg-oop-parser-solution git:(master) ✗ bin/egg examples/curry-method        
12
12
60
1
1
```

::: tip Design Consideration

The decision of overloading the meaning of the property access for functions is a risky one :warning: 
but has few consequences over the grammar design other than the ambiguity that arise in the expression `4.+` ([See  section *Property dot or Mantissa dot?*](#the-dot-ambiguity-property-dot-or-mantissa-dot)). 

**The decision of overloading the meaning of the property access for functions will have consequences during the interpretation phase**.

In this case the idea behind the proposal is that 

**Any potential argument of a function can be viewed as a property of such function whose value is the function curried for that argument**

which makes the design proposal consistent with the idea of **property**
::: 
