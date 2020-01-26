---
home: true
layout: home
pageClass: homepage
meta:
 - name: description
   content: A Node.js and TypeScript multi chanel logger.
 - name: keywords
   content: Ts.LogDebug nodejs typescript logger javascript decorators
actionText: Get Started →
actionLink: /getting-started.html
repoText: Github
repoLink: https://github.com/TypedProject/ts-log-debug
heroText: Ts.LogDebug
heroDescription: A Node.js and TypeScript multi chanel logger
heroTerms:
- Colored
- Console
- Configurable
- Extensible
testimonial:
  title: What is it ?
  details: Ts.LogDebug is a Node.js and TypeScript logger with multi chanel support and configurable.
features:
- title: Colored
  details: Colored console logging to stdout or stderr.
- title: Multi chanel
  details: File appender, with configurable log rolling based on file size.
- title: Extensible
  details: Use decorators to declare your own appenders and layouts logger.
contributors:
 title : Our<br /><b>Contributors</b>
 button:
   text: Become contributor
   link: /contributing.html
backers:
 title: Our<br /><b>Backers</b>
 details: Thank you to all our backers! 🙏
 src: https://opencollective.com/tsed/tiers/backer.svg?width=890
 link: https://opencollective.com/tsed#backers
 button:
   text: Become backers
   link: https://opencollective.com/tsed#backers
sponsors:
 title: Our<br /><b>sponsors</b>
 details: Support this project by becoming a sponsor. Your logo will show up here with a link to your website.
 src: https://opencollective.com/tsed/tiers/sponsor.svg?width=890
 link: https://opencollective.com/tsed#sponsor
 button:
   text: Become sponsor
   link: https://opencollective.com/tsed#sponsor
showContent: false
---

# TsLogDebug 

[![Build Status](https://travis-ci.org/TypedProject/ts-log-debug.svg?branch=master)](https://travis-ci.org/TypedProject/ts-log-debug)
[![Coverage Status](https://coveralls.io/repos/github/TypedProject/ts-log-debug/badge.svg?branch=master)](https://coveralls.io/github/TypedProject/ts-log-debug?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/) 
[![Package Quality](http://npm.packagequality.com/shield/ts-log-debug.png)](http://packagequality.com/#?package=ts-log-debug)
[![npm version](https://badge.fury.io/js/ts-log-debug.svg)](https://badge.fury.io/js/ts-log-debug)
[![Dependencies](https://david-dm.org/TypedProject/ts-log-debug.svg)](https://david-dm.org/TypedProject/ts-log-debug#info=dependencies)
[![img](https://david-dm.org/TypedProject/ts-log-debug/dev-status.svg)](https://david-dm.org/TypedProject/ts-log-debug/#info=devDependencies)
[![img](https://david-dm.org/TypedProject/ts-log-debug/peer-status.svg)](https://david-dm.org/TypedProject/ts-log-debug/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/TypedProject/ts-log-debug/badge.svg)](https://snyk.io/test/github/TypedProject/ts-express-decorators)



* Colored console logging,
* Configurable log message layout/patterns.

> A multi channel logger written in TypeScript.

## Features

* Colored console logging to stdout or stderr,
* 
* 
* Different log levels for different log categories (make some parts of your app log as DEBUG, others only ERRORS, etc.).

Please refer to the [documentation](https://typedproject.github.io/ts-log-debug/) for more details.

## Installation

```bash
npm install -g typescript
npm install ts-log-debug
npm install source-map-support
```

## Breaking change 3.x

Since v3.x, the logger is completely rewritten to support new features. This new version is inspired by the excellent project [log4js](https://github.com/nomiddlename/log4js-node/).

## Quick start

Minimalist version:

```typescript
import {$log} from "@tsed/logger";
$log.level = "debug";
$log.name = "APP";

$log.debug("Some debug messages");
```
Will be procude the following log output:
```
[2017-06-17 11:43:37.987] [DEBUG] [APP] - Some debug messages
```

Create your custom logger:
```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");
logger.appenders
    .set("std-log", {
        type: "stdout",
        levels: ["debug", "info", "trace"]
    })
    .set("error-log", {
        type: "stderr",
        levels: ["fatal", "error", "warn"],
        layout: {
          type: "pattern",
          pattern: "%d %p %c %X{user} %m%n"
        }
    })
    .set("file-log", {
        type: "file",
        filename: `${__dirname}/app.log`,
        layout:{
            type: "json",
            separator: ","
        }
    });
```

