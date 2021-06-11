const url = 'https://logger.tsed.io'
const title = 'Ts.ED Logger - A Node.js and TypeScript multi channel logger'
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
    shortTitle: 'Logger by Ts.ED',
    htmlTitle: '<strong class="font-medium"><span class="hidden sm:inline"><span class="text-blue">Ts</span>.ED</span> Logger</strong>',
    version: require('../../package').version,
    team: require('../../team.json'),
    licenseType: 'MIT',
    author: 'Lenzotti Romain',
    copyrightDates: {
      start: '2016',
      end: new Date().getFullYear()
    },
    repo: 'tsedio/logger',
    githubProxyUrl: 'https://api.tsed.io/rest/github/tsedio/logger',
    openCollective: 'https://api.tsed.io/rest/opencollective',
    slackUrl: 'https://api.tsed.io/rest/slack/tsedio/tsed',
    stackoverflowUrl: 'https://stackoverflow.com/search?q=tsed',
    sponsorUrl: 'https://tsed.io/support.html',
    twitterUrl: 'https://twitter.com/TsED_io',
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
            link: '/getting-started.html',
            title: `Getting started | ${ title }`
          },
          {
            text: 'Appenders',
            link: '/appenders/index.html',
            title: `Appenders | ${ title }`
          },
          {
            text: 'Layouts',
            link: '/layouts/index.html',
            title: `Layouts | ${ title }`
          },
          {
            title: `Warehouse | ${ title }`,
            link: 'https://tsed.io/warehouse/',
            text: 'Warehouse',
            items: [
              {
                text: 'Explore plugins',
                link: 'https://tsed.io/warehouse/'
              },
              {
                text: 'Insight',
                link: '/appenders/insight.md'
              },
              {
                text: 'LogEntries',
                link: '/appenders/logentries.md'
              },
              {
                text: 'LogStash HTTP',
                link: '/appenders/logstash-http.md'
              },
              {
                text: 'LogStash UDP',
                link: '/appenders/logstash-udp.md'
              },
              {
                text: 'Loggly',
                link: '/appenders/loggly.md'
              },
              {
                text: 'RabbitMQ',
                link: '/appenders/rabbitmq.md'
              },
              {
                text: 'Seq',
                link: '/appenders/seq.md'
              },
              {
                text: 'Slack',
                link: '/appenders/slack.md'
              },
              {
                text: 'Smtp',
                link: '/appenders/smtp.md'
              }
            ]
          },
          {
            icon: 'bx bx-dots-horizontal-rounded text-lg',
            title: `Extras`,
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
                text: 'Team',
                link: 'https://tsed.io/team.md'
              },
              {
                text: 'Contributes',
                link: '/tutorials/contributing.md'
              },
              {
                text: 'Support',
                link: 'https://tsed.io/support.md'
              },
              {
                text: 'License',
                link: '/license.md'
              },
              {
                text: 'Api reference',
                link: '/api.html'
              }
            ]
          }
        ],
        // SIDEBAR---------
        sidebar: [
          {
            title: 'Getting started',   // required
            path: '/getting-started.html',
            collapsable: true // optional, defaults to true
          },
          {
            title: 'Appenders',
            children: [
              { title: 'Configuration', path: '/appenders/' },
              { title: 'Console', path: '/appenders/console' },
              { title: 'File', path: '/appenders/file' },
              { title: 'File date', path: '/appenders/file-date' },
              { title: 'Stdout', path: '/appenders/stdout' },
              { title: 'StdErr', path: '/appenders/stderr' },
              { title: 'Insight', path: '/appenders/insight' },
              { title: 'LogEntries', path: '/appenders/logentries' },
              { title: 'LogStash HTTP', path: '/appenders/logstash-http' },
              { title: 'LogStash UDP', path: '/appenders/logstash-udp' },
              { title: 'Loggly', path: '/appenders/loggly' },
              { title: 'RabbitMQ', path: '/appenders/rabbitmq' },
              { title: 'Seq', path: '/appenders/seq' },
              { title: 'Slack', path: '/appenders/slack' },
              { title: 'Smtp', path: '/appenders/smtp' },
              { title: 'Custom appender', path: '/appenders/custom' }
            ]
          },
          {
            title: 'Layouts',
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
            title: 'Extras',
            children: [
              '/api',
              '/contributing',
              '/license'
            ]
          }
        ],
        otherTopics: [
          '/appenders/console',
          '/appenders/file',
          '/appenders/file-date',
          '/appenders/stdout',
          '/appenders/stderr',
          '/appenders/insight',
          '/appenders/logentries',
          '/appenders/logstash-http',
          '/appenders/logstash-udp',
          '/appenders/loggly',
          '/appenders/rabbitmq',
          '/appenders/seq',
          '/appenders/slack',
          '/appenders/smtp',
          '/layouts/basic',
          '/layouts/colored',
          '/layouts/dummy',
          '/layouts/message-pass-through',
          '/layouts/json',
          '/layouts/pattern'
        ],
        footer: {
          sections: [
            {
              title: 'Discover',
              items: [
                {
                  label: 'Our team',
                  url: '/team.html'
                },
                {
                  label: 'Contact us',
                  url: 'https://form.typeform.com/to/uJLP7anG'
                }
              ]
            },
            {
              title: 'Help',
              items: [
                {
                  label: 'Resources',
                  url: '/tutorials/index.html'
                },
                {
                  label: 'Chat with us',
                  url: 'https://gitter.im/Tsed-io/community'
                },
                {
                  label: 'Contribution guide',
                  url: '/contributing.html'
                }
              ]
            },
            {
              title: 'Support',
              items: [
                {
                  label: 'Issues',
                  url: 'https://github.com/tsedio/tsed/issues'
                },
                {
                  label: 'Sponsoring & donations',
                  url: '/support.html'
                }
              ]
            }
          ]
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
      md.use(require('@tsed/markdown-it-symbols'))
    }
  }
}
