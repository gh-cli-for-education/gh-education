<template>
  <ul>
    <li v-for="(requirement, idx) in rubrica" :key="idx">
      <input type="checkbox" /><label>{{ req2html(requirement) }}</label>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      rubrica: $frontmatter.rubrica
    }
  },
  methods: {
    req2html(r) {
      console.log(r);
      if (Array.isArray(r)) {
        return 'isArray'
      }
      return "element";
    }
  }
}
</script>
