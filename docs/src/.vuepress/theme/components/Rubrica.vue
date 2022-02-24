<template>
  <div id="rubrica">
    <ul>
      <li v-for="(requirement, index) in $frontmatter.rubrica" :key="index">

        <span v-if="!Array.isArray(requirement)">
          <input type="checkbox" />
            <label v-html="requirement"></label>
        </span>
        <span v-else>
          <input type="checkbox" />
               <label v-html="first(requirement)"></label>
          <ul>
            <li v-for="(subreq, idx) in requirement" :key="idx">
               <input type="checkbox" />
               <label v-html="subreq"></label>
            </li>
          </ul>
        </span>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    rubrica() {
      return this.$frontmatter.rubrica
    } 
  },
  methods: {
    first(r) {
      return r.shift();
    }
  }
}
</script>
