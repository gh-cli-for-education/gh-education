
import { getSidebar } from 'vitepress-plugin-auto-sidebar';
import { defineConfig  } from 'vitepress';
import dotenv from 'dotenv';

dotenv.config()

const storePath = process.env.NODE_ENV === "production" ? "/" + process.env.VITE_REPOSITORY + "/" + "data/store/index.js" : "../public/data/store/index.js";

export default defineConfig({
    title: 'GH EDUCATION', 
    appearance: true,
    lastUpdated: true,
    base: process.env.NODE_ENV === "production" ? "/" + process.env.VITE_REPOSITORY + "/" : "/",    
    head: [
        ["script",{src: storePath, type: "module"},]
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
