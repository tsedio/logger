# Insight Appender

<Banner src="/rapid7.svg" height="150" href="https://www.rapid7.com/products/"></Banner>

Sends log events to a [Insight](https://www.rapid7.com/products/) server.

```bash
npm install --save @tsed/logger-insight
```

## Configuration

* `type` - `insight`
* `options.token` - LogEntries token
* `options.region` - The region of ingestion endpoint to be used. Examples: `eu`, `us` etc.

See all available options for Insight [here](https://www.npmjs.com/package/r7insight_node).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-insight"

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "insight",
  level: ["info"],
  options: {
    token: "the token",
    region: "us"
    // other options of logentries
  }
});
```
