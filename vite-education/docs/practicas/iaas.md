---
title: Prácticas
permalink: /practicas
testVar: "https://www.google.com"
msg:  "<a href=\"https://www.google.com\">hello</a>"
google: "https://www.google.com"
develop: false
sidebar: auto
rubrica:
  - "códigos correctos"
  - "Informe bien elaborado"
---

# Práctica 1: Uso del IAAS

## Instrucciones repositorio
* Siguiendo las instrucciones en el  [repositorio SYTW/iaas-ull-es](https://github.com/SYTW/iaas-ull-es) despliegue un ejemplo como el que aparece en [crguezl/express-start](https://github.com/crguezl/express-start) en su máquina virtual del servicio [iaas.ull.es](https://iaas.ull.es).
* Puede encontrar un vídeo del profesor introduciendo el [iaas.ull.es aquí](https://youtu.be/qKHgbV0lYbA).
    - [![iaas.ull.es](https://i3.ytimg.com/vi/qKHgbV0lYbA/hqdefault.jpg)](https://youtu.be/qKHgbV0lYbA)
    - El vídeo es de 2018 y varias de las apps usadas han cambiado de versión pero la esencia de la metodología es la misma 
* Añada en el `README.md` un pequeño tutorial de como usar y desplegar una aplicación web en [iaas.ull.es](https://iaas.ull.es).
  - Haga capturas de pantalla que muestren que su máquina esta bien configurada y funcionando
* La IP dinámica de su máquina virtual no debería cambiar si no la apaga. Publique la URL de despliegue en su máquina

## Preparación de la máquina para poder trabajar

  - Instale git si es necesario
  - [Configura git](https://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez)
  - Procure que la rama actual aparezca en el prompt de la terminal. 
     - Ejemplo para una bash. Pon en el fichero `~/.bash_profile` o `~/.bashrc` estas líneas:

     ```
     parse_git_branch() {
       git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
     }
     export PS1="\u@\h \[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ "
     ```

     - También puede usar [git prompt](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh)
     - Puede añadir algo como esto a su PS1: `PS1="\$(git branch 2>/dev/null | sed -n 's/* \(.*\)/\1 /p')$ "`
     - Recuerde que si su prompt es muy largo siempre puede acortarlo con `PROMPT_DIRTRIM=1`
  - [git aliases](https://git-scm.com/book/tr/v2/Git-Basics-Git-Aliases)
  - [Instale GitHub CLI](https://github.com/cli/cli) y aprenda a usarla
    - [manual](https://cli.github.com/manual/)
  - Opcionalmente puede instalar [linuxbrew](https://linuxbrew.sh/) 
  - Instale [nvm](https://github.com/creationix/nvm)
  - Instale nodeJS usando nvm
  - [jshint](https://jshint.com/install/) y [jshint on vim](https://coderwall.com/p/zfhquw/jshint-in-vim) o JSLint o [equivalente](https://www.slant.co/topics/2411/~best-javascript-linting-tools)
    - Instale [NERDTree](https://github.com/scrooloose/nerdtree) para vim
  - Instale Express.js
      - [Express Web Framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) (Mozilla)