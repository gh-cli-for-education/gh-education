---
title: GitHub-AluXXXX Form
date: 2022/02/14 00:50
kind: "task"
rubrica:
  - "Rellenado cuestionario GitHub-Alu"
---

## vuepress-plugin-global-variables

See `.vuepress/config.js`

{{ $var.example }}

{{ $var.organization }}

**Frustrated: Can not make links with variable substitution work!!**

They are rendered literally:

[{{ $var.organization.name }}]({{ $var.organization.url }})

## Math


<https://vuepress-community.netlify.app/en/plugins/mathjax/>

Euler's identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

$$\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right) 
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}$$

## Relative urls

Sometimes you may need to provide static assets that are not directly referenced in any of your Markdown or theme components (for example, favicons and PWA icons). In such cases, you can put them inside .vuepress/public and they will be copied to the root of the generated directory.

![Image from images folder](/images/ast.png)

## Site

<pre style="color: white">
{{ $site }}
</pre>

