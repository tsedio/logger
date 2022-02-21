# Basic layout

- type - `basic`

Basic layout will output the timestamp, level, category, followed by the formatted log event data.

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "stdout",
  layout: {type: "basic"},
  level: ["debug", "info", "trace"]
});
logger.debug("Log something");
```

This will output:

```bash
[2017-03-30 07:57:00.113] [DEBUG] [loggerName] - Log something
```
