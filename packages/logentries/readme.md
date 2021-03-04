# @tsed/logger-smtp

[![Build Status](https://travis-ci.org/TypedProject/logger.svg?branch=master)](https://travis-ci.org/TypedProject/logger)
[![Coverage Status](https://coveralls.io/repos/github/TypedProject/logger/badge.svg?branch=master)](https://coveralls.io/github/TypedProject/logger?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/) 
[![Package Quality](http://npm.packagequality.com/shield/logger.png)](http://packagequality.com/#?package=ts-log-debug)
[![npm version](https://badge.fury.io/js/logger.svg)](https://badge.fury.io/js/logger)
[![Dependencies](https://david-dm.org/TypedProject/logger.svg)](https://david-dm.org/TypedProject/logger#info=dependencies)
[![img](https://david-dm.org/TypedProject/logger/dev-status.svg)](https://david-dm.org/TypedProject/logger/#info=devDependencies)
[![img](https://david-dm.org/TypedProject/logger/peer-status.svg)](https://david-dm.org/TypedProject/logger/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/TypedProject/logger/badge.svg)](https://snyk.io/test/github/TypedProject/ts-express-decorators)

<p style="text-align: center" align="center">
 <a href="https://tsed.io" target="_blank"><img src="https://tsed.io/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

A package of Ts.ED logger framework.

## Features

Sends log events to a LogEntries server.

## Installation

```
npm install --save @tsed/logger-logentries le_node
```

## Configuration

* `type` - `smtp`
* `options.token` - LogEntries token

See all available options for LogEntries [here](https://www.npmjs.com/package/le_node).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logentries"

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "logentries", 
  level: ["info"],
  options: {
    token: "the token"
    // other options of logentries
  }
});
```

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
