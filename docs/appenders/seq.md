# Seq Appender

<Banner src="https://blog.datalust.co/content/images/2018/09/Seq-380px-1.png" height="200" href="https://datalust.co/seq"></Banner>

Sends log events to a [Seq](https://www.npmjs.com/package/seq-logging) server.

```bash
npm install --save @tsed/seq
```

## Configuration

- `type` - `seq`
- `options.url` - The url log server
- `options.apiKey` - The apiKey

See all available options for Seq [here](https://www.npmjs.com/package/seq-logging).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-seq";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "seq",
  level: ["info"],
  options: {
    serverUrl: "http://localhost:5341",
    apiKey: "the token"
    // other Seq options
  }
});
```
