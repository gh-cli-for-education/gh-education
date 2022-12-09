module.exports = {
    title: 'GH EDUCATION', // appended to all page titles
    themeConfig: {
        nav: [
            { text: '🏠 Inicio', link: '/' },
            { text: '🕒 Horario', link: '/horario/horario' },
            { text: '🧑🏽‍🏫 Clases', link: '/clases/clases' },
            { text: '💻 Prácticas', link: '/practicas/practicas' },
            { text: '👥 Teams', link: '/teams/teams' },
            { text: '📝 Temas', link: '/temas/temas' },
        ]
    },
    markdown: {
        lineNumbers: true,
      },
    head: [
        [
            "script",
            {
              src: "https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js"
            }
          ],
      
          [
            "script",
            {
              src: "https://www.gstatic.com/firebasejs/5.5.6/firebase-auth.js"
            }
          ],
      
          [
            "script",
            {
              src: "https://www.gstatic.com/firebasejs/5.5.6/firebase-firestore.js"
            }
          ],
      
          [
            "script",
            {
              src: "https://www.gstatic.com/firebasejs/5.5.6/firebase-functions.js"
            }
          ],
      
          [
            "script",
            {
              src: "https://www.gstatic.com/firebasejs/5.5.6/firebase-analytics.js"
            }
          ],

          [
            "script",
            {},
            `const firebaseConfig = {
                apiKey: "AIzaSyC1WfyhIqmL1n7ahPL-XVSAmBECWxMTUrg",
                authDomain: "gh-education.firebaseapp.com",
                projectId: "gh-education",
                storageBucket: "gh-education.appspot.com",
                messagingSenderId: "232266340667",
                appId: "1:232266340667:web:15dc478ab3ef65c66c7f1e",
                measurementId: "G-1N1LRJY9RP"
              };
              
              // Initialize Firebase
              const app = initializeApp(firebaseConfig);
              const analytics = getAnalytics(app);`
          ],

    ],
    extendMarkdown: (md) => { // See https://github.com/vuejs/vuepress/issues/222#issuecomment-874001675
    // use more markdown-it plugins!
        md.use(
            require('markdown-it-include'), 
            {
            root: includesPath,
            // bracesAreOptional: true,
            // includeRe: /\!{3}\s*include(.+?)\!{3}/i
            }
        )
    }
}