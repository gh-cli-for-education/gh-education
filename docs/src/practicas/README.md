---
title: Tasks and Labs
permalink: /practicas/index.html
sidebar: false
---

<script>
    const path= require('path');
    export default { 
        data() {
            return {
                path: path,
                currentMonth: 0,
                page: null,
                date: null,
                class: ''
            }
        },
        methods: {
            getClassLink(page) {
                let prefix = this.$site.base+'clases/';
                let m = /(\d+[/-]\d+[/-]\d+)/.exec(page.relativePath);
                if (m) {
                  return prefix+m[1]+'-leccion';
                }
                else 
                  return null
            },
            getDate(page) {
                let m = /(\d+[/-]\d+[/-]\d+)/.exec(page.relativePath);
                return m? m[1] : null
            }
        },
        computed: {
            labFiles() {
                let pages = this.$site.pages.sort((a,b) => Number(a.frontmatter.order) - Number(b.frontmatter.order));           
                return pages.filter(page => /practicas.\d+/.test(page.relativePath));
            }, 
        }
    }
</script>

# {{ $frontmatter.title }}

<ol>        
    <li v-for="page in labFiles"> 
        <span v-if="page.frontmatter.kind == 'task'">Task</span>
        <span v-else>Lab</span>
        <a :href="path.basename(page.path)">{{ page.title }}</a> 
        See class <a :href="getClassLink(page)">{{ getDate(page) }}</a>
    </li>
</ol>

