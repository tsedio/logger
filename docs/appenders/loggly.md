# Loggly Appender

Sends logging events to [Loggly](https://www.loggly.com), optionally adding tags.
This appender uses [node-loggly-bulk](https://www.npmjs.com/package/node-loggly-bulk).
Consult the docs for node-loggly-bulk, or loggly itself, if you want more information on the configuration options below.

```bash
npm install --save @tsed/logger-loggly
```

## Configuration

* `type` - `loggly`
* `options.token` - `string` - your really long input token
* `options.subdomain` - `string` - your subdomain
* `options.auth` - `object` (optional) - authentication details
    * `username` - `string`
    * `password` - `string`
* `options.tags` - `Array<string>` (optional) - tags to include in every log message

See all available options for Loggly [here](https://www.npmjs.com/package/node-loggly-bulk).

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-loggly";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "loggly",
  level: ["info"],
  options: {
    token: 'somethinglong',
    subdomain: 'your.subdomain',
    tags: [ 'tag1' ]
  }
});

logger.info({ tags: ['my-tag-1', 'my-tag-2'] }, 'Some message');
```

This will result in a log message being sent to loggly with the tags `tag1`, `my-tag-1`, `my-tag-2`.
