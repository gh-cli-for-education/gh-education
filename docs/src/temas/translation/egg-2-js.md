---
title: "Translating from Egg to JavaScript" 
categories: ["practicas"] 
permalink: "/practicas/generating-js"
rubrica:
  - "Se añadió  una opción -j --js al ejecutable o bien en su directorio bin hay un nuevo ejecutable egg2js.js que permite hacer la traducción"
  - "Traduce correctamente todos los ejemplos en la descripción de la práctica"
  - "La solución presentada respeta el principio OPEN/CLOSED"
  - "En lo posible se respeta la semántica de Egg y en dodne no se documenta apropiadamente"
  - "El número de constructos Egg traducidos es un criterio en la calificación de esta práctica"
  - "Opcional: Se proporciona información de localización (offset, etc.)"
  - Se ha hecho un buen uso del versionado semántico en la evolución del módulo
  - El superproyecto está correctamente estructurado usando submódulos
  - Se ha publicado en GitHub Registry 
  -
    - Pruebas
    - Se provee una carpeta `examples`  con ejemplos de programas `egg``
    - Se ha automatizado el proceso de pasar del "*ejemplo que funciona*" a "*test unitario que prueba que funciona*"
    - Se hace integración contínua tanto en desarrollo como en producción
  - 
    - Documentación
    - Ejecutables, Lenguaje, ASTs, etc.
    - Documentación del módulo npm (API) y ejecutables 
    - "Opcional: publicar la documentación de la API usando GitHub Pages en la carpeta `docs/`. Informe de cubrimiento"
--- 

# {{ $frontmatter.title }}

## Objetivos

Escriba un traductor desde el lenguaje [Egg](https://eloquentjavascript.net/12_language.html) hasta el lenguaje JavaScript.

Reutilice su parser para  crear los árboles sintácticos. Añada funciones de recorrido de los ASTs para ir generando el código JS.

## El Compilador

Añada al compilador una opción `-j --js`a su ejecutable o bien en su directorio `bin`  un nuevo ejecutable `egg2js.js` que permita hacer la traducción
 

## Un ejemplo sencillo: examples/times.egg

Cuando al programa se le proporciona una entrada con expresiones Egg de tipo *apply* como estas:

```ruby
$ cat examples/times.egg
print(
 +(3,
    *(4,
      5
    )
  ),
  -(9,3)
)
```

debería dar como salida un fichero `examples/times.js` con una salida parecida a esta:

```js
➜  crguezl-egg-2-js-2021 git:(main) ✗ bin/egg2js.js -j examples/times.egg 
➜  crguezl-egg-2-js-2021 git:(main) ✗ cat examples/times.js
const Egg = require("runtime-support");
Egg.print((3 + (4 * 5)), (9 - 3));
```

## Añadiendo Métodos a las Clases de los Nodos del AST

Una aproximación que he seguido a la hora de hacer esta práctica es añadir métodos `generateJS` a cada uno de los diferentes tipos de nodos del AST que se encarguen de la generación del código JS correspondiente a ese tipo de nodo:

```js
class Apply {
  ...
  generateJS() {
    let argsTranslations = this.args.map(x => x.generateJS())
    if (this.operator.type === 'word') {
      ...
    }
    else {
      ...
    }
  }
}
```

## Strategy Pattern Again: Un mapa de generadores de JS

Para facilitar la generación del código JS puede serle útil seguir el *Strategy Pattern* y tener un módulo que exporta un mapa/hash `generateJS` cuyas claves son 
las mismas que en `specialForms`y `topEnv` y los  valores son las correspondientes 
funciones de generación de código JS. De esta manera evitamos en lo posible violar el principio OPEN/CLOSED:

```js
const util = require('util');
const ins = x => util.inspect(x, { depth: null});
let generateJS = Object.create(null);

const ARITHM_OPERATORS = [ "+", "-", ... ">>>" ];
  
ARITHM_OPERATORS.forEach(op => {
  generateJS[op] = function([left, right]) {
      return `(${left} ${op} ${right})`;
    }
});
  
generateJS['print'] = function(...args) {
  ...
}

generateJS['do'] = function(statements) {
  ...
}

generateJS['def'] = function([variable, initexpression]) {
  ...
}


generateJS['='] = generateJS['set'] = function([variable, expression]) {
  ...
}

generateJS['fun'] = function(parameters) {
  ...
}

...

module.exports = {
  generateJS,
  ...
};
```

## Consideraciones semánticas 

El `do` en Egg retorna la última expresión evaluada, mientras que un bloque JS no es una expresión. 
Entonces no puedo traducir `do(...)` directamente a un bloque JS `{ ... }`.

Por eso `do(...)` se podría intentar traducir siguiendo este esquema:

```js
generateJS['do'] = function(statements) {
  debugger;
  let last = statements.pop();
  let translation = 
          '(() => {\n';
                    statements.forEach(s => translation += `  ${s}\n`)
  translation += `  return ${last}\n`
  translation += '})()\n';

  return translation;
}
```

en general, procure que cualquier programa JS resultante de la traducción de un programa Egg produzca los mismos resultados que cuando el programa Egg es interpretado.
 
## Librería de Soporte en Ejecución (Runtime Library)

Puede serle útil escribir una librería `runtime-support.js` con funciones que den soporte a la ejecución de los programas JS traducidos. Algo así:

```js
➜  crguezl-egg-2-js-2021 git:(main) ✗ cat lib/runtime-support.js 

