---
title: Introducción al Análisis Sintáctico
---

## Introducción A los Analizadores Sintácticos

Después de la fase de análisis léxico la siguiente fase en la construcción del analizador es la fase de
análisis sintáctico. Esta toma como entrada el flujo de terminales y
construye como salida el [árbol de análisis sintáctico abstracto](ast-description).

Existen diferentes métodos de análisis sintáctico. La mayoría caen en
una de dos categorías: 

1. ascendentes y 
2. descendentes. 
 
Los ascendentes
construyen el árbol desde las hojas hacia la raíz. 

Los descendentes lo
hacen en modo inverso. 

El que describiremos aquí es un descendente: se denomina **método de análisis predictivo descendente recursivo**.
