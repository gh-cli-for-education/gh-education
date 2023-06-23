<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente Team show information with more details
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 20/04/2023
 * @file Este fichero contiene el componente Team
-->

<template>
  <button type="button" @click="$emit('change', true)" cla> Go back </button>
  <br/>
  <div class="card">
    <br/>
    <!-- Summary of information about the team -->
    <div class="details">
      <div class="author">
        <p class="ghuser">{{currentTeam.name}} github: <a :href="currentTeam.htmlUrl"> link </a> </p>
      </div>
      <!-- Top 10 reposiories of that Team -->
      <p class="ghuser"> Recent projects: </p>
      <li v-for="(repository, section) in currentTeam.repositories" :key="section">
        {{currentTeam.name}}  <a :href="repository.commits_url">Commits </a>, <a :href="repository.issues_url">Issues </a>, <a :href="repository.notifications_url">Notifications </a> for <a :href="repository.url"> {{repository.name}} </a>
      </li>
      </div>
  </div>
</template>

<script>
export default {
  props: {

    /**
     * Object data of the Team to display the information
     */
    currentTeam: {
      type: Object,
      required: true,
    }
  }

}

</script>

<style scoped>

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
.flex {
  display: flex;
}

.media {
  width: 20%;
  height: 35%;
  object-fit: cover;
  object-position: center;
}



button{
    margin-top: 50px;
    background-color: #10B981;
    color: #ffffff;
    padding: 0 20px;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    margin-bottom: 2%;

    cursor: pointer;
}

.details {
  margin-left: 1.2rem;
}

.title {
  border-top: none;
  margin: 0 0;
}

.name {
  margin: 0 0;
  font-size: 1rem;
  color: #999;
}
</style>