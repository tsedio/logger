---
sidebar: auto
otherTopics: true
---
# Getting started
## Installation

```bash
npm install -g typescript
npm install @tsed/logger
npm install source-map-support
```

## Quick start

Minimalist version:

```typescript
import {$log} from "@tsed/logger";
$log.level = "debug";
$log.name = "APP";

$log.debug("Some debug messages");
```
The following log output will be produced:
```
[2017-06-17 11:43:37.987] [DEBUG] [APP] - Some debug messages
```

## Create your own logger

```typescript
import {Logger} from "@tsed/logger";

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
        filename: `${__dirname}/app.log`,
        layout:{
            type: "json",
            separator: ","
        }
    });
```

## Shutdown

Shutdown returns a Promise that will be resolved when the logger has closed all appenders and finished writing log events.
Use this when your program exits to make sure all your logs are written to files, and sockets are closed, etc.

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");
logger
  .shutdown()
  .then(() => {
     console.log("Complete")
  });
```
