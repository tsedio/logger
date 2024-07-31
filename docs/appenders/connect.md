# Connect Appender

The module let developer use external logger that implement the classic logger methods (info, debug, warn, trace, error, fatal).

```bash
npm install --save @tsed/logger-connect
```

## Configuration

- `type` - `connect`
- `options.logger` - your instance logger

## Example

```typescript
import {$log} from "@tsed/logger";
import "@tsed/logger-connect";

$log.appenders.clear()
$log.appenders.set("channel", {
  type: "connect",
  logger: {
    info: (obj) => console.log(obj),
    warn: (obj) => console.warn(obj),
    debug: (obj) => console.debug(obj),
    trace: (obj) => console.trace(obj),
    error: (obj) => console.error(obj),
  }
});

$log.info({tags: ["my-tag-1", "my-tag-2"]}, "Some message");
```
