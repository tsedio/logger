# Appenders

Appenders serialise log events to some form of output. They can write to files, send emails, send data over the network. All appenders have a type which determines which appender gets used. For example:

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-file";
import "@tsed/logger-std";

const logger = new Logger("loggerName");

logger.appenders
  .set("stdout", {
    type: "stdout",
    levels: ["debug", "info", "trace"]
  })
  .set("stderr", {
    type: "stderr",
    levels: ["error", "fatal", "warn"]
  })
  .set("file", {
    type: "file",
    filename: "logfile.log"
  });
```

::: tip
This example defines three appenders named `stdout`, `stderr` and `file`.
:::

## Core Appenders

The following appenders are included with Ts.Logger.

<ApiList query="symbolName: Appender AND symbolType: class" />
