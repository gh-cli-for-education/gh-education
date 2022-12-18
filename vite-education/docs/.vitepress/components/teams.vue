<template>
  <div>
    <h2> Organization: {{ org["name"] }} </h2>
    <h2> Número de equipos: {{ totalCount}} </h2>
    <div v-for="(team, section) in teams" :key="section">
        <h3> Equipo: {{ team.name }} {{section + 1}} / {{ totalCount }} </h3>
        <ghcard :notifications="team.notifications" :repositoryUrl="team.repositoryUrl" :image="team.avatarUrl" :repositories="team.repositories" :name="team.userName" :href="team.userUrl" :ghuser="team.login" ></ghcard>
        
    </div>
  </div>
  
</template>

<script>
import Teams from '../publico/teams.js'
import ghcard from './ghcard.vue'

export default {
  components: {
    ghcard
  },
  data() {
    return {      
      equipos: Teams["data"]["organization"]["teams"]['edges'],
      org: Teams["data"]["organization"],
      totalCount: Teams.data.organization.teams.totalCount
    }
  },
  computed: {
    teams() {
      return this.equipos.map(team => {
        let node = team.node
        let member = node.members.edges[node.members.edges.length - 1].node
        const user = {
          name: node.name,
          node: node,
          url: node.url,
          login: member.login,
          avatarUrl: member.avatarUrl,
          repositoryUrl: member.url + '?tab=repositories',
          repositories: member.repositories,
          userName: member.name,
          userUrl: member.url,
          notifications: `https://github.com/notifications?query=author%3A${member.login}`,
        }
        return user
      })
    }
  }
  
}
</script>