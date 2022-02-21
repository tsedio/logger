# Json layout

- type - `json`
- separator - string - char that separate each line

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders.set("std-log-json", {
  type: "console",
  layout: {type: "json", separator: ","},
  level: ["debug", "info", "trace"]
});

logger.info("this is just a test");
logger.error("of a custom appender");
logger.warn("that outputs json");
```

This example outputs the following:

```bash
{"startTime":"2017-06-05T22:23:08.479Z","categoryName":"json-test","data":["this is just a test"],"level":"INFO","context":{}},
{"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["of a custom appender"],"level":"ERROR","context":{}},
{"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["that outputs json"],"level""WARN","context":{}},
```
