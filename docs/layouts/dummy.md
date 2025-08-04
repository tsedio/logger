# Dummy layout

- type - `dummy`

This layout only outputs the first value in the log event's data.

#### Example

```typescript
import {Logger} from "@tsed/logger";
import {DummyLayout} from "@tsed/logger/layouts/DummyLayout.js";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "console",
  layout: DummyLayout,
  level: ["debug", "info", "trace"]
});

logger.debug("Cheese is too ripe! Cheese was: ", cheeseName);
```

This will output:

```bash
Cheese is too ripe! Cheese was:
```
