<template>
  <ul>
    <li v-for="requirement in $frontmatter.rubrica" :key="requirement">
      <input type="checkbox" /><label><span v-html="requirement"></span></label>
    </li>
  </ul>
</template>
