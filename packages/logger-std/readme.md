# @tsed/logger-std

[![Build Status](https://travis-ci.org/tsedio/logger.svg?branch=master)](https://travis-ci.org/tsedio/logger)
[![Coverage Status](https://coveralls.io/repos/github/tsedio/logger/badge.svg?branch=master)](https://coveralls.io/github/tsedio/logger?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/%40tsed%2Flogger-std.svg)](https://badge.fury.io/js/%40tsed%2Flogger-std)
[![Dependencies](https://david-dm.org/tsedio/logger.svg)](https://david-dm.org/tsedio/logger#info=dependencies)
[![img](https://david-dm.org/tsedio/logger/dev-status.svg)](https://david-dm.org/tsedio/logger/#info=devDependencies)
[![img](https://david-dm.org/tsedio/logger/peer-status.svg)](https://david-dm.org/tsedio/logger/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/tsedio/logger/badge.svg)](https://snyk.io/test/github/tsedio/ts-express-decorators)

<p style="text-align: center" align="center">
 <a href="https://tsed.dev" target="_blank"><img src="https://tsed.dev/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

Stdout and Stderr appender module for [@tsed/logger](https://tsedio.github.io/logger/).

## Features

- Standard output (stdout) appender for info, debug, and trace level logs
- Standard error (stderr) appender for error, warn, and fatal level logs
- Configurable log message layout
- Easy integration with @tsed/logger

## Installation

```bash
npm install @tsed/logger-std
```

## Usage

### StdoutAppender

The StdoutAppender writes all log events to the standard output stream.

```typescript
import {Logger} from "@tsed/logger";
import {StdoutAppender} from "@tsed/logger-std";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: StdoutAppender,
  levels: ["info", "debug", "trace"]
});

logger.info("Hello world");
```

### StderrAppender

The StderrAppender writes all log events to the standard error stream.

```typescript
import {Logger} from "@tsed/logger";
import {StderrAppender} from "@tsed/logger-std";

const logger = new Logger("loggerName");

logger.appenders.set("stderr", {
  type: StderrAppender,
  levels: ["error", "warn", "fatal"]
});

logger.error("An error occurred");
```

### Using Both Appenders

You can use both appenders together to direct different log levels to the appropriate output streams:

```typescript
import {Logger} from "@tsed/logger";
import {StdoutAppender, StderrAppender} from "@tsed/logger-std";

const logger = new Logger("loggerName");

// Configure stdout for normal logging
logger.appenders.set("stdout", {
  type: StdoutAppender,
  levels: ["info", "debug", "trace"]
});

// Configure stderr for error logging
logger.appenders.set("stderr", {
  type: StderrAppender,
  levels: ["error", "warn", "fatal"]
});

logger.info("Normal operation"); // Goes to stdout
logger.error("Something went wrong"); // Goes to stderr
```

### Custom Layout

You can customize the output format by specifying a layout:

```typescript
import {Logger} from "@tsed/logger";
import {StdoutAppender} from "@tsed/logger-std";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: StdoutAppender,
  levels: ["info", "debug", "trace"],
  layout: {
    type: "pattern",
    pattern: "%d %p %c %m%n"
  }
});

logger.info("Custom formatted log");
```

## Configuration Options

Both StdoutAppender and StderrAppender accept the following configuration options:

- `type` - The appender type (StdoutAppender or StderrAppender)
- `levels` - Array of log levels to output through this appender
- `layout` - (optional) Layout configuration object, defaults to colored layout

## License

The MIT License (MIT)

Copyright (c) 2016 - 2023 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.