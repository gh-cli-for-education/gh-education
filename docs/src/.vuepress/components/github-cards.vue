<template>
  <div id="app" class="ui container">
    <div class="ui link cards">
      <github-card v-for="user in users" :key="user" :username="user">
      </github-card>
    </div>
  </div>
</template>

<script>
import githubCard from "./github-card.vue";
export default {
  data() {
    return {
      users: [
        "crguezl",
        "casiano",
        "alu0101102726",
        "Pmolmar",
        "PaulaExposito",
        "alu0101228587",
        "alu0101227610",
        "alu0101232812",
        "lauramanzini",
        "TeresaUll",
        "ddialar",
        "alu0100898293",
        "mstoisor",
      ],
      components: {
        githubCard,
      },
    };
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css";
</style>
