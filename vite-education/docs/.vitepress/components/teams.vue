<template>
  <div>
    <h2> Número de miembros: {{ equipos["totalCount"] }}</h2>
    <ul>
        <li  v-for="(item, section) in equipos['edges']" :key="section">
        <h3> {{item["node"]["name"]}} </h3>
        </li>
    </ul>
  </div>
</template>

<script>
import teams from '../publico/teams.js'

console.log(teams["data"]["organization"]["teams"]);

export default {
  data() {
    return {      
      equipos: teams["data"]["organization"]["teams"]
    }
  }
  
}
</script>