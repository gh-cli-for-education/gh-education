<template>
  <div>
    <ul>
      <li v-for="(clase, index) in clases" :key="index">
        <h2>{{ clase.text }}</h2>
        <ul>
          <li  v-for="(item, section) in clase.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import clase from '../clases-publicadas.js'

export default {
  data() {
    return {      
      clases: clase.clases
    }
  }
  
}
</script>
