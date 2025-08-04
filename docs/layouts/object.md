# Object layout

- type - `object`

## Example

```typescript
import {$log} from "@tsed/logger";
import {ObjectLayout} from "@tsed/logger/layouts/ObjectLayout.js";

logger.appenders.set("std-log", {
  type: "console",
  layout: ObjectLayout,
  level: ["debug", "info", "trace"]
});

$log.info("this is just a test");
$log.error("of a custom appender");
$log.warn("that outputs json");
```
