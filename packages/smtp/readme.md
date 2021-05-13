# @tsed/logger-smtp

[![Build Status](https://travis-ci.org/tsedio/logger.svg?branch=master)](https://travis-ci.org/tsedio/logger)
[![Coverage Status](https://coveralls.io/repos/github/tsedio/logger/badge.svg?branch=master)](https://coveralls.io/github/tsedio/logger?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/%40tsed%2Flogger.svg)](https://badge.fury.io/js/%40tsed%2Flogger)
[![Dependencies](https://david-dm.org/tsedio/logger.svg)](https://david-dm.org/tsedio/logger#info=dependencies)
[![img](https://david-dm.org/tsedio/logger/dev-status.svg)](https://david-dm.org/tsedio/logger/#info=devDependencies)
[![img](https://david-dm.org/tsedio/logger/peer-status.svg)](https://david-dm.org/tsedio/logger/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/tsedio/logger/badge.svg)](https://snyk.io/test/github/tsedio/ts-express-decorators)

<p style="text-align: center" align="center">
 <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

A package of Ts.ED logger framework.

## Features

Sends log events as emails. If you use this appender, you should also call shutdown when your application closes so that any remaining emails can be sent. Many of the configuration options below are passed through to nodemailer, so you should read their docs to get the most out of this appender.

## Configuration

* `type` - `smtp`
* `SMTP` - `object` (optional, if not present will use `transport` field)
  * `host` - `string` (optional, defaults to `localhost`)
  * `port` - `integer` (optional, defaults to `25`)
  * `auth` - `object` (optional) - authentication details
    * `user` - `string`
    * `pass` - `string`
* `transport` - `object` (optional, if not present will use `SMTP`) - see [`nodemailer`](https://nodemailer.com/smtp/) docs for transport options
  * `plugin` - `string` (optional, defaults to `smtp`) - the nodemailer transport plugin to use
  * `options` - `object` - configuration for the transport plugin
* `attachment` - `object` (optional) - send logs as email attachment
  * `enable` - `boolean` (optional, defaults to `false`)
  * `message` - `string` (optional, defaults to `See logs as attachment`) - message to put in body of email
  * `filename` - `string` (optional, defaults to `default.log`) - attachment filename
* `sendInterval` - `integer` (optional, defaults to `0`) - batch emails and send in one email every `sendInterval` seconds, if `0` then every log message will send an email.
* `shutdownTimeout` - `integer` (optional, defaults to `5`) - time in seconds to wait for emails to be sent during shutdown
* `recipients` - `string` - email addresses to send the logs to
* `subject` - `string` (optional, defaults to message from first log event in batch) - subject for email
* `sender` - `string` (optional) - who the logs should be sent as
* `html` - `boolean` (optional, defaults to `false`) - send the email as HTML instead of plain text
* `layout` - `object` (optional, defaults to basicLayout) - see [layouts](https://logger.tsed.io/layouts.html)
* `cc` - `string` (optional) - email addresses to send the carbon-copy logs to
* `bcc` - `string` (optional) - email addresses to send the blind-carbon-copy logs to

## Example (default config)

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-smtp"

const logger = new Logger("loggerName");

logger.appenders.set("email", {
  type: "smtp", 
  level: ["error"],
  recipients: "dev.team@company.name"
});
```

This configuration will send an email using the smtp server running on `localhost:25`, for every log event of level `ERROR` and above. 
The email will be sent to `dev.team@company.name`, the subject will be the message part of the log event, the body of the email will be log event formatted by the basic layout function.

## Example (logs as attachments, batched)

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-smtp"

const logger = new Logger("loggerName");

logger.appenders.set("email", {
  type: "smtp", 
  level: ["error"],
  recipients: "dev.team@company.name",
  subject: "Latest logs",
  sender: "my.application@company.name",
  attachment: {
    enable: true,
    filename: "latest.log",
    message: "See the attachment for the latest logs"
  },
  sendInterval: 3600
});
```

This configuration will send an email once every hour, with all the log events of level `ERROR` and above as an attached file.

## Example (custom SMTP host)

```javascript
import {Logger} from "@tsed/logger";
import "@tsed/logger-smtp"

const logger = new Logger("loggerName");

logger.appenders.set("email", {
  type: "smtp", 
  level: ["error"],
  recipients: "dev.team@company.name",
  SMTP: { host: 'smtp.company.name', port: 8025 }
});
```

This configuration can also be written as:

```javascript
import {Logger} from "@tsed/logger";
import "@tsed/logger-smtp"

const logger = new Logger("loggerName");

logger.appenders.set("email", {
  type: "smtp", 
  level: ["error"],
  recipients: "dev.team@company.name",
  transport: {
    plugin: 'smtp',
    options: {
      host: 'smtp.company.name',
      port: 8025
    }
  }
});
```
A similar config can be used to specify a different transport plugin than `smtp`. See the [`nodemailer`](https://nodemailer.com/smtp/) docs for more details.

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/tsed#backer)]

<a href="https://opencollective.com/tsed#backers" target="_blank"><img src="https://opencollective.com/tsed/tiers/backer.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/tsed#sponsor)]

## License

The MIT License (MIT)

Copyright (c) 2016 - 2018 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
