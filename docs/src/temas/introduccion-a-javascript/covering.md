
### Pruebas: Cubrimiento /Covering

In computer science, *code coverage* 
is a measure used to describe the degree to which the source code of a program 
is tested by a particular test suite. 

A program with high code coverage has been more thoroughly tested and has a lower chance of containing software bugs than a program with low code coverage. 

Many different metrics can be used to calculate code coverage; 
some of the most basic are:
  * the percent of program subroutines and 
  * the percent of program statements called during execution of the test suite.

Ideally your covering must include at least smoke testing and edge cases.

####  Smoke Testing

* Smoke testing (also **confidence testing**, **sanity testing**) is preliminary testing to reveal simple failures 
* Smoke testing refers to test cases that cover the most important functionality of a component or system 

#### Edge case

* In programming, an *edge case* typically involves input values that require special handling in an algorithm behind a computer program.

*  As a measure for validating the behavior of computer programs in such cases, unit tests are usually created; they are testing *boundary conditions* of an algorithm, function or method. 

* A series of edge cases around each "boundary" can be used to give reasonable coverage and confidence using the assumption that if it behaves correctly at the edges, it should behave everywhere else.

* For example, a function that divides two numbers might be tested using both very large and very small numbers. This assumes that if it works for both ends of the magnitude spectrum, it should work correctly in between.

### Tools: [nyc / Istanbul](istanbul.md)

Here is an example of use of `nyc`:

```json
➜  hello-compilers-solution git:(master) ✗ jq '.scripts' package.json 
{
  "test": "npm run build; mocha",
  "mmt": "npm run build; ./bin/mmt.js",
  "build": "jison src/maxmin-ast.jison src/maxmin.l -o src/maxmin.js",
  "cov": "nyc npm run test"
}
```

To run it:

```➜  hello-compilers-solution git:(master) ✗ npm run cov

> hello-compilers@1.0.1 cov
> nyc npm run test


> hello-compilers@1.0.1 test
> npm run build; mocha


> hello-compilers@1.0.1 build
> jison src/maxmin-ast.jison src/maxmin.l -o src/maxmin.js

  Testing hello maxmin translator
    ✔ Test 2@1&3 = 2
    ✔ Test 2@1@3 = 3
    ✔ Test 2&1&3 = 1
    ✔ Test 2&1@3 = 3
    ✔ Test 2&(1@3) = 2


  5 passing (12ms)

--------------|---------|----------|---------|---------|------------------------------------------------------------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                      
--------------|---------|----------|---------|---------|------------------------------------------------------------------------
All files     |   57.33 |    43.45 |   45.71 |   54.41 |                                                                        
 ast-build.js |     100 |      100 |     100 |     100 |                                                                        
 maxmin.js    |   56.74 |    43.45 |   40.62 |   53.73 | ...456-463,469,490-498,511,516,530-545,554-575,582,584,586,608-613,616 
--------------|---------|----------|---------|---------|------------------------------------------------------------------------
```
