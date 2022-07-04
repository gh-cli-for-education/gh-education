# TypeScript

## Building, Debugging and Running TS

* [Build and Debug NodeJS Typescript with ONLY VSCODE. Basarat Codes](https://youtu.be/JdvkaW2xeiI) Youtube

Además he tenido que instalar como dependencias de desarrollo localmente:

ts-node y ts-config-paths

Este es el fichero `launch.json` usado para depurar `gh-edu.ts`:

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

special interest has the double asterics in `/js/**/*.js` allowing the debugging of other files, not only the main one. See 
<https://stackoverflow.com/questions/69326439/debug-multiple-files-in-typescript>

```js
      "outFiles": [
        "${workspaceFolder}/js/**/*.js"
      ]
```

## References

* [Build and Debug NodeJS Typescript with ONLY VSCODE. Basarat Codes](https://youtu.be/JdvkaW2xeiI) Youtube
* [TypeScript Documentation](https://www.typescriptlang.org/docs/home.html)
* [Cherny, Boris. Programming TypeScript. O'Reilly Media, 2019. Web](https://puntoq.ull.es/permalink/f/15vbjs7/ullsfx4100000008045440)
* [BOGDANmanate/mvp-ts](https://github.com/BOGDANmanate/mvp-ts) Bogdan Workshop repo with Conway's Game of Life
  * [Solution](https://github.com/bogdanmanate/mvp-ts/tree/stable)