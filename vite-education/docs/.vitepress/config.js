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