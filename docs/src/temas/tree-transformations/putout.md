# putout 

🐊**Putout** is a pluggable and configurable code transformer based on **Babel** with built-in **ESLint**. 

It has [a lot of transformations](https://github.com/coderaiser/putout#-built-in-transformations) that will keep your codebase in a clean state, removing any code smell and making code readable according to best practices.

The main target is **JavaScript**, but it also understand these other languages:

- JSX;
- TypeScript;
- Flow;
- Yaml;
- Markdown;
- JSON;
- Ignore;

## putout Help

```
➜  putout-hello git:(master) npx putout -h 
Usage: putout [options] [path]
Options: 
   -h, --help                  display this help and exit
   -v, --version               output version information and exit
   -f, --format [formatter]    use a specific output format, the default is: 'progress-bar' localy and 'dump' on CI
   -s, --staged                add staged files when in git repository
   --fix                       apply fixes of errors to code
   --fix-count [count = 10]    count of fixes rounds
   --rulesdir                  use additional rules from directory
   --transform [replacer]      apply Replacer, for example 'var __a = __b -> const __a = __b', read about Replacer https://git.io/JqcMn
   --plugins [plugins]         a comma-separated list of plugins to use
   --enable [rule]             enable the rule and save it to '.putout.json' walking up parent directories
   --disable [rule]            disable the rule and save it to '.putout.json' walking up parent directories
   --enable-all                enable all found rules and save them to '.putout.json' walking up parent directories
   --disable-all               disable all found rules (set baseline) and save them to '.putout.json' walking up parent directories
   --match [pattern]           read .putout.json and convert 'rules' to 'match' according to 'pattern'
   --flow                      enable flow
   --fresh                     generate a fresh cache
   --no-config                 avoid reading '.putout.json'
   --no-ci                     disable the CI detection
   --no-cache                  disable the cache
```

## Installation

Be sure to have one of the last versions of node before installing it:

```
➜  putout-hello node --version
v18.0.0
➜  putout-hello git:(master) npm i putout -D
```

## Transforming a program 

Consider the input program:

```
➜  src git:(main) ✗ cat putout-hello/index.js 
```

```js
const unused = 5;

module.exports = function() {
    return promise();
};

async function promise(a) {
    return Promise.reject(Error('x'));
```

## Fixing a program with --fix

Assuming all rules are active:

``` 
➜  putout-hello git:(master) ✗ npx putout --fix index.js                
➜  putout-hello git:(master) cat index.js
```
```js
'use strict';

module.exports = async () => await promise();

function promise() {
    return Promise.reject(Error('x'));
}
```

## Diagnostics

The command `npx putout index.js` will show the list of issues to fix in the former program:

```
➜  putout-hello git:(master) npx putout index.js            
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/index.js
 1:6   error   'unused' is defined but never used                       remove-unused-variables          
 7:23  error   'a' is defined but never used                            remove-unused-variables          
 3:0   error   Arrow functions should be used                           convert-to-arrow-function        
 1:0   error   'use strict' directive should be on top of CommonJS      strict-mode/add                  
 8:4   error   Reject is useless in async functions, use throw instead  promises/convert-reject-to-throw 
 4:11  error   Call async functions using 'await'                       promises/add-missing-await       
 7:0   error   Avoid useless async                                      promises/remove-useless-async    

✖ 7 errors in 1 files
  fixable with the `--fix` option
```

## Disable/enable rules

This is almost the same than using the option `--disable-all`. There are three command line options related with disabling and enabling rules:

*  `--disable [rule]`
   *  disable the rule and save it to `.putout.json` walking up parent directories
*  `--enable-all`
   *  enable all found rules and save them to `.putout.json` walking up parent directories
* `--disable-all`
  *  disable all found rules (set baseline) and save them to `.putout.json` walking up parent directories

Here is an example:

```
➜  putout-hello git:(master) ✗ npx putout index.js --disable-all
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/index.js
 1:6   error   'unused' is defined but never used                       remove-unused-variables          
 7:23  error   'a' is defined but never used                            remove-unused-variables          
 3:0   error   Arrow functions should be used                           convert-to-arrow-function        
 1:0   error   'use strict' directive should be on top of CommonJS      strict-mode/add                  
 8:4   error   Reject is useless in async functions, use throw instead  promises/convert-reject-to-throw 
 4:11  error   Call async functions using 'await'                       promises/add-missing-await       
 7:0   error   Avoid useless async                                      promises/remove-useless-async    

✖ 7 errors in 1 files
  fixable with the "--fix" option
``` 

## The configuration file .putout.json

The configuration file has been modified by the previous command:

```json
➜  putout-hello git:(master) ✗ cat .putout.json 
{
    "rules": {
        "remove-unused-variables": "off",
        "convert-to-arrow-function": "off",
        "strict-mode/add": "off",
        "promises/convert-reject-to-throw": "off",
        "promises/add-missing-await": "off",
        "promises/remove-useless-async": "off"
    }
}
```

## Modifying the configuration file 

```
npx putout index.js --enable convert-commonjs-to-esm
```

```{12}
➜  putout-hello git:(master) ✗ git -P diff .putout.json
diff --git a/.putout.json b/.putout.json
index c8b3105..27d6b38 100644
--- a/.putout.json
+++ b/.putout.json
@@ -5,6 +5,7 @@
         "strict-mode/add": "off",
         "promises/convert-reject-to-throw": "off",
         "promises/add-missing-await": "off",
-        "promises/remove-useless-async": "off"
+        "promises/remove-useless-async": "off",
+        "convert-commonjs-to-esm": "on"
     }
 }
\ No newline at end of file
```

## Converting CommonJS module to ESM module

Assuming the previous `.putout.son` file where `"convert-commonjs-to-esm": "on"`, if I run `putout --fixed`, it doesn't fix the program:

```
➜  putout-hello git:(master) ✗ npx putout --fix index.js
/Users/casianorodriguezleon/campus-virtual/2122/learning/compiler-learning/putout-learning/putout-hello/index.js
 3:0  error   CommonJS should be used insted of ESM  convert-esm-to-commonjs         
 0:0  error   ESM should be used insted of Commonjs  convert-commonjs-to-esm/exports 
 0:0  error   ESM should be used insted of Commonjs  convert-commonjs-to-esm/exports 

✖ 3 errors in 1 files
  fixable with the `--fix` option
```

I have to edit the `package.json` and modify the `type`:

```{11}
➜  putout-hello git:(master) ✗ code package.json 
➜  putout-hello git:(master) ✗ git -P diff package.json
diff --git a/package.json b/package.json
index 743967d..91cba11 100644
--- a/package.json
+++ b/package.json
@@ -3,6 +3,7 @@
   "version": "1.0.0",
   "description": "",
   "main": "index.js",
+  "type": "module",
   "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
   },
```

If I run `putout` again, it fixes the program:

```
➜  putout-hello git:(master) ✗ npx putout --fix index.js
```

Here is the result:

```js
➜  putout-hello git:(master) ✗ cat index.js
const unused = 5;

export default function() {
    return promise();
};

async function promise(a) {
    return Promise.reject(Error('x'));
}
```

If you  have `.cjs` or `.mjs` files, they will be converted automatically to `CommonJS` and `ESM` accordingly.

### Converting a whole folder 

In case of `src` directory, it will look like:

```sh
putout src --disable-all && putout src --enable convert-commonjs-to-esm && putout src --fix
```

This command will

1. **disable all rules** that **Putout** can find right now and 
2. **enable** a single rule. 

## Fixing a program with putout from a program: The API

Putout supports dynamic loading of plugins from `node_modules`. 

Let's consider the example of using the [remove-unused-variables](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-unused-variables/README.md#readme) plugin:


```js
➜  putout-hello git:(master) ✗ cat use-putout.js 
import putout from 'putout';
const source = `
    const hello = 'world';
    const hi = 'there';
    
    console.log(hello);
`;

let result = putout(source, {
    plugins: [
        'remove-unused-variables',
    ],
});
console.log(result);
```

```js                                                                                           
➜  putout-hello git:(master) ✗ node use-putout.js   
{
  code: "\n    const hello = 'world';\n\n    console.log(hello);\n",
  places: []
}
```

As you see, `places` is empty, but the code is changed: there is no `hi` variable.

## Not Fixing the program: The API

From the beginning, Putout developed with ability to split the main process into two concepts: 

* `find` (find places that could be fixed) and 
* `fix` (apply the fixes to the files)
  
It is therefore easy to find sections that could be fixed.

In the following example unused variables are found but 
without making changes to the source file:


```js
➜  putout-hello git:(master) cat use-putout-no-fix.js 
#!/usr/bin/env node
import putout from 'putout';
const source = `
    const hello = 'world';
    const hi = 'there';
    
    console.log(hello);
`;

let result = putout(source, {
    fix: false,
    plugins: [
        'remove-unused-variables',
    ],
});

console.log(JSON.stringify(result, null, 2));
```

```js
➜  putout-hello git:(master) ./use-putout-no-fix.js
{
  "code": "\n    const hello = 'world';\n    const hi = 'there';\n    \n    console.log(hello);\n",
  "places": [
    {
      "rule": "remove-unused-variables",
      "message": "'hi' is defined but never used",
      "position": {
        "line": 3,
        "column": 10
      }
    }
  ]
}
```

## Built-in Transformations

```js
➜  putout-hello git:(master) ✗ cat debugger-example.js
let a = 4;
debugger;
console.log(a);
➜  putout-hello git:(master) ✗ npx putout --disable remove-console                                               
➜  putout-hello git:(master) ✗ npx putout --transform 'debugger' --fix debugger-example.js 
➜  putout-hello git:(master) ✗ cat debugger-example.js                                    
let a = 4;
console.log(a);% 
```

## User Transformations

Let us write this transformation:

```js
➜  putout-hello git:(master) ✗ cat my-transform.js 
// Copy this file to ~/.putout
module.exports.report = () => `Repeated expressions in sums are transformed onto multiplication.`;

module.exports.replace = () => ({
    '__b + __b': '2 * __b'
});
```

`putout` supports `codemodes` in a way similar to plugins. 

Just create a directory `~/.putout` and put your plugins there:

```
➜  putout-hello git:(master) ✗ mkdir ~/.putout
➜  putout-hello git:(master) ✗ cp my-transform.js ~/.putout
➜  putout-hello git:(master) ✗ ls -ltr ~/.putout 
total 8
-rw-r--r--  1 casianorodriguezleon  staff  142 21 abr 13:40 my-transform.js
``` 

Now we run the transformation:

```
➜  putout-hello git:(master) ✗ npx putout --fix input-for-my-transform.js
```

Where the initial contents of the file `input-for-my-transform.j` are:

```js
➜  putout-hello git:(master) ✗ cat input-for-my-transform.js 
let a = 4;
function f(x) {
  let y = x + x;
  let z = y + y * 3; // Will it work?
  return y + z;
}
```

transforming the file `input-for-my-transform.js` onto:

```js
➜  putout-hello git:(master) ✗ cat input-for-my-transform.js 
let a = 4;
function f(x) {
  let y = 2 * x;
  let z = y + y * 3; // Will it work?
  return y + z;
}
2 * f(a);
```

## PutoutScript: a Language

The expression in the former transformer example:

```js
module.exports.replace = () => ({
    'let __a = __b': 'const __b = __a'
});
``` 

is an example of the *PutoutScript* language. [PutoutScript](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript) is a JavaScript compatible language which adds additional meaning to `Identifiers` in AST-template. 

Variables look like `__a`, `__b` are an example of [Template Variables](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#template-variables). 

**They begin with a `__` and can only contain one character**.

Template variables are an abstraction to match code when you don’t know the value or contents ahead of time, *similar to capture groups in regular expressions*.

Template variables can be used to track values across a specific code scope. 

This includes 

- variables, 
- functions, 
- arguments, 
- classes, 
- object methods, 
- imports 

and more.


[PutoutScript](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript) is supported by all types of [Putout plugins](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#supported-plugin-types).

Take a look at [rule syntax](https://github.com/coderaiser/putout/tree/master/packages/compare#supported-template-variables) for more information.

In the command line, patterns are specified with a flag `--transform`.


## References

* [Repo crguezl/learning-putout](https://github.com/crguezl/learning-putout) with the examples of this lesson
* [🦎 PutoutScript](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript)
* [Revealing the magic of AST by writing babel plugins](https://dev.to/viveknayyar/revealing-the-magic-of-ast-by-writing-babel-plugins-1h01). Vivek Nayyar. Posted on Mar 5, 2021. Updated on Mar 6, 2021
* Read [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
* To understand how things works from the inside take a look at [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

