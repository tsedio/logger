# Message Pass-Through layout

type - `messagePassThrough`

This layout just formats the log event data, and does not output a timestamp,
level or category. It is typically used in appenders that serialise the events using a specific format.

## Example

```typescript
import {Logger} from "@tsed/logger";
import {MessagePassThroughLayout} from "@tsed/logger/layouts/MessagePassThroughLayout.js";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "console",
  layout: MessagePassThroughLayout,
  level: ["debug", "info", "trace"]
});
logger.debug("Log something");
```

This will output:

```bash
Log something
```
