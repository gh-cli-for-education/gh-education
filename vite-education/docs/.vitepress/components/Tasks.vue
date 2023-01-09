<template>
  <div>
    <ul>
      <li v-for="(task, index) in tasks" :key="index">
        <h2>{{ task.text }}</h2>
        <ul>
          <li  v-for="(item, section) in task.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import task from '../public/tasks.js'

export default {
  data() {
    return {      
      tasks: task.tasks
    }
  }
  
}
</script>