<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente Teams display the summary of all the teams of an organization
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 20/04/2023
 * @file Este fichero contiene el componente Teams
-->

<template>
  <!-- Show the view of all the teams -->
  <div v-if="main">
    <h1> Teams </h1>
    <h2> Organization: {{ org["name"] }} </h2>
    <h2> Number of teams: {{ totalCount}} </h2>
    <!-- Display all teams and create a ghcard for each of them -->
    <div v-for="(team, section) in teams" :key="section">
      <h3> Equipo: {{ team.name }} {{section + 1}} / {{ totalCount }} </h3>
      <ghcard @click="goStudent(false, team)" :notifications="team.notifications" :repositoryUrl="team.repositoryUrl" :image="team.avatarUrl" :repositories="team.repositories" :name="team.userName" :href="team.userUrl" :ghuser="team.login" ></ghcard>
    </div>
  </div>

  <!-- Show the view of one of the teams -->
  <div v-else>
    <h1> Student {{currentStudent.name}} </h1>
    <student :currentStudent="currentStudent"> </student>
  </div>
  
</template>

<script>
import ghcard from './Ghcard.vue'
import student from './Student.vue'

export default {
  components: {
    ghcard,
    student
  },
  data() {
    return {  

      /**
       * View all teams or only one
       * @values true, false
       */
      main: true,    

      /**
       * Information about the student to display
       */ 
      currentStudent: {},  

      /**
       * All teams information
       */ 
      teamsArray: [],  

      /**
       * Name of the GitHub organization
       */ 
      org: "",  

      /**
       * Total number of teams in the GitHub organization
       */ 
      totalCount: 0
    }
  },
  computed: {
    /**
     * Create teams array with the important information like:
     *  - name: Name of the team
     *  - node: Information about the team
     *  - url: Link to the team GitHub profile page
     *  - login: User GitHub nickname
     *  - avatarUrl: Link to the profile picture
     *  - repositoryUrl: Link to the repositories
     *  - repositories: Object with the information of repositories (name, url, commits, issues and summary)
     *  - userName: Name of the student of the team
     *  - userUrl: Link to the GitHub profile of the student
     *  - notifications: Link to the GitHub notifications 
     */
    teams() {
      const organization = "gh-cli-for-education";
      const Teams = this.refreshQueris(organization);
      this.teamsArray = Teams["data"]["organization"]["teams"]['edges'];
      this.org = Teams["data"]["organization"];
      this.totalCount = Teams.data.organization.teams.totalCount;

      return this.teamsArray.map(team => {
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
    /**
     * 
     * @param {Boolean} state 
     * @param {Boolean} team 
     */
    goStudent(state, team) {
      this.main = state;
      this.currentStudent = team;
      console.log(this.main);
    }
  }  
}
</script>