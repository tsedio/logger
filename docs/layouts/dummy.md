# Dummy

* type - `dummy`

This layout only outputs the first value in the log event's data.

#### Example

```typescript
import {Logger} from "ts-log-debug";

const logger = new Logger("loggerName");

logger.appenders
  .push({
      type: "console", layout: {type: "dummy"}, level: ["debug", "info", "trace"]
  });

logger.debug('Cheese is too ripe! Cheese was: ', cheeseName);
```

This will output:

```bash
Cheese is too ripe! Cheese was:
```