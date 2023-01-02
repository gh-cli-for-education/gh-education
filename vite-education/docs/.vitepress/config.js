const path = require('path')

module.exports = {
    title: 'GH EDUCATION', // appended to all page titles
    head: [
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"}],
        ["script",{src: path.join(__dirname, "firebase.js")}]

    ],
    themeConfig: {
        logo: {light: "../logo-gh-dark.png", dark: "../logo-gh-light.png"},
        nav: [
            { text: '🏠 Home', link: '/'},
            { text: '🕒 Schedule', link: '/horario/horario', activeMatch: '/horario' },
            { text: '🧑🏽‍🏫 Classes', link: '/clases/clases', activeMatch: '/clases' },
            { text: '💻 Tasks', link: '/practicas/practicas', activeMatch: '/practicas' },
            { text: '👥 Teams', link: '/teams/teams', activeMatch: '/teams' },
            { text: '📝 Units', link: '/temas/temas', activeMatch: '/temas' },
            { text: '🔒 Login', link: '/'}
        ]
    },
    markdown: {
        config: (md) => {
            md.use(require('markdown-it-include'))
        }
    },
    footer: {
        message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2022-present <a href="https://github.com/alu0101102726">Carlos Díaz</a>'
      }
}