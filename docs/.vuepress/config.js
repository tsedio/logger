const url = 'https://logger.tsed.io'
const title = '@tsed/logger - A Node.js and TypeScript multi channel logger'
const description = 'A Node.js and TypeScript multi channel logger'
module.exports = {
  title,
  description,
  serviceWorker: false,
  theme: 'tsed',
  head: [
    ['link', { canonical: url }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico', type: 'image/x-icon' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'apple-touch-icon' }],
    ['link', { rel: 'icon', href: '/apple-touch-icon.png', type: 'image/x-icon', sizes: '180x180' }],
    ['link', { rel: 'icon', href: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' }],
    ['link', { rel: 'icon', href: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:image', content: 'https://tsed.io/tsed-og.png' }],
    ['meta', { property: 'og:image:width', content: '1024' }],
    ['meta', { property: 'og:image:height', content: '1024' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary' }]
  ],
  themeConfig: {
    shortTitle: 'Ts.Logger',
    htmlTitle: '<span class=\'text-blue\'>Ts</span>.Logger',
    version: require('../../package').version,
    teams: require('../../teams'),
    licenseType: 'MIT',
    author: 'Lenzotti Romain',
    copyrightDates: {
      start: '2016',
      end: new Date().getFullYear()
    },
    repo: 'TypedProject/logger',
    openCollective: 'tsed',
    gitterUrl: 'https://gitter.im/Tsed-io/community',
    stackoverflowUrl: 'https://stackoverflow.com/search?q=tsed',
    sponsorUrl: 'https://opencollective.com/tsed',
    editLinks: true,
    docsDir: 'docs',
    sidebar: 'auto',
    docsBranch: 'production',
    api: require('./public/api.json'),
    smoothScroll: true,
    lastUpdated: 'Last updated',
    // algolia: {
    //   apiKey: "f8a038207e461aaac0e2fd16403c2b01",
    //   indexName: "ts_ed"
    // },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: [
          {
            text: 'Getting started',
            link: '/getting-started.html'
          },
          {
            text: 'Appenders',
            link: '/appenders/index.html'
          },
          {
            text: 'Layouts',
            link: '/layouts/index.html'
          },
          {
            icon: 'bx bx-dots-horizontal-rounded text-lg',
            link: '/docs/controllers.html',
            title: `More`,
            items: [
              {
                text: 'Plugins',
                link: '/plugins',
                items: [
                  {
                    text: 'LogEntries',
                    link: '/appenders/logentries.md'
                  },
                  {
                    text: 'Seq',
                    link: '/appenders/seq.md'
                  },
                  {
                    text: 'Smtp',
                    link: '/appenders/smtp.md'
                  }
                ]
              },
              {
                text: 'Extra',
                items: [
                  {
                    text: 'Ts.ED',
                    link: 'http://tsed.io'
                  },
                  {
                    text: 'Ts.ED CLI',
                    link: 'http://cli.tsed.io'
                  },
                  {
                    text: 'Api reference',
                    link: '/api.html'
                  },
                  {
                    text: 'Contributes',
                    link: '/tutorials/contributing.md'
                  },
                  {
                    text: 'License',
                    link: '/tutorials/licence.md'
                  }
                ]
              }
            ]
          }
        ],
        sidebar: [
          {
            title: 'Getting started',   // required
            path: '/getting-started.html',
            collapsable: true // optional, defaults to true
          },
          {
            title: 'Appenders',
            collapsable: true,
            children: [
              { title: 'Configuration', path: '/appenders/' },
              { title: 'Console', path: '/appenders/console' },
              { title: 'File', path: '/appenders/file' },
              { title: 'File date', path: '/appenders/file-date' },
              { title: 'Stdout', path: '/appenders/stdout' },
              { title: 'StdErr', path: '/appenders/stderr' },
              { title: 'LogEntries', path: '/appenders/logentries' },
              { title: 'Seq', path: '/appenders/seq' },
              { title: 'Smtp', path: '/appenders/smtp' },
              { title: 'Custom appender', path: '/appenders/custom' }
            ]
          },
          {
            title: 'Layouts',
            collapsable: true,
            children: [
              { title: 'Configuration', path: '/layouts/' },
              '/layouts/basic',
              '/layouts/colored',
              '/layouts/dummy',
              '/layouts/message-pass-through',
              '/layouts/json',
              '/layouts/pattern'
            ]
          },
          {
            title: "Extras",
            children: [
              "/api",
              "/contributing",
              "/license"
            ]
          }
        ],
        otherTopics: [
          '/appenders/console',
          '/appenders/file',
          '/appenders/file-date',
          '/appenders/stdout',
          '/appenders/stderr',
          '/appenders/logentries',
          '/appenders/seq',
          '/appenders/smtp',
          '/layouts/basic',
          '/layouts/colored',
          '/layouts/dummy',
          '/layouts/message-pass-through',
          '/layouts/json',
          '/layouts/pattern'
        ]
      }
    },
    plugins: [
      [
        '@vuepress/google-analytics',
        {
          ga: 'UA-35240348-2'
        }
      ]
    ]
  },
  markdown: {
    lineNumbers: true,
    extendMarkdown: md => {
      md.use(require('@tsed/markdown-it-symbols'))
    }
  }
}
