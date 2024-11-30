import {defineConfig} from "vitepress";
import {apiAnchor} from "@tsed/vitepress-theme/markdown/api-anchor/api-anchor.js";
import pkg from "../../package.json";
import {getSidebar} from "./api.js";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ts.ED Logger",
  lastUpdated: true,

  sitemap: {
    hostname: "https://logger.tsed.io"
  },

  head: [
    // ['link', { rel: 'icon', type: 'image/svg+xml', href: '/tsed.svg' }],
    ["link", {rel: "icon", type: "image/png", href: "https://tsed.io/tsed-og.png"}],
    ["link", {rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon"}],
    ["link", {rel: "icon", href: "https://tsed.io/favicon-32x32.png", type: "image/png", sizes: "32x32"}],
    ["link", {rel: "icon", href: "https://tsed.io/favicon-16x16.png", type: "image/png", sizes: "16x16"}],
    ["link", {rel: "icon", href: "https://tsed.io/apple-touch-icon.png", type: "image/x-icon", sizes: "180x180"}],
    ["meta", {name: "theme-color", content: "#5f67ee"}],
    ["meta", {property: "og:type", content: "website"}],
    ["meta", {property: "og:locale", content: "en"}],
    ["meta", {property: "og:title", content: "Ts.ED - A Node.js and TypeScript Framework on top of Express/Koa.js."}],
    ["meta", {property: "og:site_name", content: "Ts.ED"}],
    ["meta", {property: "og:image", content: "https://tsed.dev/tsed-og.png"}],
    ["meta", {property: "og:url", content: "https://tsed.dev/"}]
  ],

  themeConfig: {
    logo: "https://tsed.io/tsed.svg",
    siteTitle: false,
    apiUrl: "/api.json",
    apiRedirectUrl: "",
    repo: "tsedio/logger",
    githubProxyUrl: "https://api.tsed.io/rest/github/tsedio/tsed",
    stargazerUrl: "https://api.tsed.io/rest/github/tsedio/logger",
    defaultStargazerValue: 64,
    editLink: {
      pattern: "https://github.com/tsedio/logger/edit/production/docs/:path"
    },
    search: {
      provider: "algolia",
      options: {
        appId: "DH8VVM2E1E",
        apiKey: "9a1620e0f36bc5dc3b0982fdcbdd6f5f",
        indexName: "ts_ed"
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: "Getting started",
        items: [
          {
            text: "Introduction",
            items: [
              {text: "What is Ts.ED?", link: "/introduction/what-is-tsed"},
              {text: "Capabilities", link: "/introduction/capabilities"},
              {text: "Installation", link: "/introduction/getting-started"},
              {text: "Api references", link: "/api.html"}
            ]
          }
        ]
      },
      {
        text: "Appenders",
        items: [
          {text: "Usage", link: "/appenders/index.md"},
          {text: "Console", link: "/appenders/console.md"},
          {text: "Connect", link: "/appenders/connect.md"},
          {text: "File", link: "/appenders/file.md"},
          {text: "File Date", link: "/appenders/file-date.md"},
          {text: "Stdout", link: "/appenders/stdout.md"},
          {text: "Stderr", link: "/appenders/stderr.md"},
          {text: "Insights", link: "/appenders/insights.md"},
          {text: "LogEntries", link: "/appenders/logentries.md"},
          {text: "LogStash Http", link: "/appenders/logstash-http.md"},
          {text: "LogStash UDP", link: "/appenders/logstash-udp.md"},
          {text: "Loggly", link: "/appenders/loggly.md"},
          {text: "RabbitMQ", link: "/appenders/rabbitmq.md"},
          {text: "Seq", link: "/appenders/seq.md"},
          {text: "Slack", link: "/appenders/slack.md"},
          {text: "Smtp", link: "/appenders/smtp.md"},
          {text: "Custom", link: "/appenders/custom.md"}
        ]
      },
      {
        text: "Layouts",
        items: [
          {
            text: "Usage",
            link: "/layouts/index.md"
          },
          {
            text: "Basic",
            link: "/layouts/basic.md"
          },
          {
            text: "Colored",
            link: "/layouts/colored.md"
          },
          {
            text: "Dummy",
            link: "/layouts/dummy.md"
          },
          {
            text: "Message pass-through",
            link: "/layouts/message-pass-through.md"
          },
          {
            text: "Json",
            link: "/layouts/json.md"
          },
          {
            text: "Pattern",
            link: "/layouts/pattern.md"
          },
          {
            text: "Custom",
            link: "/layouts/custom.md"
          }
        ]
      },
      {
        text: "Plugins",
        link: "https://tsed.dev/plugins/index.html"
      },
      {
        text: pkg.version,
        items: [
          {
            text: "Releases",
            link: "https://github.com/tsedio/logger/releases"
          },
          {
            text: "Ts.ED",
            link: "https://tsed.dev"
          },
          {
            text: "Contributing",
            link: "https://github.com/tsedio/tsed/blob/production/CONTRIBUTING.md"
          },
          {
            text: "Team",
            link: "https://tsed.dev/more/team"
          }
        ]
      }
    ],
    sidebar: {
      "/api": getSidebar(),
      "/": [
        {
          text: "Introduction",
          items: [
            {text: "What is Ts.ED?", link: "/introduction/what-is-tsed"},
            {text: "Capabilities", link: "/introduction/capabilities"},
            {text: "Installation", link: "/introduction/getting-started"}
          ]
        },
        {
          text: "Appenders",
          items: [
            {text: "Usage", link: "/appenders/index.md"},
            {text: "Console", link: "/appenders/console.md"},
            {text: "Connect", link: "/appenders/connect.md"},
            {text: "File", link: "/appenders/file.md"},
            {text: "File Date", link: "/appenders/file-date.md"},
            {text: "Stdout", link: "/appenders/stdout.md"},
            {text: "Stderr", link: "/appenders/stderr.md"},
            {text: "Insights", link: "/appenders/insights.md"},
            {text: "LogEntries", link: "/appenders/logentries.md"},
            {text: "LogStash Http", link: "/appenders/logstash-http.md"},
            {text: "LogStash UDP", link: "/appenders/logstash-udp.md"},
            {text: "Loggly", link: "/appenders/loggly.md"},
            {text: "RabbitMQ", link: "/appenders/rabbitmq.md"},
            {text: "Seq", link: "/appenders/seq.md"},
            {text: "Slack", link: "/appenders/slack.md"},
            {text: "Smtp", link: "/appenders/smtp.md"},
            {text: "Custom", link: "/appenders/custom.md"}
          ]
        },
        {
          text: "Layouts",
          items: [
            {
              text: "Usage",
              link: "/layouts/index.md"
            },
            {
              text: "Basic",
              link: "/layouts/basic.md"
            },
            {
              text: "Colored",
              link: "/layouts/colored.md"
            },
            {
              text: "Dummy",
              link: "/layouts/dummy.md"
            },
            {
              text: "Message pass-through",
              link: "/layouts/message-pass-through.md"
            },
            {
              text: "Json",
              link: "/layouts/json.md"
            },
            {
              text: "Pattern",
              link: "/layouts/pattern.md"
            },
            {
              text: "Custom",
              link: "/layouts/custom.md"
            }
          ]
        }
      ]
    },
    socialLinks: [
      {icon: "github", link: "https://github.com/tsedio/logger"},
      {icon: "slack", link: "https://slack.tsed.io"},
      {icon: "twitter", link: "https://x.com/TsED_io"}
      // { icon: '', link: 'https://stackoverflow.com/search?q=tsed' },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2019-present Romain Lenzotti"
    }
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.use(apiAnchor);
    }
  }
});
