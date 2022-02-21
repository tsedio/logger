# @tsed/logger-loggly

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

Sends logging events to [Loggly](https://www.loggly.com), optionally adding tags.
This appender uses [node-loggly-bulk](https://www.npmjs.com/package/node-loggly-bulk).
Consult the docs for node-loggly-bulk, or loggly itself, if you want more information on the configuration options below.

## Installation

```bash
npm install --save @tsed/logger-loggly
```

## Configuration

- `type` - `loggly`
- `options.token` - `string` - your really long input token
- `options.subdomain` - `string` - your subdomain
- `options.auth` - `object` (optional) - authentication details
  - `username` - `string`
  - `password` - `string`
- `options.tags` - `Array<string>` (optional) - tags to include in every log message

See all available options for Loggly [here](https://www.npmjs.com/package/node-loggly-bulk).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-loggly";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "loggly",
  level: ["info"],
  options: {
    token: "somethinglong",
    subdomain: "your.subdomain",
    tags: ["tag1"]
  }
});

logger.info({tags: ["my-tag-1", "my-tag-2"]}, "Some message");
```

This will result in a log message being sent to loggly with the tags `tag1`, `my-tag-1`, `my-tag-2`.

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
