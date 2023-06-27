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
    <!-- Summary of information about the team -->
    <div class="details">
      <h3 class="name">{{ name }}</h3>
      <div class="author">
        <p class="ghuser">Description: {{ desc }} </p>
        <p class="ghuser">GitHub: <a :href="htmlUrl"> link </a> </p>
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
     * Description of the team
     */
    desc: {
      type: String,
      required: true,
    },

    /**
     * Link to the profile of the team
     */
    htmlUrl: {
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