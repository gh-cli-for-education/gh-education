
# 1º Task: Use of IAAS

## Repository instructions
* Following the instructions in the [SYTW repository/iaas-ull-en](https://github.com/SYTW/iaas-ull-en) deploy an example like the one in [crguezl/express-start](https ://github.com/crguezl/express-start) in your virtual machine of the [iaas.ull.es](https://iaas.ull.es) service.
* You can find a video of the teacher by entering [iaas.ull.es here](https://youtu.be/qKHgbV0lYbA).
     - [![iaas.ull.es](https://i3.ytimg.com/vi/qKHgbV0lYbA/hqdefault.jpg)](https://youtu.be/qKHgbV0lYbA)
     - The video is from 2018 and several of the apps used have changed versions but the essence of the methodology is the same
* Add in the `README.md` a small tutorial on how to use and deploy a web application in [iaas.ull.es](https://iaas.ull.es).
   - Take screenshots showing that your machine is well configured and working
* The dynamic IP of your virtual machine should not change if you don't turn it off. Post the deployment URL to your machine

## IAAS Environment

  - Install git if it is necessary
  - [Configure git](https://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez)
  - Change prompt to show the main branch. 
     - bash example. Write the file `~/.bash_profile` or `~/.bashrc` these lines:

     ```
     parse_git_branch() {
       git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
     }
     export PS1="\u@\h \[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ "
     ```

     - Also you can use [git prompt](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh)
     - Add somethig like this to PS1: `PS1="\$(git branch 2>/dev/null | sed -n 's/* \(.*\)/\1 /p')$ "`
     - Recuerde que si su prompt es muy largo siempre puede acortarlo con `PROMPT_DIRTRIM=1`
  - [git aliases](https://git-scm.com/book/tr/v2/Git-Basics-Git-Aliases)
  - [Install GitHub CLI](https://github.com/cli/cli) and learn to use it
    - [manual](https://cli.github.com/manual/)
  - Optionally you can install [linuxbrew](https://linuxbrew.sh/) 
  - Install [nvm](https://github.com/creationix/nvm)
  - Nistall nodeJS using nvm
  - [jshint](https://jshint.com/install/) y [jshint on vim](https://coderwall.com/p/zfhquw/jshint-in-vim) o JSLint o [equivalente](https://www.slant.co/topics/2411/~best-javascript-linting-tools)
    - Install [NERDTree](https://github.com/scrooloose/nerdtree) for vim
  - Install Express.js
      - [Express Web Framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) (Mozilla)