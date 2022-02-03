<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>

      <div id="comment-cat"></div>
      <div id="cat">
        <img :src="src" />
      </div>
      <br />
      <div id="quote">
        {{ quote }}
      </div>
      <div id="author" style="text-align: right">
        {{ author }}
      </div>

      <RouterLink to="/"> Take me home. </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`,
];

export default {
  data() {
    return {
      author: "",
      quote: "",
      src: "",
    };
  },
  async mounted() {
    const title  =  "Comfort yourself with a kitten";
    const URL=  "https://api.thecatapi.com/v1/images/search?size=full"
    const key = "56a4f1cc-7f60-468d-9dba-e4b6f04b7c7d" // See https://stackoverflow.com/questions/21939713/hide-api-key-for-a-github-page
    const quoteUrl =  "https://api.quotable.io/random";
    const comment =  `<em>It appears you have stumbled onto the dark hole page of this website.</em> 
         This page was built to catch the wanderers who have gone astray. 
         <br/>`;
    try {
      // CAT
      let response = await fetch(URL, {
        headers: {
          "x-api-key": key,
        },
      });
      //console.log(response);
      let cat = await response.json();
      //console.log(cat);
      this.src = cat[0].url;

      // QUOTE
      const quoteRes = await fetch(quoteUrl);
      const data = await quoteRes.json();
      this.quote = data.content;
      this.author = data.author;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    },
  },
};
</script>
