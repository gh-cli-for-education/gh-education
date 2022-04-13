---
prev: jscodeshift-recast.md
---

# jscodeshift 

jscodeshift is a toolkit for running codemods over multiple JavaScript or
TypeScript files.
It provides:

- A runner, which executes the provided transform for each file passed to it.
  It also outputs a summary of how many files have (not) been transformed.
- A wrapper around [recast][], providing a different API.  Recast is an
  AST-to-AST transform tool and also tries to preserve the style of original code
  as much as possible.

## Install

Get jscodeshift from [npm][]:

```
$ npm install -g jscodeshift
```

This will install the runner as `jscodeshift`.

## Usage from the Command Line 

The CLI provides the following options:

```
$ jscodeshift --help

Usage: jscodeshift [OPTION]... PATH...
  or:  jscodeshift [OPTION]... -t TRANSFORM_PATH PATH...
  or:  jscodeshift [OPTION]... -t URL PATH...
  or:  jscodeshift [OPTION]... --stdin < file_list.txt

Apply transform logic in TRANSFORM_PATH (recursively) to every PATH.
If --stdin is set, each line of the standard input is used as a path.

Options:
"..." behind an option means that it can be supplied multiple times.
All options are also passed to the transformer, which means you can supply custom options that are not listed here.

      --(no-)babel              apply babeljs to the transform file
                                (default: true)
  -c, --cpus=N                  start at most N child processes to process source files
                                (default: max(all - 1, 1))
  -d, --(no-)dry                dry run (no changes are made to files)
                                (default: false)
      --extensions=EXT          transform files with these file extensions (comma separated list)
                                (default: js)
  -h, --help                    print this help and exit
      --ignore-config=FILE ...  ignore files if they match patterns sourced from a configuration file (e.g. a .gitignore)
      --ignore-pattern=GLOB ...  ignore files that match a provided glob expression
      --parser=babel|babylon|flow|ts|tsx  the parser to use for parsing the source files
                                          (default: babel)
      --parser-config=FILE      path to a JSON file containing a custom parser configuration for flow or babylon
  -p, --(no-)print              print transformed files to stdout, useful for development
                                (default: false)
      --(no-)run-in-band        run serially in the current process
                                (default: false)
  -s, --(no-)silent             do not write to stdout or stderr
                                (default: false)
      --(no-)stdin              read file/directory list from stdin
                                (default: false)
  -t, --transform=FILE          path to the transform file. Can be either a local path or url
                                (default: ./transform.js)
  -v, --verbose=0|1|2           show more information about the transform process
                                (default: 0)
      --version                 print version and exit
      --fail-on-error           return a 1 exit code when errors were found during execution of codemods
```

This passes the source of all passed through the transform module specified
with `-t` or `--transform` (defaults to `transform.js` in the current
directory). The next section explains the structure of the transform module.

## Usage from JS Source

Here is an example:

```js
➜  hello-jscodeshift git:(master) ✗ cat use-jscodeshift.js 
const path = require('path');
const { run: jscodeshift } = require("jscodeshift/src/Runner");

const transformPath = path.join(__dirname, "hello-jscodeshift.js");
const paths = ["foo.js", "foo2.js"];
const options = {
  dry: true, // dry run (no changes are made to files)
  print: true, // print transformed files to stdout, useful for development
  verbose: 2, // show more information about the transform process (up to 2)
};

async function run() {
  const res = await jscodeshift(transformPath, paths, options);
  console.log(res);
}

run();

// ✗ node use-jscodeshift.js
// Processing 2 files... 
// Spawning 2 workers...
// Running in dry mode, no files will be written! 
// Sending 1 files to free worker...
// Sending 1 files to free worker...
// var bar = 4;
// console.log(bar*bar /* square foo */);
// console.log("more foo");
// var bar = 4;
// console.log(bar+bar /* twice foo */);
// console.log("foo");
//  OKK foo2.js
//  OKK foo.js
// All done. 
// Results: 
// 0 errors
// 0 unmodified
// 0 skipped
// 2 ok
// Time elapsed: 0.456seconds 
// {
//   stats: {},
//   timeElapsed: '0.456',
//   error: 0,
//   ok: 2,
//   nochange: 0,
//   skip: 0
// }
```

## How to write the transformation module

See section [How to write the transformation module](jscodeshift-transformation-module)

## The jscodeshift API

See section [The jscodeshift API](jscodeshift-api)


[npm]: https://www.npmjs.com/
[Mozilla Parser API]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API
[recast]: https://github.com/benjamn/recast
[ast-types]: https://github.com/benjamn/ast-types
[ast-explorer]: http://astexplorer.net/


## References

See the section [references about AST transformations](tree-transformations-references) 