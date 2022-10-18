---
title:  "\"Introduction to Systems Development\" and Static Generators"
published: true
date: "2022/10/10 01"
delivery: "2022/10/27"
campus: "https://campusdoctoradoyposgrado2223.ull.es/mod/assign/view.php?id=820"
key: intro2sd
layout: Practica
order: 6
prev: iaas.md
next: asyncmap.md
rubrica:
  - "Se ha desplegado el sitio Web en GitHub pages usando Jekyll"
  - Se resumen correctamente los conceptos del capítulo
  - "Kanban Board project conteniendo las incidencias de la rúbrica"
  - "Despliegue en netlify"
  - Se ha creado una Jekyll Collection 
  - Se ha hecho uso de liquid (mostrar ejemplo en el informe)
  - Se ha hecho uso de un .csv o .json en `_data` (mostrar ejemplo en el informe)
  - "Página personal en GitHub Pages"
  - "Página personal en GitHub Pages enlazada desde el perfil GitHub del alumno"
  - "Ha entregado el .zip en el campus con el repo"
---

# {{ $frontmatter.title }}

Lea el capítulo 1 del libro 

::: tip Referencia
Ahmed, Tahir, Cadle, James, Cox, Julian, Girvan, Lynda, Paul, Alan, Paul, Debra, Thompson, Pete, and BCS, The Chartered Institute for IT. **Developing Information Systems: Practical Guidance for IT Professionals**. Swindon U.K: BCS Learning & Development Limited, 2014. Web.
:::

Haga un resumen de los conceptos más importantes del capítulo y publíquelo como un post usando [Jekyll](/temas/web/jekyll) y [GitHub Pages](https://pages.github.com/) para desplegar el sitio web con el informe.

El template usa el tema [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/).

Puede encontrar el pdf y el HTML del libro en este enlace:

* [Capítulo 1: Introduction to Systems Development](https://ebookcentral-proquest-com.accedys2.bbtk.ull.es/lib/bull-ebooks/detail.action?docID=1713962#) 

para acceder al capítulo es conveniente que está conectado a la red de la ULL y al [PuntoQ](https://www.ull.es/servicios/biblioteca/servicios/puntoq/) de la BULL.

Recuerde cambiar `baseurl` en `_config.yml` para que contenga el nombre de su repositorio en GitHub:

```yaml
baseurl                  : "/intro2sd-template/" # the subpath of your site, e.g. "/blog"
```

Haga un segundo despliegue en Netlify. Netlify no forma parte del Pack de GH así que tendrá que cambiar la visibilidad de su repo a público. 
Puede usar las referencias:

* [A Step-by-Step Guide: Jekyll 3.0 on Netlify](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/)
* [A Step-by-Step Guide: Jekyll 4.0 on Netlify](https://www.netlify.com/blog/2020/04/02/a-step-by-step-guide-jekyll-4.0-on-netlify/)


Con lo aprendido desarrolle su página personal en GitHub (si no es que ya tiene una).
