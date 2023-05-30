<!-- 
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Máster en Ingeniería Informática
 * Componente Ghcard shows information using card style
 * @author Carlos Díaz Calzadilla <alu0101102726@ull.edu.es>
 * @date 20/04/2023
 * @file Este fichero contiene el componente Ghcard
-->

<template>
  <div class="card">
    <h3 class="name">{{ name }}</h3>
    <div class="flex">
      <!-- Image for profile card picture -->
      <div class="media">
        <img :src="image" :alt="ghuser" />
      </div>
      <!-- Summary of information about the team -->
      <div class="details">
        <div class="author">
          <p class="ghuser">{{name}} github: <a :href="href">{{ ghuser }} </a> </p>
          <p class="ghuser">{{name}} <a :href="repositoryUrl"> repositorio  </a> </p>
          <p class="ghuser">{{name}} <a :href="notifications"> notificaciones </a> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

    /**
     * Name of the team
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * Image of the team
     */
    image: {
      type: String,
      required: true,
    },

    /**
     * GitHub username of the team
     */
    ghuser: {
      type: String,
      required: true,
    },

    /**
     * Link to the profile of the team
     */
    href: {
      type: String,
      required: true,
    },

    /**
     * Object with the top 10 repositories of the team in the organization
     */
    repositories: {
      type: Object,
      required: true,
    },

    /**
     * Link to the GitHub general repository
     */
    repositoryUrl: {
      type: String,
      required: true,
    },

    /**
     * Link to the GitHub notifications
     */
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