---
otherTopics: true
---

# Getting started

## Installation

```bash
npm install @tsed/logger
```

`@tsed/logger` v8 is ESM only and ships the console appender and the colored layout. Other appenders and layouts are
installed and imported on demand:

```bash
npm install @tsed/logger-std @tsed/logger-file @tsed/logger-pattern-layout
```

See the [migration guide](/introduction/migrate-to-v8) when you come from v7.

## Quick start

Minimalist version:

```typescript
import {$log} from "@tsed/logger";

$log.level = "debug";
$log.name = "APP";

$log.debug("Some debug messages");
```

Will be produce the following log output:

```
[2017-06-17 11:43:37.987] [DEBUG] [APP] - Some debug messages
```

## Create your own logger

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger/layouts/JsonLayout.js"; // registers the "json" layout
import "@tsed/logger-file"; // registers the "file" appender
import "@tsed/logger-pattern-layout"; // registers the "pattern" layout
import "@tsed/logger-std"; // registers the "stdout" and "stderr" appenders

const logger = new Logger("loggerName");
logger.appenders
  .set("std-log", {
    type: "stdout",
    levels: ["debug", "info", "trace"]
  })
  .set("error-log", {
    type: "stderr",
    levels: ["fatal", "error", "warn"],
    layout: {
      type: "pattern",
      pattern: "%d %p %c %X{user} %m%n"
    }
  })
  .set("all-log-file", {
    type: "file",
    filename: `${import.meta.dirname}/app.log`,
    layout: {
      type: "json",
      separator: ","
    }
  });
```

::: warning
An appender or a layout whose package is not imported is unknown to the logger: it prints a warning and falls back to the
console appender or the colored layout.
:::

## Shutdown

Shutdown return a Promise that will be resolved when logger has closed all appenders and finished writing log events.
Use this when your programme exits to make sure all your logs are written to files, sockets are closed, etc.

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");
logger.shutdown().then(() => {
  console.log("Complete");
});
```
