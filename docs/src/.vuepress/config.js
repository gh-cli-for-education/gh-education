const { description } = require('../../package')
const PLVariables = require('./pl')
const path = require('path');
const includesPath = path.join(__dirname, '..');
console.error(includesPath);

const ComputeTime = (timestamp, lang) => {
  // Don't forget to install moment yourself
  const moment = require('moment')
  moment.locale(lang)
  return moment(timestamp).fromNow()
};

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'PL 21/22',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  base: "", // "/vuepress-pl-prototype/",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    // ['link', { rel: 'icon', href: '/favicon-32x32.png' }],
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
  //theme: 'default-prefers-color-scheme',
  themeConfig: {
    //overrideTheme: 'dark',
    logo: '/favicon-32x32.png',
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    /** code themes comment .vuepress/themes/styles/code.styl
     * support for
     * 'default'
     * 'funky'
     * 'okaidia'
     * 'solarizedlight'
     * 'tomorrow'
     */

    //? qdisplayAllHeaders: true, // Default: false

    sidebar: {
      "/temas/": "auto",
      "/practicas/": "auto",
      "/clases/": "auto"

    
      
    },
    // displayAllHeaders: true, // Default: false
    nav: PLVariables.nav, 
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [ '@vuepress/last-updated',  { transformer: ComputeTime } ],
    ['vuepress-plugin-global-variables',   {  variables: PLVariables  } ],
    ['vuepress-plugin-mathjax',  { target: 'svg',   macros: { '*': '\\times',  },  },  ],
    ['vuepress-plugin-code-copy',  {
      /* selector: "pre", */
      align: "top",
      /*color: String,
      backgroundTransition: Boolean,
      backgroundColor: String,
      successText: String*/
      }],
    [ '@saintic/utterances',  {
            repo: 'ULL-ESIT-GRADOII-PL/ull-esit-gradoii-pl.github.io',
            theme: 'github-light',
            issueTerm: 'pathname'
      }
    ],
    'vuepress-plugin-mermaidjs',
    ['vuepress-plugin-flowchart'],
    [
      'social-share',
      {
        networks: PLVariables.networks,
        email: 'crguezl@ull.edu.es',
        twitterUser: 'crguezl',
        fallbackImage: '/favicon-32x32.png',
        extendsNetworks: {
          pinterest: {
            sharer:
              'https://pinterest.com/pin/create/button/?url=@url&media=@media&description=@title',
            type: 'popup',
            icon: '/pinterest.png',
          },
          linkedin: {
            sharer:
              'https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description',
            type: 'popup',
            color: '#1786b1',
            icon:
              '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M910.336 0H113.664A114.005333 114.005333 0 0 0 0 113.664v796.672A114.005333 114.005333 0 0 0 113.664 1024h796.672A114.005333 114.005333 0 0 0 1024 910.336V113.664A114.005333 114.005333 0 0 0 910.336 0zM352.256 796.330667H207.189333V375.466667h145.066667z m-72.021333-477.866667a77.824 77.824 0 0 1-81.237334-74.069333A77.824 77.824 0 0 1 280.234667 170.666667a77.824 77.824 0 0 1 81.237333 73.728 77.824 77.824 0 0 1-81.237333 73.386666z m582.314666 477.866667H716.8v-227.669334c0-46.762667-18.432-93.525333-73.045333-93.525333a84.992 84.992 0 0 0-81.237334 94.549333v226.304h-140.629333V375.466667h141.653333v60.757333a155.989333 155.989333 0 0 1 136.533334-71.338667c60.416 0 163.498667 30.378667 163.498666 194.901334z" /></svg>',
          },
        },
      },
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
