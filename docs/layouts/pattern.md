# Pattern layout

- type - pattern
- pattern - string - specifier for the output format, using placeholders as described below
- tokens - object (optional) - user-defined tokens to be used in the pattern

## Installation

:::code-group

```bash [npm]
npm install @tsed/logger-pattern-layout
```

```bash [yarn]
yarn add @tsed/logger-pattern-layout
```

```bash [pnpm]
pnpm add @tsed/logger-pattern-layout
```

```bash [bun]
bun add @tsed/logger-pattern-layout
```

:::

## Pattern format

The pattern string can contain any characters, but sequences beginning with `%` will be replaced with values taken from
the log event, and other environmental values.

Format for specifiers is `%[padding].[truncation][field]{[format]} -` padding and truncation are optional, and format only applies to a few tokens (notably, date). e.g. `%5.10p -`
left pad the log level by 5 characters, up to a max of 10.

Fields can be any of:

- `%r` time in toLocaleTimeString format,
- `%p` log level,
- `%c` log category,
- `%h` hostname,
- `%m` log data,
- `%j` log data as JSON,
- `%d` date, formatted - default is `ISO8601`, format options are: `ISO8601`, `ISO8601_WITH_TZ_OFFSET`, `ABSOLUTE`, `DATE`, or any string compatible with the date-format library. e.g. `%d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}`,
- `%% % -` for when you want a literal `%` in your output,
- `%n` newline,
- `%z` process id (from process.pid),
- `%x{[tokenname]}` add dynamic tokens to your log. Tokens are specified in the tokens parameter,
- `%X{[tokenname]}` add values from the Logger context. Tokens are keys into the context values,
- `%[` start a colored block (color will be taken from the log level, similar to coloredLayout),
- `%]` end a colored block.

## Tokens

User-defined tokens can be either a string or a function. Functions will be passed the log event, and should return a string. For example, you could define a custom token that outputs the log event's context value for `user` like so:

```typescript
import {Logger} from "@tsed/logger";
import {PatternLayout} from "@tsed/logger-pattern-layout";

const logger = new Logger("loggerName");

logger.appenders.set("std-log-custom", {
  type: "console",
  layout: {
    type: PatternLayout,
    pattern: "%d %p %c %x{user} %m%n",
    tokens: {
      user: (logEvent) => AuthLibrary.currentUser()
    }
  },
  level: ["debug", "info", "trace"]
});
logger.info("doing something.");
```

This would output:

```bash
2017-06-01 08:32:56.283 INFO default charlie doing something.
```

You can also use the Logger context to store tokens (sometimes called Nested Diagnostic Context, or Mapped Diagnostic Context) and use them in your layouts.

```typescript
import {Logger} from "@tsed/logger";
const logger = new Logger("loggerName");

logger.appenders.set("std-log", {
  type: "console",
  layout: {
    type: "pattern",
    pattern: "%d %p %c %X{user} %m%n"
  },
  level: ["debug", "info", "trace"]
});
logger.context.add("user", "charlie");
logger.info("doing something.");
```

This would output:

```bash
2017-06-01 08:32:56.283 INFO default charlie doing something.
```

::: tip
Note that you can also add functions to the Logger Context, and they will be passed the logEvent as well.
:::
