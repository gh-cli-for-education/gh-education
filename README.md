# Learning Vuepress

* <https://vuepress.vuejs.org/>
* [VueNYC - Introduction to VuePress - Evan You](https://youtu.be/lIv1ItUzktc) YouTube


## Plugins

* vuepress-plugin-global-variables
* vuepress-plugin-mathjax

## Vuepress eject

## Deploy to GH Pages

```
➜  docs git:(main) ✗ jq '.scripts' package.json 
{
  "dev": "vuepress dev src",
  "build": "vuepress build src",
  "deploy": "npm run build && gh-pages -d src/.vuepress/dist"
}
```

### base

```js
module.exports = {
  title: 'PROCESADORES DE LENGUAJES 2021/2022',
  base: "/vuepress-pl-prototype/",
  ...
}
```