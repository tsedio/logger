# Custom layout

You can add your own layouts with @@Layout()@@ before pushing a configure to your logger.

::: code-group

```typescript [Decorator]
// customLayout.ts
import {BaseLayout, LogEvent, Layout} from "@tsed/logger";
import {formatLogData} from "ts-log-debug/lib/utils/inpectUtils";

@Layout({name: "customJson"})
export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?): string {
    const log = {
      startTime: loggingEvent.startTime,
      categoryName: loggingEvent.categoryName,
      level: loggingEvent.level.toString(),
      data: loggingEvent.data,
      context: loggingEvent.context
    };

    log.data = log.data.map((data) => formatLogData([data]));

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}
```

```typescript [Functional API]
// customLayout.ts
import {BaseLayout, LogEvent, Layout, layout} from "@tsed/logger";
import {formatLogData} from "ts-log-debug/lib/utils/inpectUtils";

export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?): string {
    const log = {
      startTime: loggingEvent.startTime,
      categoryName: loggingEvent.categoryName,
      level: loggingEvent.level.toString(),
      data: loggingEvent.data,
      context: loggingEvent.context
    };

    log.data = log.data.map((data) => formatLogData([data]));

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}

layout("customJson", JsonLayout)
```

:::


This layout can be use like this:

```typescript
import {Logger} from "@tsed/logger";
import "./customLayout.ts";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "console",
  layout: {type: "customJson"},
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
