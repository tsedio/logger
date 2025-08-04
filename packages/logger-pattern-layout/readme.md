# @tsed/logger-pattern-layout

[![Build Status](https://travis-ci.org/tsedio/logger.svg?branch=master)](https://travis-ci.org/tsedio/logger)
[![Coverage Status](https://coveralls.io/repos/github/tsedio/logger/badge.svg?branch=master)](https://coveralls.io/github/tsedio/logger?branch=master)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=100)](https://github.com/ellerbrock/typescript-badges/)
[![npm version](https://badge.fury.io/js/%40tsed%2Flogger-pattern-layout.svg)](https://badge.fury.io/js/%40tsed%2Flogger-pattern-layout)
[![Dependencies](https://david-dm.org/tsedio/logger.svg)](https://david-dm.org/tsedio/logger#info=dependencies)
[![img](https://david-dm.org/tsedio/logger/dev-status.svg)](https://david-dm.org/tsedio/logger/#info=devDependencies)
[![img](https://david-dm.org/tsedio/logger/peer-status.svg)](https://david-dm.org/tsedio/logger/#info=peerDependenciess)
[![Known Vulnerabilities](https://snyk.io/test/github/tsedio/logger/badge.svg)](https://snyk.io/test/github/tsedio/ts-express-decorators)

<p style="text-align: center" align="center">
 <a href="https://tsed.dev" target="_blank"><img src="https://tsed.dev/tsed-og.png" width="200" alt="Ts.ED logo"/></a>
</p>

Pattern layout module for [@tsed/logger](https://tsedio.github.io/logger/).

## Features

- Configurable log message layout/patterns
- Support for padding and truncation
- Custom tokens and context values
- Colored output blocks

## Installation

```bash
npm install @tsed/logger-pattern-layout
```

## Usage

```typescript
import {Logger} from "@tsed/logger";
import {PatternLayout} from "@tsed/logger-pattern-layout";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "stdout",
  layout: {
    type: PatternLayout,
    pattern: "%d %p %c %m%n"
  },
  level: ["debug", "info", "trace"]
});

logger.info("Hello world");
```

Will produce the following log output:

```
2023-08-04 11:46:00.123 INFO loggerName Hello world
```

## Pattern Format

The pattern string can contain any characters, but sequences beginning with `%` will be replaced with values taken from the log event and other environmental values.

Format for specifiers is `%[padding].[truncation][field]{[format]}` - padding and truncation are optional, and format only applies to a few tokens (notably, date).

Example: `%5.10p` - left pad the log level by 5 characters, up to a max of 10.

### Available Fields

- `%r` - time in toLocaleTimeString format
- `%p` - log level
- `%c` - log category
- `%h` - hostname
- `%m` - log data
- `%j` - log data as JSON
- `%d` - date, formatted - default is `ISO8601`, format options are: `ISO8601`, `ISO8601_WITH_TZ_OFFSET`, `ABSOLUTE`, `DATE`, or any string compatible with the date-format library. e.g. `%d{DATE}`, `%d{yyyy/MM/dd-hh.mm.ss}`
- `%%` - for when you want a literal `%` in your output
- `%n` - newline
- `%z` - process id (from process.pid)
- `%x{[tokenname]}` - add dynamic tokens to your log. Tokens are specified in the tokens parameter
- `%X{[tokenname]}` - add values from the Logger context. Tokens are keys into the context values
- `%[` - start a colored block (color will be taken from the log level)
- `%]` - end a colored block

## Custom Tokens

User-defined tokens can be either a string or a function. Functions will be passed the log event, and should return a string.

```typescript
import {Logger} from "@tsed/logger";
import {PatternLayout} from "@tsed/logger-pattern-layout";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "stdout",
  layout: {
    type: PatternLayout,
    pattern: "%d %p %c %x{user} %m%n",
    tokens: {
      user: (logEvent) => AuthLibrary.currentUser()
    }
  },
  level: ["debug", "info", "trace"]
});

logger.info("User action");
```

## Logger Context

You can also use the Logger context to store tokens and use them in your layouts.

```typescript
import {Logger} from "@tsed/logger";
import {PatternLayout} from "@tsed/logger-pattern-layout";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "stdout",
  layout: {
    type: PatternLayout,
    pattern: "%d %p %c %X{user} %m%n"
  },
  level: ["debug", "info", "trace"]
});

logger.context.add("user", "charlie");
logger.info("User logged in");
```

This would output:

```
2023-08-04 11:46:00.123 INFO loggerName charlie User logged in
```

> Note that you can also add functions to the Logger Context, and they will be passed the logEvent as well.

## License

The MIT License (MIT)

Copyright (c) 2016 - 2023 Romain Lenzotti

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.