const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'PROCESADORES DE LENGUAJES 2021/2022',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  base: "/vuepress-pl-prototype/",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  configureWebpack: {
    resolve: {
      alias: {
      }
    }
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    sidebar: 'auto',

    // displayAllHeaders: true, // Default: false


    nav: [
      {
        text: 'Clases',
        link: '/clases/',
      },
      {
        text: 'Temas',
        link: '/temas/'
      },
      {
        text: 'Labs',
        link: '/practicas/'
      },
      {
        text: 'Recursos',
        link: '/config/'
      },      
      {
        text: 'Horarios',
        link: '/config/'
      },
      {
        text: 'Referencias',
        link: '/config/'
      },
      {
        text: 'GitHub',
        items: [
          {text: 'Organization', link: 'https://github.com/ULL-ESIT-PL-2122'},
          {text: 'Classroom', link: 'https://classroom.github.com/classrooms/90842648-ull-esit-pl-2122'},
          {text: 'Apuntes Repo', link: 'https://github.com/ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io'}
        ]
      },
      {
        text: 'Campus Virtual',
        items: [
          { text:'PL en el Campus Virtual', link: 'https://campusingenieriaytecnologia2122.ull.es/course/view.php?id=2122090039' },
          {text: 'Guía Docente', link: ''},
          {text: 'Calendario Académico', link: ''},
          {text: '', link: ''},
        ]
      },
      {
        text: 'Google',
        items: [
          {text: 'Meet', link: ''},
          {text: 'Chat', link: ''},
          {text: 'Vídeos', link: ''},

        ]
      }



    ], /*
    sidebar: {
      '/clases/': [
        {
          title: 'Clases',
          collapsable: false,
          children: [
            '',
            'introducción a PL',
          ]
        }
      ],
      '/temas/': [
        {
          title: 'Temas',
          collapsable: false,
          children: [
            '',
          ]
        }
      ],
    } */
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    ['vuepress-plugin-global-variables', 
      { 
        variables: { 
          example: 'foo',
          organization: {
            url: "https://github.com/ULL-ESIT-PL-2122",
            name: "ULL-ESIT-PL-2122",
          } 
        } 
      }
    ],
    [
      'vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ],
  ]
}
