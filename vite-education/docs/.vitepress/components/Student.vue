<template>
  <div class="flex">
    <div class="media">
      <img :src="currentStudent.avatarUrl" :alt="currentStudent.userName" />
    </div>
    <div class="details">
      <div class="author">
        <p class="ghuser">{{currentStudent.userName}} github: <a :href="href">{{ currentStudent.login }} </a> </p>
        <p class="ghuser">{{currentStudent.userName}} <a :href="currentStudent.repositoryUrl"> repositorio  </a> </p>
        <p class="ghuser">{{currentStudent.userName}} <a :href="currentStudent.notifications"> notificaciones </a> </p>
        <p class="ghuser"> Proyectos recientes: </p>
        <li v-for="(repository, section) in currentStudent.repositories['edges']" :key="section">
          <a :href="repository['node']['url']"> {{repository["node"]["name"]}} </a>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
  width: 40%;
  height: 55%;
  object-fit: cover;
  object-position: center;
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