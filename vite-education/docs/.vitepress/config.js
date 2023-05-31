const path = require('path');
import { getSidebar } from 'vitepress-plugin-auto-sidebar';
import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'GH EDUCATION', 
    appearance: true,
    lastUpdated: true,
    
    define: {
        "global": {},
    },
    head: [
	    ["script",{src:"https://esm.sh/octokit", type: "module"}],
        ["script",{src:path.join(__dirname, "firebase.js"), type: "module"},
	]
    ],
    themeConfig: {
        logo: {light: "assets/logo-gh-dark.png", dark: "assets/logo-gh-light.png"},
        nav: [
            { text: '🏠 Home', link: '/'},
            { text: '🕒 Schedule', link: '/schedule', activeMatch: '/horario' },
            { text: '🧑🏽‍🏫 Lessons', link: '/lessons/lessons', activeMatch: '/lessons' },
            { text: '💻 Tasks', link: '/tasks/tasks', activeMatch: '/tasks' },
            { text: '👥 Teams', link: '/teams/teams', activeMatch: '/teams' },
            { text: '📝 Units', link: '/units/units', activeMatch: '/units' },
            { text: '🔒 Login', link: '/auth.md'}
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
})
