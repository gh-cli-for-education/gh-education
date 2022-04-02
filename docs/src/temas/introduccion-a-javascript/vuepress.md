---
sidebar: false
---
# How to Deploy to GitHub Pages a VuePress Report

Estando en la raíz de nuestra práctica emitimos el comando:

```
npx create-vuepress-site
```

Respondemos a todas las preguntas con las respuestas por defecto

Instalamos:

```
cd docs
npm install
```

Editamos el fichero `docs/src/.vuepress/config.js` y añadimos como valor de `base`:

```js
➜  docs git:(master) ✗ head -n 5  src/.vuepress/config.js
const { description } = require('../../package')

module.exports = {
  base: "/egg-parser-diego-perez-garcia-alu0101345918/report/",
```

Sustituya `/egg-parser-diego-perez-garcia-alu0101345918` por su correspondiente `assignmentName-team` 

Nos vamos al `docs/package.json` que `create-vuepress-site` ha creado y modificamos el  script `build` como sigue:

```json
➜  docs git:(master) ✗ jq '.scripts' package.json
{
  "dev": "vuepress dev src",
  "build": "vuepress build src -d report"
}
```

Esto hará que los HTML generados por Vuepress queden en `docs/repotrt`. 

Ahora comprobemos en local nuestro despliegue. Estando en `docs/src` escribimos:

```
npm run dev
```


La url de despliegue que estamos viendo en el browser debería ser algo con el patrón 

`http://localhost:8081/egg-parser-diego-perez-garcia-alu0101345918/report/`

esto es, debe seguir el patrón  `/nombre-del-repo/report/`

A continuación construimos el site:

```
npm run build
```

Esto debería producir un directorio `docs/report` con los ficheros generados:

```
➜  docs git:(master) ✗ ls report
404.html   assets     config     guide      index.html
```

Añada `docs/report` al control de versiones (`git add docs`, etc.).

Visite su repo en GitHub. Active las GitHub pages de su report desde la rama principal con directorio `docs` como fuente y haga un `push`.

Debería poder ver el informe en el subdirectorio `report`de su despliegue.





