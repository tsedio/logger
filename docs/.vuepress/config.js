module.exports = {
  title: 'Ts.Logger - A Node.js and TypeScript multi chanel logger',
  description: 'A Node.js and TypeScript multi chanel logger',
  serviceWorker: true,
  theme: 'tsed',
  themeConfig: {
    shortTitle: 'Ts.Logger',
    version: require('../../package').version,
    repo: 'TypedProject/logger',
    openCollective: 'tsed',
    gitterUrl: 'https://gitter.im/Tsed-io/community',
    stackoverflowUrl: "https://stackoverflow.com/questions/tagged/tsed",
    sponsorUrl: "https://opencollective.com/tsed",
    editLinks: true,
    docsDir: 'docs',
    sidebar: 'auto',
    api: require('./public/api.json'),
    algolia: {
      apiKey: "f8a038207e461aaac0e2fd16403c2b01",
      indexName: "ts_ed"
    },
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
            items: [
              { link: '/appenders/index.html', text: 'Configuration', items: [] },
              {
                text: 'Built-in appenders',
                items: [
                  { link: '/appenders/console.html', text: 'Console', items: [] },
                  { link: '/appenders/file.html', text: 'File', items: [] },
                  { link: '/appenders/file-date.html', text: 'File date', items: [] },
                  { link: '/appenders/stdout.html', text: 'Stdout', items: [] },
                  { link: '/appenders/stderr.html', text: 'Stderr', items: [] }
                ]
              },
              {
                text: 'Advanced',
                items: [
                  { link: '/appenders/custom.html', text: 'Custom appender', items: [] }
                ]
              }
            ]
          },
          {
            text: 'Layouts',
            items: [
              { link: '/layouts/index.html', text: 'Configuration', items: [] },
              {
                text: 'Built-in layouts',
                items: [
                  { link: '/layouts/basic.html', text: 'Basic', items: [] },
                  { link: '/layouts/colored.html', text: 'Colored', items: [] },
                  { link: '/layouts/dummy.html', text: 'Dummy', items: [] },
                  { link: '/layouts/message-pass-through.html', text: 'Message Pass-Through', items: [] },
                  { link: '/layouts/json.html', text: 'Json', items: [] },
                  { link: '/layouts/pattern.html', text: 'Pattern', items: [] }
                ]
              },
              {
                text: 'Advanced',
                items: [
                  { link: '/layouts/custom.html', text: 'Custom layouts', items: [] }
                ]
              }
            ]
          },
          { link: '/api.html', text: 'Api Reference' }
        ],
        sidebar: {
          '/appenders/': [
            {
              title: 'Configuration',
              collapsable: false,
              children: [
                ''
              ]
            },
            {
              title: 'Built-in appenders',
              collapsable: false,
              children: [
                'console',
                'file',
                'file-date',
                'stdout',
                'stderr'
              ]
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: [
                'custom'
              ]
            }
          ],
          '/layouts/': [
            {
              title: 'Configuration',
              collapsable: false,
              children: [
                ''
              ]
            },
            {
              title: 'Built-in layouts',
              collapsable: false,
              children: [
                'basic',
                'colored',
                'dummy',
                'message-pass-through',
                'json',
                'pattern'
              ]
            },
            {
              title: 'Advanced',
              collapsable: false,
              children: [
                'custom'
              ]
            }
          ]
        },
        otherTopics: [
          '/appenders/console',
          '/appenders/file',
          '/appenders/file-date',
          '/appenders/stdout',
          '/appenders/stderr',
          '/layouts/basic',
          '/layouts/colored',
          '/layouts/dummy',
          '/layouts/message-pass-through',
          '/layouts/json',
          '/layouts/pattern'
        ],
        footer: {
          lastUpdated: 'Last update',
          caughtMistake: 'Caught a mistake or want to contribute to the documentation?',
          editPageOnGithub: 'Edit on Github',
          contribute: 'Contribute',
          helpToContribute: 'Help shape the future of Ts.Logger by joining our team and send us pull requests via our',
          githubRepository: 'GitHub repository!',
          license: 'License',
          releaseUnder: 'Released under the',
          documentationGeneratedWith: 'Documentation generated with'
        }
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
      md.use(require('vuepress-theme-tsed/plugins/markdown-it-symbol'))
    }
  }
}