function print(...args) {
    console.log(...args);
    return args;
}

 ...

module.exports = {
    print,
    ...
}
```

Por ejemplo, otra traducción para `print(4)` sería:

```js
const egg = require("runtime-support");
egg.print(4);
```

que queda mas simple que la anterior solución y que garantiza que `egg.print(4)` retorna un `4`.


## Un ejemplo mas complejo: Manejo de Ámbitos

Cuando se declaren variables y funciones y se creen nuevos ámbitos como en este ejemplo (supongamos que además de las funciones el `do` tiene su propio ámbito):

```js
✗ cat examples/hello-scope.egg
print("computed value = ", 
  do(
    def(x,4),
    def(inc, fun(w, do(
        def(y, 999),
        +(w,1)
      ) # do
    ) # fun
    ),# def
    def(z,-1),
    set(x, inc(x))
  )
)
```

La traducción debe producir el código JavaScript equivalente:

```
✗ bin/egg.js -j examples/hello-scope.egg
✗ cat examples/hello-scope.js              
```
```js
const Egg = require("runtime-support");
Egg.print("computed value = ", (() => {
    let $x = 4
    let $inc = function($w) {
        if (arguments.length !== 1) throw Error("Function called with wrong number of arguments");
        return (() => {
            let $y = 999
            return ($w + 1)
        })()

    }

    let $z = -1
    return $x = $inc($x)
})());
```

Note como prefijamos las variables del fuente con "`$`"  de manera que `def(x,4)` se convierte en:

```js
let $x = 4
```

esto es para que las *variables traducidas* no **colisionen** contra variables auxiliares que pudieramos necesitar introducir para dar soporte a la traducción.

Obsérvese como es la traducción que hemos hecho de un `do`: 

```js
do(
  def(y, 999),
  +(w,1)
) # do
```

lo hemos convertido en:

```js
(() => {
  let $y = 999
  return ($w + 1)
})()
```

Vea como se crea el ámbito mediante una función anónima `(() => { ... })()` que se ejecuta sobre la marcha *de manera que retorna la última expresión evaluada*.  

No hemos hecho uso de una traducción directa de un `do` por una sentencia compuesta 

```js
{ ... }
```
y nos hemos tomado estas molestias para respetar la semántica de Egg.

## Traduciendo applys sobre applys

Nótese que en Egg el operador de un apply puede ser a su vez un apply como en este ejemplo con la expresión `f(2)(4)`:

```js
➜  crguezl-egg-2-js-2021 git:(operator) ✗ cat examples/funfun.egg 
do(
  def(f, fun(x, fun(y, +(x,y)))),
  print(f(2)(4)) # 6
)
```

Es por tanto necesario traducir correctamente el operador: 

```
➜  crguezl-egg-2-js-2021 git:(main) ✗ cat examples/funfun.js
```
```js
const Egg = require("runtime-support");
(() => {
    let $f = function($x) {
        if (arguments.length !== 1) throw Error("Function called with wrong number of arguments");
        return function($y) {
            if (arguments.length !== 1) throw Error("Function called with wrong number of arguments");
            return ($x + $y)
        }

    }

    return Egg.print($f(2)(4));
})()
```

## Aspecto Visual del Código Generado

Puede usar algún módulo como este:

* [js-beautify](https://www.npmjs.com/package/js-beautify) npm module

para mejorar el aspecto visual del código de salida

## Simplificaciones

No hace falta añadir comprobaciones de errores de ámbito ni de tipo en esta fase.
Esto es, se asume que el código Egg es correcto y las variables han sido declaradas antes de su uso y que son usadas de acuerdo al tipo del valor que contienen.

No hace falta que traduzca el total de su lenguaje Egg, sólo las funcionalidades mas importantes. Deberían funcionar al menos los ejemplos usados en esta página.

Procure mantener la semántica de Egg pero no se complique si es difícil. Tanto si le resulta muy difícil o si decide cambiarla en algún punto, hágalo notar en la documentación.


## Referencias

* [Lab Generating JS 2020/2021](https://ull-esit-pl-2021.github.io/practicas/generating-js)
  * [labs generating js 2020/2021](https://github.com/orgs/ULL-ESIT-PL-2021/repositories?q=generating-js&type=all&language=&sort=)
* [Apuntes 2019/2020 de PL: Compilador de Egg a JS](https://ull-esit-pl-1819.github.io/introduccion/tfa/#compilador-de-egg-a-js)