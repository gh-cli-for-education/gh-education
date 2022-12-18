<template>
  <div>
    <h2>{{ totalCount }} Teams</h2>
    <ul>
      <li v-for="team in teams" :key="team.name"> <a :href="team.url">{{ team.name }}</a>
        <ul>
          <li><a :href="team.repositories" target="_blank">Repositories</a></li>
          <li><a :href="team.userUrl" target="_blank">{{ team.userName }}</a></li>
          <li><a :href="team.notifications" target="_blank"> Notifications</a></li>  for you
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
        let node = team.node
        let member = node.members.edges[0].node;
        const user = {
          name: node.name,
          url: node.url,
          repositories: node.url + '/repositories',
          userName: member.name || capitalizeFirstLetter(node.name.split(/[-_]/)[0]),
          userUrl: member.url,
          notifications: `https://github.com/notifications?query=author%3A${member.login}`,
        }
        return user
      })
    }
  }
}
</script>