---
title: "GraphQL query to GitHub for teams"
prev: "/clases/2022-10-19-leccion.md"
next: "/practicas/intro2sd.md"
---

# {{ $frontmatter.title }}

```graphql
query getInfo($organization: String!) {
  organization(login: $organization) {
    teams(first: 100) {
      totalCount
      edges {
        node {
          name
          members(first: 100) {
            totalCount
            edges {
              memberAccessUrl
              node {
                name
                url
                email
                login
                
              }
            }
          }
          url
        }
      }
    }
  }
}
```