---
layout: Home
sidebar: false
meta:
 - name: description
   content: A Node.js and TypeScript multi channel logger.
 - name: keywords
   content: Ts.Logger nodejs typescript logger javascript decorators
gettingStartedText: Getting started
gettingStartedUrl: /getting-started.html
messengerText: Gitter
messengerUrl: https://gitter.im/Tsed-io/community
features:
- title: Colored
  icon: bxs-color-fill
  details: <a href="/appenders/console.html">Colored</a> console logging to <a href="/appenders/stdout">stdout</a> or <a href="/appenders/stderr">stderr</a>.
- title: Multi channel
  icon: bxs-select-multiple
  details: <a href="/appenders/file.htm">File appender</a>, with configurable log rolling based on file size or <a href="/appenders/file-date.html">date</a>.
- title: Extensible
  icon: bx-extension
  details: Use decorators to declare your own <a href="/appenders">appenders</a> and <a href="/layouts">layouts</a> logger.
contributors:
  classes: bg-gray-lighter
  title: Our awesome <b>contributors</b>
  cta:
    label: Become contributor
    url: /contributing.html
  badge:
    width: 45
    bgColor: white
backers:
 type: cols
 title: Our <b>Backers</b>
 description: Thank you to all our backers who contributes to our project! 🙏
 cta:
   label: Become Backers
   url: https://opencollective.com/tsed#backers
sponsors:
 type: cols
 classes:
 title: Our <b>Sponsors / Partners</b>
 description: Support this project by becoming a sponsor. Your logo will show up here with a link to your website.
 image:
   src: /sponsors.svg
   href: http://www.freepik.com
   title: Designed by pch.vector / Freepik
 cta:
   label: Become a sponsor
   url: /support.html
showContent: false
frameworks:
- title: TypeScript
  href: https://www.typescriptlang.org/
  src: /typescript.png 
- title: Mocha
  href: https://mochajs.org/
  src: /mochajs.svg
- title: Vuepress
  href: https://vuepress.vuejs.org
  src: https://vuepress.vuejs.org/hero.png
- title: Lerna
  href: https://lerna.js.org
  src: https://lerna.js.org/images/lerna-hero.svg
