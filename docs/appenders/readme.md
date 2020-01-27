# Appenders

Appenders serialise log events to some form of output. They can write to files, send emails, send data over the network. All appenders have a type which determines which appender gets used. For example:

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders
  .push({
      type: "stdout", level: ["debug", "info", "trace"]
  })
  .push({
      type: "stderr", level: ["error", "fatal", "warn"]
  })
  .push({
      type: "file", filename: "logfile.log"
  });
```

::: tip
This example defines three appenders named `stdout`, `stderr` and `file`.
:::

## Core Appenders

The following appenders are included with Ts.Logger.

<ApiList query="symbolName.indexOf('Appender') > -1 && symbolType === 'class'" />
