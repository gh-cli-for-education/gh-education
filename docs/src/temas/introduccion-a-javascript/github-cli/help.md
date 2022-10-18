---
title: gh help
permalink: /temas/github-cli/help.html
toc: 'auto'
next: /temas/github-cli/gh.md
---

# {{ $frontmatter.title }}

```
➜  dmsi2223apuntes git:(master) gh help
Work seamlessly with GitHub from the command line.
```

## USAGE

```
  gh <command> <subcommand> [flags]
```

## CORE COMMANDS

```
  auth:        Authenticate gh and git with GitHub
  browse:      Open the repository in the browser
  codespace:   Connect to and manage codespaces
  gist:        Manage gists
  issue:       Manage issues
  pr:          Manage pull requests
  release:     Manage releases
  repo:        Manage repositories
```

## ACTIONS COMMANDS

```
  run:         View details about workflow runs
  workflow:    View details about GitHub Actions workflows
```

## ADDITIONAL COMMANDS

```
  alias:       Create command shortcuts
  api:         Make an authenticated GitHub API request
  completion:  Generate shell completion scripts
  config:      Manage configuration for gh
  extension:   Manage gh extensions
  gpg-key:     Manage GPG keys
  help:        Help about any command
  label:       Manage labels
  search:      Search for repositories, issues, and pull requests
  secret:      Manage GitHub secrets
  ssh-key:     Manage SSH keys
  status:      Print information about relevant issues, pull requests, and notifications across repositories
```

## HELP TOPICS

```
  actions:     Learn about working with GitHub Actions
  environment: Environment variables that can be used with gh
  exit-codes:  Exit codes used by gh
  formatting:  Formatting options for JSON data exported from gh
  mintty:      Information about using gh with MinTTY
  reference:   A comprehensive reference of all gh commands
```

## EXTENSION COMMANDS

```
  activity
  alias
  biblio-add
  cimp
  code
  cp
  curl
  default-branch
  delete-repo
  edu
  edu-browse
  edu-data
  edu-plagiarism
  gp
  notify
  org-browse-repo
  org-clone
  org-members
  org-teams
  orgissuelist
  orgstats
  project
  repo-collab
  repo-pullreq
  repo-rename
  submodule-add
  submodule-rm
  team-add
  token
``` 

## FLAGS

```
  --help      Show help for command
  --version   Show gh version
```

## EXAMPLES

```
  $ gh issue create
  $ gh repo clone cli/cli
  $ gh pr checkout 321
```

## LEARN MORE

Use `gh <command> <subcommand> --help` for more information about a command.
ead the manual at <https://cli.github.com/manual>

## FEEDBACK

Open an issue using `gh issue create -R github.com/cli/cli`
