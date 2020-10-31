# Layouts

Layouts are functions used by appenders to format log events for output. They take a log event as an argument and return a string. TsLogDebug comes with several layouts built-in, and provides ways to create your own if these are not suitable.

For most use cases you will not need to configure layouts - there are some appenders which do not need layouts defined (for example, logFaces-UDP); all the appenders that use layouts will have a sensible default defined.

Most appender configuration will take a field called layout, which is an object - typically with a single field type which is the name of a layout defined below. Some layouts require extra configuration options, which should be included in the same object.

## Example

```typescript
import {Logger} from "@tsed/logger";

const logger = new Logger("loggerName");

logger.appenders
  .set("std-log", {
      type: "stdout", layout: {type: "basic"}, level: ["debug", "info", "trace"]
  });
```
::: tip
This configuration replaces the stdout appender's default colored layout with basic layout.
:::
## Built-in Layouts

<ApiList query="symbolName: Layout AND symbolType: class" />

