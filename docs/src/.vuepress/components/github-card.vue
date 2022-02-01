<template>
    <div class="ui card">
      <a :href="`https://github.com/${username}`" class="image">
        <img :src="user.avatar_url">
      </a>
      <div class="content">
        <a class="header" :href="`https://github.com/${username}`">{{ user.name }}</a>
        <div class="meta">
          <span class="date">Joined in {{ githubYear }}</span>
        </div>
        <div class="description">
          Bio: {{ user.bio }}
        </div>
      </div>
      <div class="extra content">
        <a :href="`https://github.com/${username}?tab=followers`">
          <i class="user icon"></i>
          {{ user.followers }} Followers
        </a>
      </div>
    </div>
</template>


<script>
    import axios from "axios";
    export default {
      props: {
        username: {
          type: String,
          required: true
        }
      },
      computed: {
        githubYear() {
          let githubDate = this.user.created_at
          console.log(githubDate)
          if (!githubDate) return "";
          return githubDate.replace(/^(\d+).*/, "$1")
        }
      },
      data() {
        return {
          user: {}
        }
      },
      created() {
        axios(
          {
            url: `https://api.github.com/users/${this.username}`,
            method: "GET"
          })
          .then(response => {
            console.log(response);
            this.user = response.data
          })

      }
    }
</script>

<style scoped>
 @import "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
</style>
