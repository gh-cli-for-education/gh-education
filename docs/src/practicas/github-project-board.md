---
title: GitHub Project Board
date: "2022/10/03 02"
delivery: "2022/10/13"
published: true
layout: Practica
key: github-project-board
order: 3
prev: markdown.md
next: ides.html
rubrica:
  - "Proyecto Kanban creado a nivel de Organización"
  - "Lo estoy usando para informar del avance en mis prácticas"
  - "Convierto las notas en issues"
  - "Informe elaborado correcto"
---

# Práctica {{ $frontmatter.title }}

## A Project Board for each Lab

* Para cada práctica/asignación se creará un tablero kanban (GitHub Project Automated Kanban) asociado al repo de la práctica

  ![](/images/github-project-board-example.png)
* En este tablero de repo se crean inicialmente en la columna `TODO` al menos tantas incidencias como requisitos tiene la práctica
* Añada una columna `REVIEWED`
* Cuando en la corrección el profesor comenta que el requisito  esta cumplido lo pasamos a la columna `REVIEWED`. Si el profesor indica que algo esta mal debe convertirse en una nueva incidencia que deberá ir a `TODO`.  Cuando crea que la haya arreglado la mueve a `done` y creará una incidencia mencionando al profesor. 

## Organization Project Board

* Cree además un project board automated kanban de organización para el seguimiento de sus prácticas durante el curso.
* Este project board **se crea a nivel de organización** y no de repo.
* Tiene una sóla nota/incidencia por práctica o tarea (con el nombre de la tarea) que se asocia como incidencia al repo de la práctica
* La incidencia se moverá a la columna `done` cuando el alumno considere que está terminada. En ese momento creamos una incidencia mencionando al profesor y comunicándole que hemos finalizado la tarea. 

Sigue un ejemplo de como podría configurar la *vista de tabla* del organization project board de un alumno: con columnas `title`, `status` y `repository`

![](/images/organization-project-board-beta.png)

::: danger Cuidado!

Asegúrese de tener configurados como privados sus project boards
:::

## References

* [GitHub Docs: About project boards](https://docs.github.com/en/github/managing-your-work-on-github/about-project-boards)


