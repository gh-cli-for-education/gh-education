<template>
  <div class="responsive-video-container">
    <iframe
      :src="src"
      frameborder="0"
      webkitAllowFullScreen
      mozallowfullscreen
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
    // https://www.youtube-nocookie.com/embed/{{ id }}
    export default { 
        props: [ "id" ],
        data() {
            return {
            }
        },
        computed: {
          src() {
            let id = this.id; // from the property
            //console.log(this.$page.frontmatter.video);
            if (!id) {
              id = (this.$page && this.$page.frontmatter && this.$page.frontmatter.video);
            }
            let m = /https:.*\.be\/(\w+)$/.exec(id);
            if (m && m[1]) id = m[1];

            //console.log(id);
            return "https://www.youtube-nocookie.com/embed/"+id
          }
        } 
    }
</script>
