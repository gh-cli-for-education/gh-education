* [Manual de gh api](https://cli.github.com/manual/gh_api)

### Authentication Token

* [Manual de gh auth](https://cli.github.com/manual/gh_auth)
  * [Manual de gh auth login](https://cli.github.com/manual/gh_auth_login)

Go to [github.com/settings/tokens](https://github.com/settings/tokens)
to generate a new token for `gh` and set then environment variable 
`GITHUB_TOKEN` (`export GITHUB_TOKEN= ...`)

Para generar el token:

[user -> settings -> developer settings -> Personal access tokens](https://github.com/settings/tokens) 

o mas rápido vete a <https://github.com/settings/tokens>

Una vez se tiene un token:

```
# authenticate against github.com by reading the token from a file
$ gh auth login --with-token < mytoken.txt
```

También es posible autenticarse con el browser usando la opción `-w`:

```
➜  graphql-examples git:(main) ✗ gh auth login -w

! First copy your one-time code: F4D5-59E6
- Press Enter to open github.com in your browser...
```

Esto abre el browser, nos pide la contraseña que aparece arriba 

![](/images/gh-auth-browser-1.png)

y nos pide confirmar los permisos.


![](/images/gh-auth-browser-2.png)

### Example: Issues of a repo

Placeholder values `:owner`, `:repo`, and `:branch` in the endpoint argument will get replaced with values from the repository of the current directory.

```
$  gh api repos/:owner/:repo/issues
[
  {
    "url": "https://api.github.com/repos/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io/issues/5",
    "repository_url": "https://api.github.com/repos/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io",
    "labels_url": "https://api.github.com/repos/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io/issues/5/labels{/name}",
    "comments_url": "https://api.github.com/repos/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io/issues/5/comments",
    "events_url": "https://api.github.com/repos/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io/issues/5/events",
    "html_url": "https://github.com/ULL-MII-SYTWS-1920/ull-mii-sytws-1920.github.io/issues/5",
    "id": 715027457,
    "node_id": "MDU6SXNzdWU3MTUwMjc0NTc=",
    "number": 5,
    "title": "tema0-presentacion/practicas/pb-gh-campus-expert/",
    "user": {
      ...
    }
    ...
  }
]
```

We can pipe the output to [jq](jq) or use the [`-q` or `--jq` option of `gh api`](https://cli.github.com/manual/gh_api):

```
$  gh api repos/:owner/:repo/issues | jq '.[0] | .title'
"tema0-presentacion/practicas/pb-gh-campus-expert/"
```

Of course, we can explicit the repo and owner. For example:

```
➜ gh api repos/ULL-MII-SYTWS-2021/p01-t1-iaas-alu0101040882/issues | jq '.[0] | .user.login, .body'
"crguezl"
"Hola @alu0101040882, \r\n\r\nVeo que alguno ya está trabajando en la práctica de
```

### POST Example 

Let us see an example using the `POST` method. We will start from this `curl` example 
in the [GitHub API getting started guide](https://docs.github.com/en/free-pro-team@latest/rest/guides/getting-started-with-the-rest-api#repositories):

```
$ curl -i -H "Authorization: token 5199831f4dd3b79e7c5b7e0ebe75d67aa66e79d4" \
    -d '{ \
        "name": "blog", \
        "auto_init": true, \
        "private": true, \
        "gitignore_template": "nanoc" \
      }' \
    https://api.github.com/user/repos
```

and let us adapt to `gh api`. We use `-X` or `--method string`to set the HTTP method for the request (default `GET`) and `-f`to set the fields:

```
➜  /tmp gh api -X POST -f name=repo-prueba-gh-api -f private=true /user/repos
```

This way we have created a private repo inside the user scope:

![](/images/gh-api-post-create-repo.png)


```
➜  input-option git:(master) ✗ gh repo-delete crguezl/repo-prueba-gh-api
➜  input-option git:(master) ✗ gh api -f name=repo-prueba-gh-api -f private=true /user/repos
```

### Pagination

The option `--paginate`allow us to make additional HTTP requests to fetch 
all pages of results. Here is an example. 

```
➜  gh alias set get-repos 'api /orgs/$1/repos'
- Adding alias for get-repos: api /orgs/$1/repos
✓ Added alias.
➜  gh alias list
co:         pr checkout
get-repos:  api /orgs/$1/repos
``` 

```
➜ gh get-repos ULL-MII-SYTWS-2021
```

![](/images/gh-alias-repos.png)

Now  we can pipe the output to [jq](jq) to get the names of the repos:

```
➜  gh get-repos ULL-MII-SYTWS-2021 | jq '.[].full_name' -
"ULL-MII-SYTWS-2021/sytws-2021-meta"
"ULL-MII-SYTWS-2021/sytws2021-private"
"ULL-MII-SYTWS-2021/books-shared"
"ULL-MII-SYTWS-2021/p01-t1-iaas-fcohdezc"
"ULL-MII-SYTWS-2021/p01-t1-iaas-crguezl"
"ULL-MII-SYTWS-2021/p01-t1-iaas-alu0100886870"
...
```

Let ask for the repos in the PL organization for the course 19/20:

```
➜ gh api /orgs/ULL-ESIT-PL-1920/repos | jq '.[] | .name' | wc
      30      30    1088
```
It gave us 30 repos. There are much more than that in that organization.

If we use `--paginate` the request takes a long time and gives us near a thousand repos:

```
➜ gh api --paginate /orgs/ULL-ESIT-PL-1920/repos | jq '.[] | .name' | wc
     990     990   32868
```

###  Templates for the output

The option `-t, --template string`of `gh api`
allows to format the response using a [Go template](https://pkg.go.dev/text/template).

Here is an example of template:

::: v-pre
```
➜  gh-learning git:(master) ✗ cat template.gotemplate
Title: {{range .}}{{.title}}
Labels: ({{.labels | pluck "name" | join ", " | color "yellow"}})
Body: {{.body}}
{{end}}
```
:::

and let us use it:

```
➜  gh-learning git:(master) ✗ gh api repos/crguezl/learning-bash/issues --template "$(cat template.gotemplate)"
Title: issue de prueba
Labels: (bug, documentation, duplicate, enhancement, help wanted, good first issue, invalid, question)
Body: 👍  blah ...
```

The `Labels` appear in yellow.

* Véase [gh formatting](https://cli.github.com/manual/gh_help_formatting)
