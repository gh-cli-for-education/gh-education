<template>
  <div class="flex">
    <br/>
    <div class="media">
      <img :src="currentStudent.avatarUrl" :alt="currentStudent.userName" />
    </div>
    <div class="details">
      <div class="author">
        <p class="ghuser">{{currentStudent.userName}} github: <a :href="currentStudent.userUrl">{{ currentStudent.login }} </a> </p>
        <p class="ghuser">{{currentStudent.userName}} <a :href="currentStudent.repositoryUrl"> repositorio  </a> </p>
        <p class="ghuser">{{currentStudent.userName}} <a :href="currentStudent.notifications"> notificaciones </a> </p>
      </div>
    </div>
  </div>
  <p class="ghuser"> Recent projects: </p>
  <li v-for="(repository, section) in currentStudent.repositories['edges']" :key="section">
    {{currentStudent.userName}}  <a :href="repository['node']['commits']">Commits </a>, <a :href="repository['node']['issues']">Issues </a>, <a :href="repository['node']['summary']">Summary </a> for <a :href="repository['node']['url']"> {{repository["node"]["name"]}} </a>
  </li>
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
  width: 20%;
  height: 35%;
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