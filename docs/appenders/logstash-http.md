# LogStash HTTP Appender

The logstash appenders for [Ts.ED Logger](https://logger.tsed.io) send NDJSON formatted log events to [logstash](https://www.elastic.co/products/logstash) receivers.
This appender uses HTTP to send the events (there is another logstash appender that uses [UDP](/appenders/logstash-udp.md)).

```bash
npm install --save @tsed/logger-logstash-http
```

## Configuration

* `type` - `logstash-http`
* `options.url` - `string` - logFaces receiver servlet URL
* `options.application` - `string` (optional) - used to identify your application's logs
* `options.logChannel` - `string` (optional) - also used to identify your application's logs [but in a more specific way]
* `options.logType` - `string` (optional) - used for the `type` field in the logstash data
* `options.timeout` - `integer` (optional, defaults to 5000ms) - the timeout for the HTTP request.
* `options.maxBuffer` - `integer` (optional, defaults to 0) - Group bulk request by the maxBuffer number. By Default the buffer is disabled.

This appender will also pick up Logger context values from the events, and add them as `p_` values in the logFaces event. See the example below for more details.

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logstash-http";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "logstash-http", 
  level: ["info"],
  options: {
    url: 'http://localhost:9200/_bulk', 
    application: 'logstash-tsed', 
    logType: 'application', 
    logChannel: 'node'
  }
});

logger.context.set('requestId', '123');
logger.info('some interesting log message');
logger.error('something has gone wrong');
```

Enable date log rolling:

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logstash-http";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "logstash-http", 
  level: ["info"],
  options: {
    url: 'http://localhost:9200/_bulk', 
    application: () => 'logstash-tsed-' + moment().format('YYYY.MM.DD'), 
    logType: 'application', 
    logChannel: 'node'
  }
});

logger.context.set('requestId', '123');
logger.info('some interesting log message');
logger.error('something has gone wrong');
```

This example will result in two log events being sent to your `localhost:9200`.
Both events will have a `context.requestId` property with a value of `123`.