- title: Yarn
  href: https://yarnpkg.com/
  src: data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTE1NC44IDUxOCI+PHN0eWxlPi5zdDB7ZmlsbDojMmM4ZWJifS5zdDF7ZmlsbDojZmZmfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTcxOC42IDI1Ny44Yy04IDI3LjYtMjAuOCA0Ny42LTM1LjIgNjMuNlYxODFjMC05LjYtOC40LTE3LjYtMjEuNi0xNy42LTUuNiAwLTEwLjQgMi44LTEwLjQgNi44IDAgMi44IDEuNiA1LjIgMS42IDEyLjh2NjQuNGMtNC44IDI4LTE2LjggNTQtMzIuOCA1NC0xMS42IDAtMTguNC0xMS42LTE4LjQtMzMuMiAwLTMzLjYgNC40LTUxLjIgMTEuNi04MC44IDEuNi02IDEzLjItMjItNi40LTIyLTIxLjIgMC0xOC40IDgtMjEuMiAxNC44IDAgMC0xMy40IDQ3LjYtMTMuNCA5MCAwIDM0LjggMTQuNiA1Ny42IDQxLjQgNTcuNiAxNy4yIDAgMjkuNi0xMS42IDM5LjItMjcuNlYzNTFjLTI2LjQgMjMuMi00OS42IDQzLjYtNDkuNiA4NCAwIDI1LjYgMTYgNDYgMzguNCA0NiAyMC40IDAgNDEuNi0xNC44IDQxLjYtNTYuOFYzNTVjMjEuNi0xOC44IDQ0LjgtNDIuNCA1OC40LTg4LjguNC0xLjYuNC0zLjYuNC00IDAtNy42LTcuNi0xNi40LTE0LTE2LjQtNCAwLTcuMiAzLjYtOS42IDEyem0tNzYuOCAxOThjLTYuNCAwLTEwLjQtOS42LTEwLjQtMjIgMC0yNCA4LjgtMzkuMiAyMS42LTUyLjR2NDIuOGMwIDcuNiAxLjYgMzEuNi0xMS4yIDMxLjZ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTgzMy40IDMwMWMtOS42IDAtMTMuNi05LjYtMTMuNi0xOC40di02NmMwLTkuNi04LjQtMTcuNi0yMS42LTE3LjYtNS42IDAtMTAuNCAyLjgtMTAuNCA2LjggMCAyLjggMS42IDUuMiAxLjYgMTIuOHY2MS42Qzc4NSAyOTEuNCA3NzcuOCAzMDEgNzY3IDMwMWMtMTQgMC0yMi44LTEyLTIyLjgtMzIuOCAwLTU3LjYgMzUuNi04My42IDY2LTgzLjYgNCAwIDggLjggMTEuNi44IDQgMCA1LjItMi40IDUuMi05LjIgMC0xMC40LTcuNi0xNi44LTE4LjQtMTYuOC00OC44IDAtOTUuMiA0MC44LTk1LjIgMTA3LjYgMCAzNCAxNi40IDYwLjQgNDcuNiA2MC40IDE1LjIgMCAyNi40LTcuMiAzNC40LTE2LjQgNiA5LjYgMTYuOCAxNi40IDMwLjggMTYuNCAzNC40IDAgNTAuNC0zNiA1Ny4yLTYyLjQuNC0xLjYuNC0yLjQuNC0yLjggMC03LjYtNy42LTE2LjQtMTQtMTYuNC00IDAtOCAzLjYtOS42IDEyLTMuNiAxNy42LTEwLjggNDMuMi0yNi44IDQzLjJ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTk0OSAzMjcuNGMzNC40IDAgNTAtMzYgNTcuMi02Mi40IDAtLjguNC0xLjYuNC0yLjggMC03LjYtNy42LTE2LjQtMTQtMTYuNC00IDAtOCAzLjYtOS42IDEyLTMuNiAxNy42LTEwLjQgNDMuMi0yOC44IDQzLjItMTAuOCAwLTE2LTEwLjQtMTYtMjEuNiAwLTQwIDE4LTg3LjIgMTgtOTIgMS42LTkuMi0xNC40LTIyLjQtMTkuMi0yMi40aC0yMC44Yy00IDAtOCAwLTIxLjItMS42LTQuNC0xNi40LTE1LjYtMjEuMi0yNS4yLTIxLjItMTAuNCAwLTIwIDcuMi0yMCAxOC40IDAgMTEuNiA3LjIgMjAgMTcuMiAyNS42LS40IDIwLjQtMiA1My42LTYuNCA2OS42LTMuNiAxMy42IDE3LjIgMjggMjIuNCAxMS4yIDcuMi0yMy4yIDkuNi01OCAxMC03My42aDM0LjhjLTEyLjggMzQuNC0yMCA2Mi44LTIwIDg4LjQgMCAzNS4yIDIyLjQgNDUuNiA0MS4yIDQ1LjZ6Ii8+PHBhdGggY2xhc3M9InN0MCIgZD0iTTk4NC42IDMwOS44YzAgMTQuOCAxMS4yIDE3LjYgMTkuMiAxNy42IDExLjYgMCAxMS4yLTkuNiAxMS4yLTE3LjJ2LTU4LjRjMi44LTMxLjYgMjcuNi02NiAzOS4yLTY2IDcuNiAwIDguNCAxMC40IDguNCAyMi44djgxLjJjMCAyMC40IDEyLjQgMzcuNiAzMy42IDM3LjYgMzQuNCAwIDUxLjQtMzYgNTguMi02Mi40LjQtMS42LjQtMi40LjQtMi44IDAtNy42LTcuNi0xNi40LTE0LTE2LjQtNCAwLTggMy42LTkuNiAxMi0zLjYgMTcuNi0xMS44IDQzLjItMjcuOCA0My4yLTEwLjQgMC0xMC40LTE0LjgtMTAuNC0xOC40di04Mi44YzAtMTguNC02LjQtNDAuNC0zMy4yLTQwLjQtMTkuNiAwLTM0IDE3LjItNDQuOCAzOS42di0xOGMwLTkuNi04LjQtMTcuNi0yMS42LTE3LjYtNS42IDAtMTAuNCAyLjgtMTAuNCA2LjggMCAyLjggMS42IDUuMiAxLjYgMTIuOHYxMjYuOHpNMjU5IDBjMTQzIDAgMjU5IDExNiAyNTkgMjU5UzQwMiA1MTggMjU5IDUxOCAwIDQwMiAwIDI1OSAxMTYgMCAyNTkgMHoiLz48cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDM1LjIgMzM3LjVjLTEuOC0xNC4yLTEzLjgtMjQtMjkuMi0yMy44LTIzIC4zLTQyLjMgMTIuMi01NS4xIDIwLjEtNSAzLjEtOS4zIDUuNC0xMyA3LjEuOC0xMS42LjEtMjYuOC01LjktNDMuNS03LjMtMjAtMTcuMS0zMi4zLTI0LjEtMzkuNCA4LjEtMTEuOCAxOS4yLTI5IDI0LjQtNTUuNiA0LjUtMjIuNyAzLjEtNTgtNy4yLTc3LjgtMi4xLTQtNS42LTYuOS0xMC04LjEtMS44LS41LTUuMi0xLjUtMTEuOS40QzI5My4xIDk2IDI4OS42IDkzLjggMjg2LjkgOTJjLTUuNi0zLjYtMTIuMi00LjQtMTguNC0yLjEtOC4zIDMtMTUuNCAxMS0yMi4xIDI1LjItMSAyLjEtMS45IDQuMS0yLjcgNi4xLTEyLjcuOS0zMi43IDUuNS00OS42IDIzLjgtMi4xIDIuMy02LjIgNC0xMC41IDUuNmguMWMtOC44IDMuMS0xMi44IDEwLjMtMTcuNyAyMy4zLTYuOCAxOC4yLjIgMzYuMSA3LjEgNDcuNy05LjQgOC40LTIxLjkgMjEuOC0yOC41IDM3LjUtOC4yIDE5LjQtOS4xIDM4LjQtOC44IDQ4LjctNyA3LjQtMTcuOCAyMS4zLTE5IDM2LjktMS42IDIxLjggNi4zIDM2LjYgOS44IDQyIDEgMS42IDIuMSAyLjkgMy4zIDQuMi0uNCAyLjctLjUgNS42LjEgOC42IDEuMyA3IDUuNyAxMi43IDEyLjQgMTYuMyAxMy4yIDcgMzEuNiAxMCA0NS44IDIuOSA1LjEgNS40IDE0LjQgMTAuNiAzMS4zIDEwLjZoMWM0LjMgMCA1OC45LTIuOSA3NC44LTYuOCA3LjEtMS43IDEyLTQuNyAxNS4yLTcuNCAxMC4yLTMuMiAzOC40LTEyLjggNjUtMzAgMTguOC0xMi4yIDI1LjMtMTQuOCAzOS4zLTE4LjIgMTMuNi0zLjMgMjIuMS0xNS43IDIwLjQtMjkuNHptLTIzLjggMTQuN2MtMTYgMy44LTI0LjEgNy4zLTQzLjkgMjAuMi0zMC45IDIwLTY0LjcgMjkuMy02NC43IDI5LjNzLTIuOCA0LjItMTAuOSA2LjFjLTE0IDMuNC02Ni43IDYuMy03MS41IDYuNC0xMi45LjEtMjAuOC0zLjMtMjMtOC42LTYuNy0xNiA5LjYtMjMgOS42LTIzcy0zLjYtMi4yLTUuNy00LjJjLTEuOS0xLjktMy45LTUuNy00LjUtNC4zLTIuNSA2LjEtMy44IDIxLTEwLjUgMjcuNy05LjIgOS4zLTI2LjYgNi4yLTM2LjkuOC0xMS4zLTYgLjgtMjAuMS44LTIwLjFzLTYuMSAzLjYtMTEtMy44Yy00LjQtNi44LTguNS0xOC40LTcuNC0zMi43IDEuMi0xNi4zIDE5LjQtMzIuMSAxOS40LTMyLjFzLTMuMi0yNC4xIDcuMy00OC44YzkuNS0yMi41IDM1LjEtNDAuNiAzNS4xLTQwLjZzLTIxLjUtMjMuOC0xMy41LTQ1LjJjNS4yLTE0IDcuMy0xMy45IDktMTQuNSA2LTIuMyAxMS44LTQuOCAxNi4xLTkuNSAyMS41LTIzLjIgNDguOS0xOC44IDQ4LjktMTguOHMxMy0zOS41IDI1LTMxLjhjMy43IDIuNCAxNyAzMiAxNyAzMnMxNC4yLTguMyAxNS44LTUuMmM4LjYgMTYuNyA5LjYgNDguNiA1LjggNjgtNi40IDMyLTIyLjQgNDkuMi0yOC44IDYwLTEuNSAyLjUgMTcuMiAxMC40IDI5IDQzLjEgMTAuOSAyOS45IDEuMiA1NSAyLjkgNTcuOC4zLjUuNC43LjQuN3MxMi41IDEgMzcuNi0xNC41YzEzLjQtOC4zIDI5LjMtMTcuNiA0Ny40LTE3LjggMTcuNS0uMyAxOC40IDIwLjIgNS4yIDIzLjR6Ii8+PC9zdmc+
---
::: slot hero-brand
<span class="block sm:inline mb-10 sm:mb-0 sm:text-bold text-7xl sm:text-5xl font-medium"><span class="text-blue">Ts</span>.Logger</span><br/>
<small class="text-2xl">A <a class="text-darker-gray">Node.js</a> and <a class="text-darker-gray">TypeScript</a> multi channel logger</small>
:::        

::: slot hero-slogan
Manage your logs of your **application.** <WordsSlider>#Colored, #Console, #Configurable, #Extensible</WordsSlider>
:::

::: slot hero-content
<CLI />
:::

::: slot testimonial-title
What is it ?
:::

::: slot testimonial-content
Ts.Logger is a Node.js and TypeScript logger with multi channel support and configurable.
:::

<div class="w-full max-w-site mx-auto px-5 py-5 md:py-10">

<p class="text-center font-normal text-xl m-auto max-w-lg">There are some of the libraries and the technologies that we use or supports with this <strong>framework</strong></p>

<div class="mt-5 pt-5">
<Frameworks />
</div>

</div>