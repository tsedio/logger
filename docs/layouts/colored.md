# Colored layout

- type - `colored`

This layout is the same as basic, except that the timestamp, level and category will be colored according to the log event's level (if your terminal/file supports it - if you see some weird characters in your output and no color then you should probably switch to basic). The colors used are:

- TRACE - `blue`
- DEBUG - `cyan`
- INFO - `green`
- WARN - `yellow`
- ERROR - `red`
- FATAL - `magenta`

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "stdout",
  layout: {type: "colored"},
  level: ["debug", "info", "trace"]
});
logger.debug("Log something");
```

This will output:

```bash
[2017-03-30 07:57:00.113] [DEBUG] [loggerName] - Log something
```
