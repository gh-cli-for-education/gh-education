import{_ as e,o as a,c as t,O as r}from"./chunks/framework.daddc858.js";const f=JSON.parse('{"title":"1º Task: Use of IAAS","description":"","frontmatter":{},"headers":[],"relativePath":"tasks/iaas.md","filePath":"tasks/iaas.md","lastUpdated":null}'),l={name:"tasks/iaas.md"},s=r(`<h1 id="_1o-task-use-of-iaas" tabindex="-1">1º Task: Use of IAAS <a class="header-anchor" href="#_1o-task-use-of-iaas" aria-label="Permalink to &quot;1º Task: Use of IAAS&quot;">​</a></h1><h2 id="repository-instructions" tabindex="-1">Repository instructions <a class="header-anchor" href="#repository-instructions" aria-label="Permalink to &quot;Repository instructions&quot;">​</a></h2><ul><li>Following the instructions in the <a href="https://github.com/SYTW/iaas-ull-en" target="_blank" rel="noreferrer">SYTW repository/iaas-ull-en</a> deploy an example like the one in [crguezl/express-start](https 😕/github.com/crguezl/express-start) in your virtual machine of the <a href="https://iaas.ull.es" target="_blank" rel="noreferrer">iaas.ull.es</a> service.</li><li>You can find a video of the teacher by entering <a href="https://youtu.be/qKHgbV0lYbA" target="_blank" rel="noreferrer">iaas.ull.es here</a>. <ul><li><a href="https://youtu.be/qKHgbV0lYbA" target="_blank" rel="noreferrer"><img src="https://i3.ytimg.com/vi/qKHgbV0lYbA/hqdefault.jpg" alt="iaas.ull.es"></a></li><li>The video is from 2018 and several of the apps used have changed versions but the essence of the methodology is the same</li></ul></li><li>Add in the <code>README.md</code> a small tutorial on how to use and deploy a web application in <a href="https://iaas.ull.es" target="_blank" rel="noreferrer">iaas.ull.es</a>. <ul><li>Take screenshots showing that your machine is well configured and working</li></ul></li><li>The dynamic IP of your virtual machine should not change if you don&#39;t turn it off. Post the deployment URL to your machine</li></ul><h2 id="iaas-environment" tabindex="-1">IAAS Environment <a class="header-anchor" href="#iaas-environment" aria-label="Permalink to &quot;IAAS Environment&quot;">​</a></h2><ul><li><p>Install git if it is necessary</p></li><li><p><a href="https://git-scm.com/book/es/v1/Empezando-Configurando-Git-por-primera-vez" target="_blank" rel="noreferrer">Configure git</a></p></li><li><p>Change prompt to show the main branch.</p><ul><li>bash example. Write the file <code>~/.bash_profile</code> or <code>~/.bashrc</code> these lines:</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">parse_git_branch() {</span></span>
<span class="line"><span style="color:#A6ACCD;">  git branch 2&gt; /dev/null | sed -e &#39;/^[^*]/d&#39; -e &#39;s/* \\(.*\\)/ (\\1)/&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">export PS1=&quot;\\u@\\h \\[\\033[32m\\]\\w\\[\\033[33m\\]\\$(parse_git_branch)\\[\\033[00m\\] $ &quot;</span></span></code></pre></div><ul><li>Also you can use <a href="https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh" target="_blank" rel="noreferrer">git prompt</a></li><li>Add somethig like this to PS1: <code>PS1=&quot;\\$(git branch 2&gt;/dev/null | sed -n &#39;s/* \\(.*\\)/\\1 /p&#39;)$ &quot;</code></li><li>Recuerde que si su prompt es muy largo siempre puede acortarlo con <code>PROMPT_DIRTRIM=1</code></li></ul></li><li><p><a href="https://git-scm.com/book/tr/v2/Git-Basics-Git-Aliases" target="_blank" rel="noreferrer">git aliases</a></p></li><li><p><a href="https://github.com/cli/cli" target="_blank" rel="noreferrer">Install GitHub CLI</a> and learn to use it</p><ul><li><a href="https://cli.github.com/manual/" target="_blank" rel="noreferrer">manual</a></li></ul></li><li><p>Optionally you can install <a href="https://linuxbrew.sh/" target="_blank" rel="noreferrer">linuxbrew</a></p></li><li><p>Install <a href="https://github.com/creationix/nvm" target="_blank" rel="noreferrer">nvm</a></p></li><li><p>Nistall nodeJS using nvm</p></li><li><p><a href="https://jshint.com/install/" target="_blank" rel="noreferrer">jshint</a> y <a href="https://coderwall.com/p/zfhquw/jshint-in-vim" target="_blank" rel="noreferrer">jshint on vim</a> o JSLint o <a href="https://www.slant.co/topics/2411/~best-javascript-linting-tools" target="_blank" rel="noreferrer">equivalente</a></p><ul><li>Install <a href="https://github.com/scrooloose/nerdtree" target="_blank" rel="noreferrer">NERDTree</a> for vim</li></ul></li><li><p>Install Express.js</p><ul><li><a href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs" target="_blank" rel="noreferrer">Express Web Framework (Node.js/JavaScript)</a> (Mozilla)</li></ul></li></ul>`,5),i=[s];function o(n,h,p,c,u,d){return a(),t("div",null,i)}const g=e(l,[["render",o]]);export{f as __pageData,g as default};
