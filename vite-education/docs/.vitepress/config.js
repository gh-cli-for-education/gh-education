const path = require('path')

module.exports = {
    title: 'GH EDUCATION', // appended to all page titles
    head: [
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"}],
        ["script",{src: path.join(__dirname, "firebaseConfig.js")}]

    ],
    themeConfig: {
        nav: [
            { text: '🏠 Home', link: '/', activeMatch: '/'},
            { text: '🕒 Schedule', link: '/horario/horario', activeMatch: '/horario' },
            { text: '🧑🏽‍🏫 Classes', link: '/clases/clases', activeMatch: '/clases' },
            { text: '💻 Tasks', link: '/practicas/practicas', activeMatch: '/practicas' },
            { text: '👥 Teams', link: '/teams/teams', activeMatch: '/teams' },
            { text: '📝 Themes', link: '/temas/temas', activeMatch: '/temas' }
        ]
    },
    markdown: {
        lineNumbers: true,
      },
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
    },
    footer: {
        message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2022-present <a href="https://github.com/alu0101102726">Carlos Díaz</a>'
      }
}