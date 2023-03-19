<template>
  <div>
    <ul>
      <li v-for="(task, index) in general" :key="index">
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
export default {
  data() {
    return {      
      general: []
    }
  },
  props: {
    unit: {
      type: String,
      required: true,
    }
  },
  async mounted() {
    let info = await import(this.unit); 
    this.general = info.default.data;
  }
}
</script>