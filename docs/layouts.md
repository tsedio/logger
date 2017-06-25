# Layouts

Layouts are functions used by appenders to format log events for output. They take a log event as an argument and return a string. Log4js comes with several appenders built-in, and provides ways to create your own if these are not suitable.

For most use cases you will not need to configure layouts - there are some appenders which do not need layouts defined (for example, logFaces-UDP); all the appenders that use layouts will have a sensible default defined.

Most appender configuration will take a field called layout, which is an object - typically with a single field type which is the name of a layout defined below. Some layouts require extra configuration options, which should be included in the same object.

## Example

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");

logger.appenders
  .set("std-log", {
      type: "stdout", layout: {type: "basic"}, level: ["debug", "info", "trace"]
  });
```
> This configuration replaces the stdout appender's default colored layout with basic layout.

## Built-in Layouts

- [Basic](layouts/basic.md)
- [Colored](layouts/colored.md)
- [Dummy](layouts/dummy.md)
- [Message Pass-Through](layouts/message-pass-through.md)
- [Json](layouts/json.md)
- [Pattern](layouts/pattern.md)

## Create your own layouts

You can add your own layouts with `@Layout()` before pushing a configure to your logger.

```typescript
// customLayout.ts
import {BaseLayout, LogEvent, Layout} from "ts-log-debug";
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
  };
}
```

This layout can be use like this:

```typescript
import {Logger} from "ts-log-debug";
import "./customLayout.ts";

const logger = new Logger("loggerName");

logger.appenders
  .set("std-log", {
      type: "console", layout:{type: "customJson"}, level: ["debug", "info", "trace"]
  });
logger.info('this is just a test');
logger.error('of a custom appender');
logger.warn('that outputs json');
```

This example outputs the following:
 
```bash
{"startTime":"2017-06-05T22:23:08.479Z","categoryName":"json-test","data":["this is just a test"],"level":"INFO","context":{}},
{"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["of a custom appender"],"level":"ERROR","context":{}},
{"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["that outputs json"],"level""WARN","context":{}},
```

