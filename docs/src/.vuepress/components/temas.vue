<template>
  <div>
    <ul>
      <div v-for="(tema, index) in temas" :key="tema.link">
        <li  v-if="index < temas.length-1">
          <a :href="tema.link">{{tema.text}}</a>
        </li>
      </div>

    </ul>
  </div>
</template>

<script>
import themes from '../temas-publicados.js'
export default {
  data() {
    return {
      temas: themes
    }
  },
  
}
</script>