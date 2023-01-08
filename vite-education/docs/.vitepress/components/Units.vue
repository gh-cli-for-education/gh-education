<template>
  <div>
    <ul>
      <li v-for="(unit, index) in units" :key="index">
        <h2>{{ unit.text }}</h2>
        <ul>
          <li  v-for="(item, section) in unit.items" :key="section">
            <a :href="item.link">{{item.text}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import unit from '../public/units.js'

export default {
  data() {
    return {      
      units: unit.units
    }
  }
  
}
</script>