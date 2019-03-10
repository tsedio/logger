# Getting started
## Installation

```bash
npm install -g typescript
npm install ts-log-debug
npm install source-map-support
```

## Quick start

Minimalist version:

```typescript
import {$log} from "ts-log-debug";
$log.level = "debug";
$log.name = "APP";

$log.debug("Some debug messages");
```
Will be procude the following log output:
```
[2017-06-17 11:43:37.987] [DEBUG] [APP] - Some debug messages
```

## Create your own logger

```typescript
import {Logger} from "ts-log-debug";

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

Shutdown return a Promise that will be resolved when ts-log-debug has closed all appenders and finished writing log events.
Use this when your programme exits to make sure all your logs are written to files, sockets are closed, etc.

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");
logger
  .shutdown()
  .then(() => {
     console.log("Complete")
  });
```
