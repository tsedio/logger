# LogStash UDP Appender

The logstash appenders for [Ts.ED Logger](https://logger.tsed.io).

The logstash-udp appender supports sending log events to a [Logstash](https://www.elastic.co/products/logstash) server.
It uses the node.js core UDP support, and so requires no extra dependencies.
Remember to call `logger.shutdown` in your application if you want the UDP socket closed cleanly.

```bash
npm install --save @tsed/logger-logstash-udp
```

## Configuration

* `type` - `logstash-udp`
* `options.host` - `string` - hostname (or IP-address) of the logstash server
* `options.port` - `integer` - port of the logstash server
* `options.layout` - (optional, defaults to dummyLayout) - used for the message field of the logstash data (see layouts)
* `options.extraDataProvider` - function (optional, defaults to put the second param of log to fields) - used to enhance the object sent to Logstash via UDP. this will be passed the log event and should return an object.

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logstash-udp";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "logstash-udp", 
  level: ["info"],
  options: {
    host: 'log.server',
    port: 12345
  }
});

logger.info("important log message", { cheese: 'gouda', biscuits: 'hobnob' });
```

This will result in a JSON message being sent to log.server:12345 over UDP, with the following format:

```javascript
{
  '@version': '1',
  '@timestamp': '2014-04-22T23:03:14.111Z',
  'host': 'yourHostname',
  'level': 'INFO',
  'category': 'default',
  'message': 'important log message',
  'fields': {
    'biscuits': 'hobnob',
    'cheese': 'gouda'
  }
}
```

### use extraDataProvider

```javascript
import {Logger} from "@tsed/logger";
import "@tsed/logger-logstash-udp";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "loggly",
  level: ["info"],
  options: {
    host: 'log.server',
    port: 12345,
    extraDataProvider: loggingEvent => ({
      host: 'anotherHostname',  // this will replace the default real host
      clientIp: '1.2.3.4', // this will be added
      fields: {
        tag: 'myTag', // this will be added to the fields
        pid: loggingEvent.pid, // this will be added to the fields
        cheese: 'defaultCheese' // this will be added to the fields but will not be replaced in this example
      }
    })
  }
});

logger.info("important log message", { cheese: 'gouda', biscuits: 'hobnob' });
```
This will result in a JSON message being sent to log.server:12345 over UDP, with the following format:

```javascript
{
  '@version': '1',
  '@timestamp': '2014-04-22T23:03:14.111Z',
  'host': 'anotherHostname',
  'level': 'INFO',
  'category': 'default',
  'message': 'important log message',
  'clientIp': '1.2.3.4',
  'fields': {
    'cheese': 'defaultCheese',
    'tag': 'myTag',
    'pid': 123
  }
}
```

So, if not using the default `extraDataProvider`, you have to put the second param of the log to the fields yourself if you want.
