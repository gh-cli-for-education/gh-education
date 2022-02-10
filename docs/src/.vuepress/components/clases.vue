<template>
    <ol>        
        <li v-for="page in classFiles" :key="page.key"> <a :href="path.basename(page.path)">{{ page.title }}</a> 
        <ul><li>{{ page.frontmatter.summary }} month: {{ path.basename(page.path) }}</li></ul>
        </li>
    </ol>
</template>

<script>
    import * as path from 'path';

    export default { 
        data() {
            return {
                path: path,
                currentMonth: 0
            }
        },
        methods: {
            getMonth(page) {
                let m = /\d+\b.\b(\d+)/.exec(page.relativePath);
                return m? Number(m[1]) : null
            }
        },
        computed: {
            classFiles() {                
                return this.$site.pages.filter(page => /clases.\d+/.test(page.relativePath));
            }, 
        }
    }
</script>
