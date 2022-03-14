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
            return "https://www.youtube-nocookie.com/embed/"+this.id
          }
        } 
    }
</script>
