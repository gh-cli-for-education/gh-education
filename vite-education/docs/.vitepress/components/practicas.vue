<template>
  <div>
    <ul>
      <li v-for="(practica, index) in practicas" :key="index">
        <h2>{{ practica.text }}</h2>
        <ul>
          <li  v-for="(item, section) in practica.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import practica from '../publico/practicas.js'

export default {
  data() {
    return {      
      practicas: practica.practicas
    }
  }
  
}
</script>