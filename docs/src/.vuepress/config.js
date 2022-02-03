const { description } = require('../../package')
const PLVariables = require('./pl')
const path = require('path');
const includesPath = path.join(__dirname, '..', 'includes');
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
