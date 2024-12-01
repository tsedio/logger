---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "@tsed/logger"
  text: "A multi-channel logger."
  tagline: "Manage your logs of your application with ease."
  actions:
    - theme: brand
      text: Getting started
      link: /introduction/getting-started
    - theme: alt
      text: Become sponsor
      link: https://github.com/sponsors/Romakita
testimonial:
  title: "What the logger do?"
  description: "The logger is a multi-channel logger that allows you to manage your logs of your application with ease. It supports multi destination like Console, Remote, File with configurable log rolling based on file size or date."
features:
  - title: Multi channel
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bolt"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></svg>
    details: Support multi destination like Console, Remote, File with configurable log rolling based on file size or date.
  - title: Plugins based
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-unplug"><path d="m19 5 3-3"/><path d="m2 22 3-3"/><path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z"/><path d="M7.5 13.5 10 11"/><path d="M10.5 16.5 13 14"/><path d="m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z"/></svg>
    details: Use decorators to declare your own appenders and layouts logger.
  - title: Colored
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-paintbrush"><path d="m14.622 17.897-10.68-2.913"/><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z"/><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/></svg>
    details: Colored console logging to stdout or stderr.
frameworks:
  - title: Node.js
    href: https://nodejs.org/
    src: https://tsed.dev/nodejs.png
  - title: Bun
    href: https://bun.sh/
    src: https://tsed.dev/bun.png
  - title: TypeScript
    href: https://www.typescriptlang.org/
    src: https://tsed.dev/typescript.png
  - title: Jest
    href: https://jestjs.io/
    src: https://tsed.dev/jest.svg
  - title: Vitest
    href: https://vitest.dev/
    src: https://tsed.dev/vitest.png
  - title: Seq
    href: /appenders/seq.md
    src: https://blog.datalust.co/content/images/2018/09/Seq-380px-1.png
  - title: LogEntries
    href: /appenders/logentries.md
    src: https://tsed.dev/logentries.svg
  - title: Insight
    href: /appenders/insight.md
    src: /rapid7.svg
  - title: RabbitMQ
    href: /appenders/rabbitmq.md
    src: /rabbitmq.svg
  - title: Loggly
    href: /appenders/loggly.md
    src: https://tsed.dev/loggly.svg
  - title: LogStash
    href: /appenders/logstash-http.md
    src: https://tsed.dev/elastic-logstash.svg
  - title: Slack
    href: /appenders/slack.md
    src: https://tsed.dev/slack.svg
partners:
  - title: eGain
    href: https://www.egain.com/
    src: https://tsed.dev/partners/egain.webp
  - title: PXR-tech
    href: https://pxr.homerun.co/
    src: https://cdn.homerun.co/52878/logo-donker1665669278logo.png
    class: "max-w-[100px]"
  - title: Weseek
    href: https://weseek.co.jp/
    src: https://avatars.githubusercontent.com/u/6468105?v=4
    class: "max-w-[100px]"
  - title: Zenika
    href: https://www.zenika.com
    src: https://tsed.dev/partners/zenika.svg
  - title: Club Med
    href: https://clubmed.fr/
    src: https://tsed.dev/partners/clubmed.svg
  - title: schnell.digital
    href: https://schnell.digital/
    src: https://tsed.dev/partners/schnell.svg
    class: "max-w-[120px]"
---
