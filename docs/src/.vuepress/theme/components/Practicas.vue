<template>
  <div>
    <ol>
      <li
        v-for="page in labFiles" :key="page.key">
        <span v-if="page.frontmatter.kind == 'task'">Task</span>
        <span v-else>Lab</span>
        <a :href="'/practicas/' + path.basename(page.path)">{{ page.title }}</a>
        <!-- todo: reference related lessons? -->
      </li>
    </ol>
  </div>
</template>

<script>
import * as path from "path";

export default {
  data() {
    return {
      path: path,
      currentMonth: 0,
      page: null,
      date: null,
      class: "",
    };
  },
  methods: {
    getClassLink(page) {
      let prefix = this.$site.base + "clases/";
      let m = /(\d+[/-]\d+[/-]\d+)/.exec(page.relativePath);
      if (m) {
        return prefix + m[1] + "-leccion";
      } else return null;
    },
    getDate(page) {
      return page.date;
    },
  },
  computed: {
    labFiles() {
      let pages = this.$site.pages;
      let labs = pages.filter((page) => page.frontmatter.published && /practicas.[a-z\d]/.test(page.relativePath)
      ); // Ignore files starting for uppercase as README.md
      return labs.sort(
        (a, b) => Number(a.frontmatter.order) - Number(b.frontmatter.order)
      );
    },
  },
};
</script>
