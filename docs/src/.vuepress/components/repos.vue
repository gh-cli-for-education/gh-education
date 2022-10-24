<template>
  <div>
    <ul>
      <li>
        <a :href="repos" target="_blank" rel="noopener noreferrer">Repos</a> 
      </li>
    </ul>
    <div style="color:white" class="language-js">
    </div>
    
   </div>
</template>

<script>
import * as path from "path";
import SYTWS from "../sytws";

export default {
  computed: {
     campus() {
      return this.$frontmatter.campus;
     },
     repos() {
      return `https://github.com/orgs/${SYTWS.organization.name}/repositories?q=${this.$frontmatter.key}`
    },
  },
};
</script>
