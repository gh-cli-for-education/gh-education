<template>
  <div>
    <h2> Organization: {{ org["name"] }} </h2>
    <h2> Número de miembros: {{ equipos["totalCount"] }} </h2>
    <details v-for="(item, section) in equipos['edges']" :key="section">
        <summary> Equipo: {{ item["node"]["name"] }} </summary>
        <h3> Equipo: {{ item["node"]["name"] }} </h3>
        <div v-for="(miembro, section) in item['node']['members']['edges']" :key="section">
            <ghcard :image="`${miembro['node']['avatarUrl']}`" :name="`${miembro['node']['name']}`" :href="`${miembro['node']['url']}`" :ghuser="`${miembro['node']['login']}`" ></ghcard>
        </div>
    </details>
  </div>
  
</template>

<script>
import teams from '../publico/teams.js'
import ghcard from './ghcard.vue'

export default {
  components: {
    ghcard
  },
  data() {
    return {      
      equipos: teams["data"]["organization"]["teams"],
      org: teams["data"]["organization"]
    }
  }
  
}
</script>