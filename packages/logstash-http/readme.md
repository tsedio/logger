# @tsed/logger-logstash-http

[![Build Status](https://travis-ci.org/TypedProject/logger.svg?branch=master)](https://travis-ci.org/TypedProject/logger)
[![Coverage Status](https://coveralls.io/repos/github/TypedProject/logger/badge.svg?branch=master)](https://coveralls.io/github/TypedProject/logger?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/%40tsed%2Flogger.svg)](https://badge.fury.io/js/%40tsed%2Flogger)
[![Dependencies](https://david-dm.org/TypedProject/logger.svg)](https://david-dm.org/TypedProject/logger#info=dependencies)
[![img](https://david-dm.org/TypedProject/logger/dev-status.svg)](https://david-dm.org/TypedProject/logger/#info=devDependencies)
[![img](https://david-dm.org/TypedProject/logger/peer-status.svg)](https://david-dm.org/TypedProject/logger/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/TypedProject/logger/badge.svg)](https://snyk.io/test/github/TypedProject/ts-express-decorators)

<p style="text-align: center" align="center">
 <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

A package of Ts.ED logger framework.

## Features


The logstash appenders for [Ts.ED Logger](https://logger.tsed.io) send NDJSON formatted log events to [logstash](https://www.elastic.co/products/logstash) receivers. 
This appender uses HTTP to send the events (there is another logstash appender that uses [UDP](https://logger.tsed.io/appenders/logstash-udp.html)).

## Installation

```bash
npm install --save @tsed/logger-logstash-http
```

## Configuration

* `type` - `logstash-http`
* `options.url` - `string` - logFaces receiver servlet URL
* `options.application` - `string` (optional) - used to identify your application's logs
* `options.logChannel` - `string` (optional) - also used to identify your application's logs [but in a more specific way]
* `options.logType` - `string` (optional) - used for the `type` field in the logstash data
* `options.timeout` - `integer` (optional, defaults to 5000ms) - the timeout for the HTTP request.

This appender will also pick up Logger context values from the events, and add them as `p_` values in the logFaces event. See the example below for more details.

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-loggly";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "loggly", 
  level: ["info"],
  options: {
    url: 'http://localhost:9200/_bulk', 
    application: 'logstash-tsed', 
    logType: 'application', 
    logChannel: 'node'
  }
});

logger.context.set('requestId', '123');
logger.info('some interesting log message');
logger.error('something has gone wrong');
```

This example will result in two log events being sent to your `localhost:9200`. 
Both events will have a `context.requestId` property with a value of `123`.

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
