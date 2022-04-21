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

are also supported

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

The configuration file has been modified:

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

## Fixing it

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