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

## Using putout from a program: The API

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

## PutoutScript: a Language

See [PutoutScript](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript)

## References

* [Repo crguezl/learning-putout](https://github.com/crguezl/learning-putout) with the examples of this lesson
* [🦎 PutoutScript](https://github.com/coderaiser/putout/blob/master/docs/putout-script.md#-putoutscript)
* [Revealing the magic of AST by writing babel plugins](https://dev.to/viveknayyar/revealing-the-magic-of-ast-by-writing-babel-plugins-1h01). Vivek Nayyar. Posted on Mar 5, 2021. Updated on Mar 6, 2021
* Read [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md)
* To understand how things works from the inside take a look at [Super Tiny Compiler](https://github.com/jamiebuilds/the-super-tiny-compiler).

