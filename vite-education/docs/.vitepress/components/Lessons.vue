<template>
  <div>
    <ul>
      <li v-for="(lesson, index) in lessons" :key="index">
        <h2>{{ lesson.text }}</h2>
        <ul>
          <li  v-for="(item, section) in lesson.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import lesson from '../public/lessons.js'

export default {
  data() {
    return {      
      lessons: lesson.data
    }
  }
  
}
</script>
