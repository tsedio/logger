# LogEntries Appender

Sends log events to a [LogEntries](https://www.npmjs.com/package/le_node) server.

```bash
npm install --save @tsed/logger-logentries le_node
```

## Configuration

* `type` - `smtp`
* `options.token` - LogEntries token

See all available options for LogEntries [here](https://www.npmjs.com/package/le_node).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logentries"

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "logentries",
  level: ["info"],
  options: {
    token: "the token"
    // other options of logentries
  }
});
```
