<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente Student show information with more details
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 20/04/2023
 * @file Este fichero contiene el componente Student
-->

<template>
  <button type="button" @click="$emit('change', true)" cla> Go back </button>
  <br/>
  <div class="flex">
    <br/>
    <!-- Image for profile card picture -->
    <div class="media">
      <img :src="currentStudent.avatarUrl" :alt="currentStudent.userName" />
    </div>
    <!-- Summary of information about the team -->
    <div class="details">
      <div class="author">
        <p class="ghuser">{{currentStudent.userName}} github: <a :href="currentStudent.userUrl">{{ currentStudent.login }} </a> </p>
        <p class="ghuser">{{currentStudent.userName}} <a :href="currentStudent.repositoryUrl"> repositorio  </a> </p>
        <p class="ghuser">{{currentStudent.userName}} <a :href="currentStudent.notifications"> notificaciones </a> </p>
      </div>
    </div>
  </div>
  <!-- Top 10 reposiories of that student -->
  <p class="ghuser"> Recent projects: </p>
  <li v-for="(repository, section) in currentStudent.repositories['edges']" :key="section">
    {{currentStudent.userName}}  <a :href="repository['node']['commits']">Commits </a>, <a :href="repository['node']['issues']">Issues </a>, <a :href="repository['node']['summary']">Summary </a> for <a :href="repository['node']['url']"> {{repository["node"]["name"]}} </a>
  </li>
</template>

<script>
export default {
  props: {

    /**
     * Object data of the student to display the information
     */
    currentStudent: {
      type: Object,
      required: true,
    }
  }

}

</script>

<style scoped>
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