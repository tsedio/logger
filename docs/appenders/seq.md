# Seq Appender

Sends log events to a [Seq](https://www.npmjs.com/package/bunyan-seq) server.

```bash
npm install --save @tsed/seq bunyan bunyan-seq @types/bunyan @types/bunyan-seq
```

## Configuration

* `type` - `seq`
* `options.url` - The url log server
* `options.apiKey` - The apiKey

See all available options for Seq [here](https://www.npmjs.com/package/bunyan-seq).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-seq"

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "seq",
  level: ["info"],
  options: {
    url: 'http://localhost:5341',
    apiKey: "the token"
    // other Seq options
  }
});
```
