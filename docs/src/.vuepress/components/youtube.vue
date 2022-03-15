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
            //console.log(this.$page.frontmatter.video);
            let id = (this.$page && this.$page.frontmatter && this.$page.frontmatter.video);
            if (this.id) id = this.id;
            //console.log(id);
            return "https://www.youtube-nocookie.com/embed/"+id
          }
        } 
    }
</script>
