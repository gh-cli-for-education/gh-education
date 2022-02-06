---
home: true
heroImage: "/images/escuela-politecnica-ingenieria-original.png"
heroLink: "https://www.ull.es/centros/escuela-superior-de-ingenieria-y-tecnologia/"
tagline: 
actionText:  "Clases"
actionLink: /clases/
actionText2:  "Chat"
actionLink2: "https://mail.google.com/chat/u/1/#chat/welcome"
actionText3:  "Organization"
actionLink3: "https://github.com/ULL-ESIT-PL-2122"

---

<div class="features">
  <div class="feature">
<h2>Campus Virtual</h2>
<campus-virtual></campus-virtual>
<!--<github-card username="crguezl"></github-card>-->
</div>

  <div class="feature">
    <a href="/temas/">
      <!--<img src="https://ecomputernotes.com/images/Translation-of-a-statement.jpg"/>-->
  

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
                return page.date
            }
        },
        computed: {
            labFiles() {
                let pages = this.$site.pages;           
                let labs =  pages.filter(page => /practicas.[a-z\d]/.test(page.relativePath)); // Ignore files starting for uppercase as README.md
                return labs.sort((a,b) => Number(a.frontmatter.order) - Number(b.frontmatter.order));
            }, 
        }
    }
</script>

<ol>        
    <li v-for="page in labFiles" v-if="page.frontmatter.published"> 
        <span v-if="page.frontmatter.kind == 'task'">Task</span>
        <span v-else>Lab</span>
        <a :href="'/practicas/'+path.basename(page.path)">{{ page.title }}</a> <!-- todo: reference related lessons? -->
    </li>
</ol>


    </a>
    <!--<github-card username="casiano"></github-card>-->
  </div>
  <div class="feature"> 
  <h2>Temas</h2>
!!!include(temas.md)!!!
<!-- <github-card username="ilopezpl"></github-card>-->
  </div>
</div>

::: slot footer
MIT Licensed | Copyright © 2021-present [Casiano](https://github.com/crguezl)
:::