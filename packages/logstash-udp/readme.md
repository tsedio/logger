# @tsed/logger-logstash-udp

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

The logstash appenders for [Ts.ED Logger](https://logger.tsed.io).

The logstash-udp appender supports sending log events to a [Logstash](https://www.elastic.co/products/logstash) server. 
It uses the node.js core UDP support, and so requires no extra dependencies. 
Remember to call `logger.shutdown` in your application if you want the UDP socket closed cleanly.

## Installation

```bash
npm install --save @tsed/logger-logstash-udp
```

## Configuration

* `type` - `logstash-udp`
* `options.host` - `string` - hostname (or IP-address) of the logstash server
* `options.port` - `integer` - port of the logstash server
* `options.layout` - (optional, defaults to dummyLayout) - used for the message field of the logstash data (see layouts)
* `options.extraDataProvider` - function (optional, defaults to put the second param of log to fields) - used to enhance the object sent to Logstash via UDP. this will be passed the log event and should return an object.

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logstash-udp";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "logstash-udp", 
  level: ["info"],
  options: {
    host: 'log.server',
    port: 12345
  }
});

logger.info("important log message", { cheese: 'gouda', biscuits: 'hobnob' });
```

This will result in a JSON message being sent to log.server:12345 over UDP, with the following format:

```javascript
{
  '@version': '1',
  '@timestamp': '2014-04-22T23:03:14.111Z',
  'host': 'yourHostname',
  'level': 'INFO',
  'category': 'default',
  'message': 'important log message',
  'fields': {
    'biscuits': 'hobnob',
    'cheese': 'gouda'
  }
}
```

### use extraDataProvider

```javascript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logstash-udp";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "loggly",
  level: ["info"],
  options: {
    host: 'log.server',
    port: 12345,
    extraDataProvider: loggingEvent => ({
      host: 'anotherHostname',  // this will replace the default real host
      clientIp: '1.2.3.4', // this will be added
      fields: {
        tag: 'myTag', // this will be added to the fields
        pid: loggingEvent.pid, // this will be added to the fields
        cheese: 'defaultCheese' // this will be added to the fields but will not be replaced in this example
      }
    })
  }
});

logger.info("important log message", { cheese: 'gouda', biscuits: 'hobnob' });
```
This will result in a JSON message being sent to log.server:12345 over UDP, with the following format:

```javascript
{
  '@version': '1',
  '@timestamp': '2014-04-22T23:03:14.111Z',
  'host': 'anotherHostname',
  'level': 'INFO',
  'category': 'default',
  'message': 'important log message',
  'clientIp': '1.2.3.4',
  'fields': {
    'cheese': 'defaultCheese',
    'tag': 'myTag',
    'pid': 123
  }
}
```

So, if not using the default `extraDataProvider`, you have to put the second param of the log to the fields yourself if you want.

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
