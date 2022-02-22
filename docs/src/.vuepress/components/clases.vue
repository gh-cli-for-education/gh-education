<template>
    <ol reversed> 
        <li v-for="page in classFiles" :key="page.key"> <a :href="path.basename(page.path)">{{ page.title }}</a> 
        <ul>
          <li>{{ page.frontmatter.summary }}</li>
          <li v-if="page.frontmatter.video"><a :href="page.frontmatter.video">Vídeo</a></li>
        </ul>
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
            getBaseName(page) {
                return path.basename(page.path)
            },
            getDate(page) {
                let m = /(\d+.\d+.\d+)/.exec(page.relativePath);
                return m? m[1] : null
            }
        },
        computed: {
            classFiles() {      
                let compare = (pageA, pageB) => {
                    let a = this.getDate(pageA);
                    let b = this.getDate(pageB);

                    if (a < b) {
                        return 1;
                    }
                    if (a > b) {
                        return -1;
                    }
                    // a must be equal to b
                   return 0;
                }          
                let clases = this.$site.pages.filter(page => /clases.\d+/.test(page.relativePath));
                //console.log(this.getDate(clases[0]));
                return clases.sort( compare );
            }, 
        
        }
    }
</script>
