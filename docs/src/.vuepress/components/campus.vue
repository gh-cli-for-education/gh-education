<template>
  <div>
    <ul>
      <li>
        <a :href="campus" target="_blank" rel="noopener noreferrer">Lab en el campus</a> 
      </li>
    </ul>
    <div style="color:white" class="language-js">
    </div>
    
   </div>
</template>

<script>
import * as path from "path";

export default {
  computed: {
     campus() {
      return this.$frontmatter.campus;
     },
  },
};
</script>
