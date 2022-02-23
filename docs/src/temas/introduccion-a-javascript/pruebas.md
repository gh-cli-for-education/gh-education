---
title: Pruebas, Integración y Calidad
---

<script>
  import * as Temas from '@config/temas-publicados.js'
  
  //console.log(Temas);
  export default {
      created() {
        let index = Temas.findIndex(t => t.link == this.$page.path);
        //console.log(index);
        if (index > 0) this.$frontmatter.prev = Temas[index-1].link;
        if (index < Temas.length-1) this.$frontmatter.next = Temas[index+1].link;
      },
  
  }
</script>

# Pruebas, Integración y Calidad

## Mocha 

* [MochaJS documentation](http://mochajs.org/)
* [Getting Started](http://mochajs.org/#getting-started)


## Jest

[Jest](https://jestjs.io/) es un framework de prueba de código abierto desarrollado por Facebook e integrado en el popular paquete de [create-react-app](https://github.com/facebook/create-react-app).

```
npm install --save-dev jest
```

Jest viene con capacidades de built-in mocking y aserción incorporadas. Además, Jest ejecuta sus pruebas simultáneamente en paralelo, lo que proporciona una ejecución de prueba más suave y más rápida.

Jest también proporciona [snapshots testing](https://jestjs.io/docs/en/snapshot-testing). 

* [Getting Started](https://jestjs.io/docs/en/getting-started)

!!!include(temas/introduccion-a-javascript/mocking-stubbing.md)!!!

## Referencias

* Mas sobre [Mocha](mocha) en estos apuntes
* Mas sobre [Jest](jest) en estos apuntes
* Stubbing and Mocking with the Sinon Library
  * [Sinon API](http://sinonjs.org/releases/v1.17.7/)
  * [Side effects of stubbing console in tests](https://gyandeeps.com/console-stubbing/)
  * [Unit Test like a Secret Agent with Sinon.js](http://elijahmanor.com/unit-test-like-a-secret-agent-with-sinon-js/) by Elijah Manor
* Apuntes del curso 16/17 sobre Herramientas para Pruebas
  * [Sección Pruebas en los Apuntes del curso 16/17](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/)
    * [Mocha](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html)
    * [Should](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/mocha.html#should)
    * [Chai](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/chai.html)
    * [Sinon](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/sinon.html)
    * [Karma](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/karma.html)
    * [Covering](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/covering.html)
    * [Blanket](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/blanket.html)
    * [Istanbul](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/istanbul.html)
    * [BrowserSync](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/browsersync.html)
* Travis
  * Mas en estos apuntes sobre [Travis](travis)
  * [Travis en los apuntes del curso 16/17](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/travis.html)
* Antiguos Apuntes sobre Pruebas en el Navegador/Browser
  * [Learning JavaScript Test-Driven Development by Example](https://www.sitepoint.com/learning-javascript-test-driven-development-by-example/) SitePoint Tutorial
  * [Mocha y Chai en el navegador. Apuntes del curso 15/16](https://casianorodriguezleon.gitbooks.io/pl1516/content/practicas/mochachaisinon.html)
  * [Testing your frontend JavaScript code using mocha, chai, and sinon. Nicolas Perriault](https://nicolas.perriault.net/code/2013/testing-frontend-javascript-code-using-mocha-chai-and-sinon/) 2013
   [Covering](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/covering.html) 16/17
    * [Blanket](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/blanket.html) 16/17
    * [Istanbul](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/istanbul.html) 16/17
    * [BrowserSync](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/apuntes/pruebas/browsersync.html) 16/17
