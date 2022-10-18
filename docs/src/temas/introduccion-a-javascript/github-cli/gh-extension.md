## gh Extensions

GitHub CLI extensions are repositories that provide additional gh commands.

The name of the extension repository must start with "gh-" and it must contain an executable of the same name. All arguments passed to the `gh &lt;extname>` invocation will be forwarded to the gh-&lt;extname> executable of the extension.

* gh extension subcommands
  *  create:     Create a new extension
  *  install:    Install a gh extension from a repository
  *  list:       List installed extension commands
  *  remove:     Remove an installed extension
  *  upgrade:    Upgrade installed extensions

inside my mac the gh extensions repos are stored in `~/.local/share/gh/extensions/`

```
➜  gh-learning git:(master) ✗ ls -la ~/.local/share/gh/extensions/
total 0
drwxr-xr-x  7 casianorodriguezleon  staff  224  6 oct 10:11 .
drwxr-xr-x  3 casianorodriguezleon  staff   96 17 sep 13:07 ..
drwxr-xr-x  7 casianorodriguezleon  staff  224  6 oct 10:11 gh-clone-org
drwxr-xr-x  5 casianorodriguezleon  staff  160  1 oct 17:18 gh-delete-repo
lrwxr-xr-x  1 casianorodriguezleon  staff   89  1 oct 16:23 gh-gitpod-open -> /Users/casianorodriguezleon/campus-virtual/shared/2021learning/gh-learning/gh-gitpod-open
drwxr-xr-x  8 casianorodriguezleon  staff  256 17 sep 13:07 gh-gp
drwxr-xr-x  8 casianorodriguezleon  staff  256 17 sep 13:19 gh-project
```

See also:

* [Creating GitHub CLI extensions](https://docs.github.com/es/github-cli/github-cli/creating-github-cli-extensions)
* [gh-extension](https://github.com/topics/gh-extension) list

### Examples of  extensions 

#### gh-clone-org

* [crguezl/gh-clone-org](https://github.com/crguezl/gh-clone-org)
* Original [matt-bartel/gh-clone-org](https://github.com/matt-bartel/gh-clone-org)

How it works:

```
[/tmp/chuchu]$rm  gh clone-org -s set-up -y -n
Retrieving the list of repositories: search/repositories?q=org%3AULL-MII-SYTWS-2122%20set-up
This would have cloned the following 5 repositories to /tmp/chuchu:
ULL-MII-SYTWS-2122/set-up-alu0100898293
ULL-MII-SYTWS-2122/set-up-PaulaExposito
ULL-MII-SYTWS-2122/set-up-alu0101102726
ULL-MII-SYTWS-2122/set-up-crguezl
ULL-MII-SYTWS-2122/set-up-Pmolmar
```

#### gh-submodule-add 

This is a extension written in Node.js

* [gh-submodule-add](https://github.com/crguezl/gh-submodule-add)
