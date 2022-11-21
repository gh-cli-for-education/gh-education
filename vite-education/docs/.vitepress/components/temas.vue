<template>
  <div>
    <ul>
      <li v-for="(tema, index) in temas" :key="index">
        <h2>{{ tema.text }}</h2>
        <ul>
          <li  v-for="(item, section) in tema.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import themes from '../temas-publicados.js'

export default {
  data() {
    return {      
      temas: themes.temas
    }
  }
  
}
</script>