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
  <div v-if="main && ((role !== null) || role === 'Owner')">
    <div class="flex">
      <h1> Teams </h1> <button type="button" class="refresh" @click="refreshTeams()"> Refresh teams 🔄 </button>      
    </div>
    <h2> Organization: {{ org }} </h2>
    <h2> Number of teams: {{ totalCount}} </h2>
    <!-- Display all teams and create a ghcard for each of them -->
    <div v-for="(team, section) in teamsArray" :key="section">
      <h3> Equipo: {{ team.name }} {{section + 1}} / {{ totalCount }} </h3>
      <br/>
      <div class="card">
        <ghcard 
          :htmlUrl="team.htmlUrl" 
          :name="team.name"
          :desc="team.desc">
        </ghcard>
        <button type="button" @click="goTeam(false, team)"> More information </button>
      </div>
    </div>
  </div>

  <!-- Show the view of one of the teams -->
  <div v-if="!main && ((role !== null) || role === 'Owner')">
    <h1> Team {{currentTeam.name}} </h1>
    <Team :currentTeam="currentTeam" @change="goTeam(true, team)"> </Team>
  </div>
  
</template>

<script>
import ghcard from './Ghcard.vue'
import Team from './Team.vue'
import store from '../../public/data/store/index.js'
import { getApps } from 'firebase/app'

export default {
  components: {
    ghcard,
    Team
  },
  data() {
    return {  

      /**
       * View all teams or only one
       * @values true, false
       */
      main: true,    

      /**
       * Information about the Team to display
       */ 
      currentTeam: {},  

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
      totalCount: 0,

      /**
        * Role of the user in the GitHub organization
        */
      role:null
    }
  },
  methods: {
    /**
     * 
     * @param {Boolean} state 
     * @param {Boolean} team 
     */
    goTeam(state, team) {
      this.main = state;
      this.currentTeam = team;
    },

    async refreshTeams() {
      this.teamsArray = [];
      this.org = "";
      this.totalCount = 0;
      this.teamsArray = await this.getTeams();
    },

    async getTeams() {
      const storeData = store.getters.userData;
      const organization = import.meta.env.VITE_ORGANIZATION;
      const base_url = "https://github.com/" + organization;
      const orgTeamsEndpoint = "https://api.github.com/orgs/" + organization + "/teams";
      const teamsArray = [];
    
      const orgTeamsResponse = await fetch(orgTeamsEndpoint,{
          method: "GET",
          headers: {
              'X-GitHub-Api-Version': '2022-11-28',
              Authorization: `token ${storeData.token}` 
          }
        });
      
      const teamsOrganization = await orgTeamsResponse.json();

      for (const orgTeam of teamsOrganization) {
        const teamsRepositoryEndpoint = "https://api.github.com/orgs/"+ organization + "/teams/" + orgTeam.slug + "/repos";
        const orgTeamResponse = await fetch(teamsRepositoryEndpoint,{
            method: "GET",
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
                Authorization: `token ${storeData.token}` 
            }
          });
        
        const teamRepository = await orgTeamResponse.json();
        teamRepository.forEach( repo => {
          const repository = "/" + repo.name
          repo.url = base_url + repository;
          repo.issues_url = base_url + repository + "/issues";
          repo.commits_url = base_url + repository + "/commits";
          repo.notifications_url = base_url + repository + "/notifications";
        })

        const newTeam = {
          name: orgTeam.name,
          htmlUrl: orgTeam.html_url,
          desc: orgTeam.description,
          repositories: teamRepository
        }

        teamsArray.push(newTeam);
      };

      this.totalCount = teamsOrganization.length;
      this.org = organization;
      return teamsArray;
    }
  },
  
  async beforeMount() {
      if (getApps().length !== 0 ) {
        const storeData = store.getters.userData;
        this.role = storeData.role;
        this.teamsArray = (this.role !== null) ?  await this.getTeams() : [];
      }
  },
}
</script>

<style>

h1 {
  margin: 0;
}

.flex {
  display: flex;
  align-items: center;
}

.card {
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  margin-bottom: 1.5rem;
  overflow: hidden;
  width: 100%;
  height: 50%;
}

.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
  transition: ease-in-out 0.2s all;
}

button{
    background-color: #10B981;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    max-width: fit-content;
    margin-left: auto;
}

.refresh {
  float: right;
}
</style>