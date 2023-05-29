import { getSidebar } from 'vitepress-plugin-auto-sidebar'

module.exports = {
    title: 'GH EDUCATION', 
    appearance: true,
    lastUpdated: true,
    head: [
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"}],
        ["script",{src: "https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"}],
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
            firebase.initializeApp(firebaseConfig);`
          ],

    ],
    themeConfig: {
        logo: {light: "/assets/logo-gh-dark.png", dark: "/assets/logo-gh-light.png"},
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