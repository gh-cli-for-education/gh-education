---
sidebar: auto
next: gh.md
prev: gh-api.md
---

# GraphQL Examples

**GraphQL** is a query language for web services APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more.

## Example: Number of repos in an Organization 

```
gh api graphql --paginate --field query=@org-num-repos.gql --jq .data.organization.repositories.totalCount
```

These are the contents of the file `org-num-repos.gql`:

```GraphQL
query {
  organization(login: "ULL-MII-SYTWS-2122") {
    repositories {
      totalCount
    }
  }
}
```

Execution:

```
✗ source org-num-repos.bash 
17
```

## Getting my repos

```
➜  graphql-learning git:(main) ✗ gh config set pager cat
➜  graphql-learning git:(main) ✗ cat my-repos.bash
gh api graphql --paginate -F number_of_repos=3 --field query=@my-repos.gql
```

In this example `$number_of_repos` is a variable that is set to `3` inside the command using the option `-F number_of_repos=3`

```
➜  graphql-learning git:(main) ✗ cat my-repos.gql 

query($number_of_repos:Int!){
  viewer {
    name
     repositories(last: $number_of_repos) {
       nodes {
         name
       }
     }
   }
}
```

Here is the output of an execution:      

```
➜  graphql-learning git:(main) ✗ gh api graphql --paginate -F number_of_repos=3 --field query=@my-repos.gql
```

```GraphQL
{
  "data": {
    "viewer": {
      "name": "Casiano Rodriguez-Leon",
      "repositories": {
        "nodes": [
          {
            "name": "asyncmap-crguezl"
          },
          {
            "name": "gh-clone-org"
          },
          {
            "name": "learning-graphql-with-gh"
          }
        ]
      }
    }
  }
}
```

## Example: Getting issues

Follows an example of query using GraphQL (see [The Example query in GitHub Docs](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-query)).

We can set the GraphQL query in a separated file:

```
➜  bin git:(master) cat gh-api-example.graphql
```
```graphql
query {
  repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") {
    issues(last:2, states:OPEN) {
      edges {
        node {
          title
          url
          labels(first:5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
```

To learn more, see the tutorial [Forming calls with GraphQL
](https://docs.github.com/en/free-pro-team@latest/graphql/guides/forming-calls-with-graphql).


Looking at the composition line by line:

```
query {
```

Because we want to read data from the server, not modify it, `query` is the **root operation**. (If you don't specify an operation, `query` is also the default.)

```
repository(owner:"ULL-MII-SYTWS-2021", name:"p01-t1-iaas-alu0101040882") 
```

To begin the query, we want to find a [repository object](https://docs.github.com/en/free-pro-team@latest/v4/object/repository). 

The `schema` validation indicates this object requires 
* an `owner` 
* and a `name` argument. 

A `schema` defines a **GraphQL API's type system**. It describes the complete set of possible data (objects, fields, relationships, everything) that a client can access

```
issues(last:2, states:OPEN) {
```

A **field** is a unit of data you can retrieve from an object. As the official GraphQL docs say: *The GraphQL query language is basically about selecting fields on objects*.

To account for all issues in the repository, we call the `issues` object. 

Some details about the `issues` object:

The docs tell us this object has the type [IssueConnection](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#issueconnection).

Schema validation indicates this object requires a `last` or `first` number of results as an argument, so we provide `2`.

The docs also tell us this object accepts a `states` argument, which is an `IssueState` enum that accepts `OPEN` or `CLOSED` values. 

To find only open issues, we give the states key a value of `OPEN`.

```
edges {
```

**Edges** represent connections between nodes. When you query a **connection**, you traverse its edges to get to its nodes.

We know **issues** is a *connection** because the Doc says it has the `IssueConnection` type. 

**Connections** let us query related objects as part of the same call. With connections, we can use a single GraphQL call where we would have to use multiple calls to a REST API. 

To retrieve data about individual issues, we have to access the node via edges.

```
node {
```

Here we retrieve the node at the end of the edge. 
The [IssueConnection docs](https://docs.github.com/en/free-pro-team@latest/v4/object/issueconnection) indicate the node at the end of the `IssueConnection` type is an `Issue` object.

Now that we know we're retrieving an `Issue` object, we can look at the [docs for issue](https://docs.github.com/en/free-pro-team@latest/graphql/reference/objects#issue)  and specify the fields we want to return:

```graphql
title
url
labels(first:5) {
  edges {
    node {
      name
    }
  }
}
```

Here we specify the `title`, `url`, and `labels` fields of the `Issue` object.

The `labels` field has the type [LabelConnection](https://docs.github.com/en/free-pro-team@latest/v4/object/labelconnection). As with the `issues` object, because `labels` is a connection, we must travel its `edges` to a connected `node`: the `label` object. At the node, we can specify the `label` object fields we want to return, in this case, `name`.

In `gh`, the `--field` flag behaves like `--raw-field` with magic type conversion based on the format of the value:

* literal values "true", "false", "null", and integer numbers get converted to appropriate JSON types;
* placeholder values ":owner", ":repo", and ":branch" get populated with values from the repository of the current directory;
* if the value starts with "@", the rest of the value is interpreted as a filename to read the value from. Pass "-" to read from standard input.

For GraphQL requests, all fields other than "query" and "operationName" are interpreted as GraphQL variables.

Execution:

```
➜  gh api graphql --paginate -F query=@gh-api-example.graphql | jq .
{
  "data": {
    "repository": {
      "issues": {
        "edges": [
          {
            "node": {
              "title": "Revisión",
              "url": "https://github.com/ULL-MII-SYTWS-2021/p01-t1-iaas-alu0101040882/issues/2",
              "labels": {
                "edges": [
                  {
                    "node": {
                      "name": "enhancement"
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

<!--
## Descripción de la práctica p6-t1-gh-cli

[Descripción de la práctica gh-cli]({{site.baseurl}}/practicas/p6-t1-gh-cli)
-->

## Mutation Example

```
➜  graphql-learning git:(main) cat findissueid.bash 
gh api graphql --paginate --field query=@findissueid.gql
➜  graphql-learning git:(main) cat findissueid.gql 
query FindIssueID {
  repository(owner:"crguezl", name:"learning-graphql-with-gh") {
    issue(number:2) {
      id
    }
  }
}
➜  graphql-learning git:(main) cat viewissue.bash 
gh issue -R crguezl/learning-graphql-with-gh view $@%                                                
➜  graphql-learning git:(main) cat addreactiontoissue.bash 
#!/bin/bash
# See
# https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#example-mutation 
# and
# https://docs.github.com/en/enterprise-server@3.0/graphql/guides/forming-calls-with-graphql
# for a list of supported emojis
gh api graphql --paginate --field query=@addreactiontoissue.gql 
➜  graphql-learning git:(main) cat addreactiontoissue.gql 
mutation AddReactionToIssue {
  addReaction(input:{subjectId:"I_kwDOGLyMF84838wt",content:ROCKET}) {
    reaction {
      content
    }
    subject {
      id
    }
  }
}
```
