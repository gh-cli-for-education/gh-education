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
import Teams from '../teams.mjs'

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