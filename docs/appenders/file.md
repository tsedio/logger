# File Appender

The file appender writes log events to a file. It supports an optional maximum file size, and will keep a configurable
number of backups.
When using the file appender, you should also call [logger.shutdown()](/introduction/getting-started.md) when your application terminates,
to ensure that any remaining asynchronous writes have finished.
Although the file appender uses the [streamroller](https://github.com/nomiddlename/streamroller) library, this is included as a dependency of ts-log-debug so you do not
need to include it yourself.

## Installation

```bash
npm install --save @tsed/logger-file
```

## Configuration

- **type** - `file`
- **filename - string** - the path of the file where you want your logs written.
- **maxLogSize - integer** (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
- **backups - integer** (optional, default value = 5) - the number of old log files to keep during log rolling.
- **layout** - (optional, defaults to basic layout) - see [layouts](/layouts/index.md)

Any other configuration parameters will be passed to the underlying [streamroller](https://github.com/nomiddlename/streamroller)
implementation (see also node.js core file streams):

- **encoding** - string (default “utf-8”)
- **mode** - integer (default 0644)
- **flags** - string (default ‘a’)
- **compress** - boolean (default false) - compress the backup files during rolling (backup files will have .gz extension)

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-file";

const logger = new Logger("loggerName");

logger.appenders.set("everything", {
  type: "file",
  filename: "all-the-logs.log"
});

logger.debug("I will be logged in all-the-logs.log");
```

This example will result in a single log file (all-the-logs.log) containing the log messages.

## Example with log rolling (and compressed backups)

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-file";

const logger = new Logger("loggerName");

logger.appenders.set("everything", {
  type: "file",
  filename: "all-the-logs.log",
  maxLogSize: 10485760,
  backups: 3,
  compress: true
});
```

This will result in one current log file (`all-the-logs.log`). When that reaches 10Mb in size, it will be renamed and
compressed to `all-the-logs.log.1.gz and a` new file opened called `all-the-logs.log`.
When `all-the-logs.log` reaches 10Mb again, then all-the-logs.log.1.gz will be renamed to
`all-the-logs.log.2.gz`, and so on.

## Example with date rolling

```typescript
import {Logger} from "@tsed/logger-file";
import "@tsed/logger-file";
export const logger = new Logger("Log Example");

logger.appenders.set("file", {
  type: "file",
  filename: `${__dirname}/../logs/myfile.log`,
  pattern: ".yyyy-MM-dd"
});
```
