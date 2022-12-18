<template>
    <div class="card">
      <h3 class="name">{{ name }}</h3>
      <div class="flex">
        <div class="media">
          <img :src="image" :alt="ghuser" />
        </div>
        <div class="details">
          <div class="author">
            <p class="ghuser">{{name}} github: <a :href="href">{{ ghuser }} </a> </p>
            <p class="ghuser">{{name}} <a :href="repositoryUrl"> repositorio  </a> </p>
            <p class="ghuser">{{name}} <a :href="notifications"> notificaciones </a> </p>
            <p class="ghuser"> Proyectos recientes: </p>
            <li v-for="(repository, section) in repositories['edges']" :key="section">
              <a :href="repository['node']['url']"> {{repository["node"]["name"]}} </a>
            </li>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ghuser: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    repositories: {
      type: Object,
      required: true,
    },
    repositoryUrl: {
      type: String,
      required: true,
    },
    notifications: {
      type: String,
      required: true,
    },
  }
};
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
  width: 35%;
  height: 50%;
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