# Standard Out Appender

This appender writes all log events to the standard output stream.

## Installation

:::code-group

```bash [npm]
npm install @tsed/logger-std
```

```bash [yarn]
yarn add @tsed/logger-std
```

```bash [pnpm]
pnpm add @tsed/logger-std
```

```bash [bun]
bun add @tsed/logger-std
```

:::

## Configuration

type - `stdout`
layout - object (optional, defaults to coloredLayout) - see [layouts](/layouts/index.md)

## Example

```typescript
import {Logger} from "@tsed/logger";
import {StdoutAppender} from "@tsed/logger-std";

const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: StdoutAppender,
  levels: ["debug", "trace", "info"]
});
```
