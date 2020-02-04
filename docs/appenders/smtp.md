# SMTP Appender

Sends log events as emails. If you use this appender, you should also call `logger.shutdown` when your application closes so that any remaining emails can be sent. Many of the configuration options below are passed through to nodemailer, so you should read their docs to get the most out of this appender.

```bash
npm install @tsed/logger
npm install @tsed/logger-smtp
```

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
