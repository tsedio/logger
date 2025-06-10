# @tsed/logger-file

[![Build Status](https://travis-ci.org/tsedio/logger.svg?branch=master)](https://travis-ci.org/tsedio/logger)
[![Coverage Status](https://coveralls.io/repos/github/tsedio/logger/badge.svg?branch=master)](https://coveralls.io/github/tsedio/logger?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/%40tsed%2Flogger.svg)](https://badge.fury.io/js/%40tsed%2Flogger)
[![Dependencies](https://david-dm.org/tsedio/logger.svg)](https://david-dm.org/tsedio/logger#info=dependencies)
[![img](https://david-dm.org/tsedio/logger/dev-status.svg)](https://david-dm.org/tsedio/logger/#info=devDependencies)
[![img](https://david-dm.org/tsedio/logger/peer-status.svg)](https://david-dm.org/tsedio/logger/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/tsedio/logger/badge.svg)](https://snyk.io/test/github/tsedio/ts-express-decorators)

<p style="text-align: center" align="center">
 <a href="https://tsed.dev" target="_blank"><img src="https://tsed.dev/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

A package of Ts.ED logger framework.

## Features

The file appender writes log events to a file. It supports an optional maximum file size, and will keep a configurable
number of backups.
When using the file appender, you should also call [logger.shutdown()](https://logger.tsed.dev/introduction/getting-started.md) when your application terminates,
to ensure that any remaining asynchronous writes have finished.
Although the file appender uses the [streamroller](https://github.com/nomiddlename/streamroller) library, this is included as a dependency of ts-log-debug so you do not
need to include it yourself.

## Installation

```
npm install --save @tsed/logger-file
```

## Configuration

- **type** - `file`
- **filename - string** - the path of the file where you want your logs written.
- **maxLogSize - integer** (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
- **backups - integer** (optional, default value = 5) - the number of old log files to keep during log rolling.
- **layout** - (optional, defaults to basic layout) - see [layouts](https://logger.tsed.dev/layouts/index.md)

Any other configuration parameters will be passed to the underlying [streamroller](https://github.com/nomiddlename/streamroller)
implementation (see also node.js core file streams):

- **encoding** - string (default “utf-8”)
- **mode** - integer (default 0644)
- **flags** - string (default ‘a’)
- **compress** - boolean (default false) - compress the backup files during rolling (backup files will have .gz extension)

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-file";

const logger = new Logger("loggerName");

logger.appenders.set("everything", {
  type: "file",
  filename: "all-the-logs.log"
});

logger.debug("I will be logged in all-the-logs.log");
```

This example will result in a single log file (all-the-logs.log) containing the log messages.

## Example with log rolling (and compressed backups)

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-file";

const logger = new Logger("loggerName");

logger.appenders.set("everything", {
  type: "file",
  filename: "all-the-logs.log",
  maxLogSize: 10485760,
  backups: 3,
  compress: true
});
```

This will result in one current log file (`all-the-logs.log`). When that reaches 10Mb in size, it will be renamed and
compressed to `all-the-logs.log.1.gz and a` new file opened called `all-the-logs.log`.
When `all-the-logs.log` reaches 10Mb again, then all-the-logs.log.1.gz will be renamed to
`all-the-logs.log.2.gz`, and so on.

## Example with date rolling

```typescript
import {Logger} from "@tsed/logger-file";
import "@tsed/logger-file";
export const logger = new Logger("Log Example");

logger.appenders.set("file", {
  type: "file",
  filename: `${__dirname}/../logs/myfile.log`,
  pattern: ".yyyy-MM-dd"
});
```

## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/tsed#backer)]

<a href="https://opencollective.com/tsed#backers" target="_blank"><img src="https://opencollective.com/tsed/tiers/backer.svg?width=890"></a>

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/tsed#sponsor)]

## License

The MIT License (MIT)

Copyright (c) 2016 - Today Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
