<template>
  <div>
    <h2>{{ totalCount }} Teams</h2>
    <ul>
      <li v-for="team in teams" :key="team.name"> <a :href="team.url">{{ team.name }}</a>
        <ul>
          <li><a :href="team.repositories" target="_blank">Repositories</a></li>
          <li><a :href="team.userUrl" target="_blank">{{ team.userName }}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
const Teams = {
  "data": {
    "organization": {
      "teams": {
        "totalCount": 5,
        "edges": [
          {
            "node": {
              "name": "ale_hernandez_liberon-alu0101225562",
              "members": {
                "totalCount": 1,
                "edges": [
                  {
                    "memberAccessUrl": "https://github.com/orgs/ULL-MII-SYTWS-2223/people/alu0101225562",
                    "node": {
                      "name": null,
                      "url": "https://github.com/alu0101225562",
                      "email": ""
                    }
                  }
                ]
              },
              "url": "https://github.com/orgs/ULL-MII-SYTWS-2223/teams/ale_hernandez_liberon-alu0101225562"
            }
          },
          {
            "node": {
              "name": "casiano-rodriguez-leon-alumnoudv4",
              "members": {
                "totalCount": 1,
                "edges": [
                  {
                    "memberAccessUrl": "https://github.com/orgs/ULL-MII-SYTWS-2223/people/casiano",
                    "node": {
                      "name": "Casiano",
                      "url": "https://github.com/casiano",
                      "email": "crguezl@ull.edu.es"
                    }
                  }
                ]
              },
              "url": "https://github.com/orgs/ULL-MII-SYTWS-2223/teams/casiano-rodriguez-leon-alumnoudv4"
            }
          },
          {
            "node": {
              "name": "claudio_nestor-yanes-mesa-alu0101229942",
              "members": {
                "totalCount": 1,
                "edges": [
                  {
                    "memberAccessUrl": "https://github.com/orgs/ULL-MII-SYTWS-2223/people/claudio4",
                    "node": {
                      "name": "Claudio Yanes",
                      "url": "https://github.com/claudio4",
                      "email": "me@claudio4.com"
                    }
                  }
                ]
              },
              "url": "https://github.com/orgs/ULL-MII-SYTWS-2223/teams/claudio_nestor-yanes-mesa-alu0101229942"
            }
          },
          {
            "node": {
              "name": "jordi-bas-balcells-alu100965315",
              "members": {
                "totalCount": 1,
                "edges": [
                  {
                    "memberAccessUrl": "https://github.com/orgs/ULL-MII-SYTWS-2223/people/JobabaEV",
                    "node": {
                      "name": null,
                      "url": "https://github.com/JobabaEV",
                      "email": ""
                    }
                  }
                ]
              },
              "url": "https://github.com/orgs/ULL-MII-SYTWS-2223/teams/jordi-bas-balcells-alu100965315"
            }
          },
          {
            "node": {
              "name": "santiago-villar-vazquez-alu0100990522",
              "members": {
                "totalCount": 1,
                "edges": [
                  {
                    "memberAccessUrl": "https://github.com/orgs/ULL-MII-SYTWS-2223/people/SantiagoVV",
                    "node": {
                      "name": null,
                      "url": "https://github.com/SantiagoVV",
                      "email": ""
                    }
                  }
                ]
              },
              "url": "https://github.com/orgs/ULL-MII-SYTWS-2223/teams/santiago-villar-vazquez-alu0100990522"
            }
          }
        ]
      }
    }
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  data() {
    return {
      rawTeams: Teams.data.organization.teams.edges,
      totalCount: Teams.data.organization.teams.totalCount,

    }
  },
  computed: {
    teams() {
      return this.rawTeams.map(team => {
        const user = {
          name: team.node.name,
          url: team.node.url,
          repositories: team.node.url + '/repositories',
          userName: team.node.members.edges[0].node.name || capitalizeFirstLetter(team.node.name.split(/[-_]/)[0]),
          userUrl: team.node.members.edges[0].node.url,
        }
        return user
      })
    }
  }
}
</script>