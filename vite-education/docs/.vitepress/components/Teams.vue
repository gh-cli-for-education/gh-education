<template>
  <div v-if="main">
    <h1> Teams </h1>
    <h2> Organization: {{ org["name"] }} </h2>
    <h2> Number of teams: {{ totalCount}} </h2>
    <div v-for="(team, section) in teams" :key="section">
      <h3> Equipo: {{ team.name }} {{section + 1}} / {{ totalCount }} </h3>
      <ghcard @click="goStudent(false, team)" :notifications="team.notifications" :repositoryUrl="team.repositoryUrl" :image="team.avatarUrl" :repositories="team.repositories" :name="team.userName" :href="team.userUrl" :ghuser="team.login" ></ghcard>
    </div>
  </div>

  <div v-else>
    <h1> Student {{currentStudent.name}} </h1>
    <student :currentStudent="currentStudent"> </student>
  </div>
  
</template>

<script>
import Teams from '../public/teams.js'
import ghcard from './Ghcard.vue'
import student from './Student.vue'

export default {
  components: {
    ghcard,
    student
  },
  data() {
    return {  
      main: true,     
      currentStudent: {},  
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
          repositories: member.organization.repositories,
          userName: member.name,
          userUrl: member.url,
          notifications: `https://github.com/notifications?query=author%3A${member.login}`,
        }

        for(let cnode = 0; cnode < user.repositories.edges.length; cnode++) {
          user.repositories.edges[cnode].node.commits = user.repositories.edges[cnode].node.url + '/commits/master';
          user.repositories.edges[cnode].node.issues = user.repositories.edges[cnode].node.url + '/issues';
          user.repositories.edges[cnode].node.summary = user.repositories.edges[cnode].node.url + '/pulse';

        }

        console.log(user.repositories)

        return user
      })
    }
  },
  methods: {
    goStudent(state, team) {
      this.main = state;
      this.currentStudent = team;
      console.log(this.main);
    },

  }  
}
</script>