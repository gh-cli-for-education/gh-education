
ORG="ULL-MII-SYTWS-2223"

QUERY='query getInfo($organization: String!) {
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
              }
            }
          }
          url
        }
      }
    }
  }
}'

TEAMS=$(gh api graphql -F organization="$ORG" -f query="$QUERY")

TEMPLATE="
export default "$TEAMS"
"

echo $TEMPLATE 