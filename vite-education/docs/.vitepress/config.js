const path = require('path')
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

module.exports = {
    title: 'GH EDUCATION', // appended to all page titles
    head: [
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"}],
        ["script",{src: path.join(__dirname, "firebase.js")}]

    ],
    themeConfig: {
        logo: {light: "../assets/logo-gh-dark.png", dark: "../assets/logo-gh-light.png"},
        nav: [
            { text: '🏠 Home', link: '/'},
            { text: '🕒 Schedule', link: '/schedule', activeMatch: '/horario' },
            { text: '🧑🏽‍🏫 Lessons', link: '/lessons/lessons', activeMatch: '/lessons' },
            { text: '💻 Tasks', link: '/tasks/tasks', activeMatch: '/tasks' },
            { text: '👥 Teams', link: '/teams/teams', activeMatch: '/teams' },
            { text: '📝 Units', link: '/units/units', activeMatch: '/units' },
            { text: '🔒 Login / Register', link: '/auth.md'}
        ],
        sidebar: getSidebar({ contentRoot: '/', contentDirs: ['teams'], collapsible: true, collapsed: true })
    },
    markdown: {
        config: (md) => {
            md.use(require('markdown-it-include'))
        }
    },
    chainWebpack: config => {
        config.module
          .rule('raw')
          .test(/\.md$/)
          .use('raw-loader')
          .loader('raw-loader')
          .end()
    },
    footer: {
        message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2022-present <a href="https://github.com/alu0101102726">Carlos Díaz</a>'
      }
}