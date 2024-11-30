# @tsed/logger-rabbitmq

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

<div align="center">
<a href="http://www.passportjs.org/">
<img src="https://blog.datalust.co/content/images/2018/09/Seq-380px-1.png" height="128">
</a>
</div>

A package of Ts.ED logger framework.

## Features

Push log events to a [RabbitMQ](https://www.rabbitmq.com/).

## Installation

```
npm install --save @tsed/logger-rabbitmq
```

If you want to be sure that all messages have been sent before your programme exits, remember to call `logger.shutdown()`.

## Configuration

- `type` - `rabbitmq`
- `layout` - `object` (optional, defaults to `messagePassThroughLayout`) - the layout to use for log events (see [Layouts](https://logger.tsed.dev/layouts)).
- `options.host` - `string` (optional, defaults to `127.0.0.1`) - the location of the rabbitmq server
- `options.port` - `integer` (optional, defaults to `5672`) - the port the rabbitmq server is listening on
- `options.username` - `string` (optional, defaults to `guest`) - username to use when authenticating connection to rabbitmq
- `options.password` - `string` (optional, defaults to `guest`) - password to use when authenticating connection to rabbitmq
- `options.routing_key` - `string` (optional, defaults to `logstash`) - rabbitmq message's routing_key
- `options.durable` - `string` (optional, defaults to false) - will that RabbitMQ lose our queue.
- `options.exchange` - `string` (optional, defaults to `log`)- rabbitmq send message's exchange
- `options.mq_type` - `string` (optional, defaults to `direct`) - rabbitmq message's mq_type
- `options.vhost` - `string` (optional, defaults to `/`) - vhost to use
- `options.shutdownTimeout` - `integer` (optional, defaults to `10000`) - maximum time in milliseconds to wait for messages to be sent during log4js shutdown.

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-rabbitmq";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "rabbitmq",
  level: ["info"],
  options: {
    host: "127.0.0.1",
    port: 5672,
    username: "guest",
    password: "guest",
    routing_key: "logstash",
    exchange: "exchange_logs",
    mq_type: "direct",
    durable: true
  }
});
```

This configuration will push log messages to the rabbitmq on `127.0.0.1:5672`.

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
