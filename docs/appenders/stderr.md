# Standard Error Appender

This appender writes all log events to the standard error stream.

## Configuration

type - `stderr`
layout - object (optional, defaults to coloredLayout) - see [layouts](/layouts/readme.md)

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders.set("error-log", {
  type: "strerr",
  levels: ["debug", "trace", "info"]
});
```
