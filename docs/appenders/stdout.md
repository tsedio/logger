# Standard Out Appender

This appender writes all log events to the standard output stream.

## Configuration

type - `stdout`
layout - object (optional, defaults to coloredLayout) - see [layouts](/layouts/index.md)

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "stdout",
  levels: ["debug", "trace", "info"]
});
```
