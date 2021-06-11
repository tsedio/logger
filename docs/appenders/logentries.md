# LogEntries Appender

<Banner src="/logentries.svg" height="120" href="https://logentries.com/"></Banner>

Sends log events to a [LogEntries](https://logentries.com/) server.

::: warning Deprecated
`le_node` module is deprecated by is author in favor of `r7insight_node`.
Please use [Insight appender](/appenders/insight.md) instead of.
:::

```bash
npm install --save @tsed/logger-logentries
```

## Configuration

* `type` - `logentries`
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
