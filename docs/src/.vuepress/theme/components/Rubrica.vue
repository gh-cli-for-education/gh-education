<template>
  <div id="rubrica">
    <ul>
      <li v-for="requirement in $frontmatter.rubrica" :key="requirement">
        <input type="checkbox" /><span v-html="requirement"></span>
        </label>
      </li>
    </ul>
  </div>
</template>
