# Object layout

- type - `object`

## Example

```typescript
import {$log} from "@tsed/logger";
import "@tsed/logger-connect";
import {myLogger} from "./MyLogger";

$log.clear()
$log.appenders.set("std-log-json", {
  type: "connect",
  options: {
    logger: myLogger // should implements .info/debug/trace/warn/error/fatal
  }
});

$log.info("this is just a test");
$log.error("of a custom appender");
$log.warn("that outputs json");
```
