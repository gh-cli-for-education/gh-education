# TypeScript

## Building, Debugging and Running TS 

### With Chrome

See the video *Debug Node.js apps with Chrome DevTools and TypeScript*

<youtube id="bV-DHjmwuZ0"></youtube>

We run the .js generated file 

```
node --inspect-brk fordebug/findbug.js
```

after compiling the .ts source with `tsc fordebug/findbug.ts --sourceMap true`:

```
➜  debug pwd
/Users/casianorodriguezleon/campus-virtual/2122/learning/typescript-learning/debug
➜  debug npm run debug

> debug@1.0.0 debug
> npm test; node --inspect-brk fordebug/findbug.js


> debug@1.0.0 test
> tsc fordebug/findbug.ts --sourceMap true

Debugger listening on ws://127.0.0.1:9229/013ee471-d752-447a-904e-6037b8d236d1
For help, see: https://nodejs.org/en/docs/inspector
```

Here is an example of a session with chrome:

![](/images/debugging-ts-with-chrome.png)


### With VSCode

Watch [Build and Debug NodeJS Typescript with ONLY VSCODE. Basarat Codes](https://youtu.be/JdvkaW2xeiI) Youtube

<youtube id="JdvkaW2xeiI"></youtube>

In addition I had to install as development dependencies locally:

ts-node and ts-config-paths

This is the `launch.json` file used to debug `gh-edu.ts`:

```js
{
  // Use IntelliSense para saber los atributos posibles.
  // Mantenga el puntero para ver las descripciones de los existentes atributos.
  // Para más información, visite: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-node",
      "request": "launch",
      "name": "debug gh-edu -h",
      "skipFiles": [
        "<node_internals>/**"
      ],
      // "preLaunchTask": "tsc: build - tsconfig.json",
      "program": "${workspaceFolder}/gh-edu.ts",
      "runtimeArgs": [ "-r", "ts-node/register", "-r", "tsconfig-paths/register" ],
      "args": [ "-h" ],
      "console": "integratedTerminal",
      "outFiles": [
        "${workspaceFolder}/js/**/*.js"
      ]
    }
  ]
}
```

special interest has the double asterics in `/js/**/*.js` allowing the debugging of other files, not only the main one. 
See 
<https://stackoverflow.com/questions/69326439/debug-multiple-files-in-typescript>

```js
      "outFiles": [
        "${workspaceFolder}/js/**/*.js"
      ]
```

## Introduction to TypeScript


### TypeScript - Tutorial desde CERO en Español 🏆

<youtube id="https://youtu.be/xtp_DuPxo9Q"></youtube>



### Tutorial TypeScript con Node.js y Express. ¡Crea tu API REST con tipos estáticos DESDE CERO!

<youtube id="https://youtu.be/ZpY5KdGQvwI"></youtube>


## Writing Modules in TypeScript

!!!include(includes/npm-ts.md)!!!


### Curso FullStack Open 

El curso **Profundización en el desarrollo web moderno**

<https://fullstackopen.com/es/>

📚 🧑‍💻 Presentación del curso y Fundamentos del Desarrollo Web - Bootcamp FullStack Gratuito

<youtube id="https://youtu.be/wTpuKOhGfJE"></youtube>

MiDuDev comienza aquí el Bootcamp FullStack gratuito con una introducción. Después de eso,  una descripción general de los conceptos básicos del desarrollo web y tambin habla sobre los avances en el desarrollo de aplicaciones web durante las últimas décadas.

## References

* [Build and Debug NodeJS Typescript with ONLY VSCODE. Basarat Codes](https://youtu.be/JdvkaW2xeiI) Youtube
* [TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)
* [Cherny, Boris. Programming TypeScript. O'Reilly Media, 2019. Web](https://puntoq.ull.es/permalink/f/15vbjs7/ullsfx4100000008045440)
* [BOGDANmanate/mvp-ts](https://github.com/BOGDANmanate/mvp-ts) Bogdan Workshop repo with Conway's Game of Life
  * [Solution](https://github.com/bogdanmanate/mvp-ts/tree/stable)