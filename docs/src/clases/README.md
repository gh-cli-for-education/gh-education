---
{
    "title": "Clases"
}
---

# {{ $frontmatter.title }}

<script>
    const path= require('path');
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

<ol>        
    <li v-for="page in classFiles"> <a :href="path.basename(page.path)">{{ page.title }}</a> 
    <ul><li>{{ page.frontmatter.summary }} month: {{ path.basename(page.path) }}</li></ul>
    </li>
</ol>

<ol>        
    <li v-for="page in classFiles"> <a :href="path.basename(page.path)">{{ page.title }}</a> 
    <pre style="color: white">
    {{ page}}
    </pre>
    </li>
</ol>

## Classes during the month of February

* [Lunes 2022/02/14](2022-02-14-leccion.html)

Introducción a la metodología de trabajo, primeras tareas y prácticas, bibliografía, sistema de evaluación, TFA, etc.

