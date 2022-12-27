const path = require('path')

module.exports = {
    title: 'GH EDUCATION', // appended to all page titles
    themeConfig: {
        nav: [
            { text: '🏠 Inicio', link: '/' },
            { text: '🕒 Horario', link: '/horario/horario' },
            { text: '🧑🏽‍🏫 Clases', link: '/clases/clases' },
            { text: '💻 Prácticas', link: '/practicas/practicas' },
            { text: '👥 Teams', link: '/teams/teams' },
            { text: '📝 Temas', link: '/temas/temas' }
        ]
    },
    markdown: {
        lineNumbers: true,
      },
    head: [
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"}],
        ["script",{src: path.join(__dirname, "firebase.js")}]

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
        ),
        md.use(
            require('vitepress-plugin-tabs')
        )
    }
}