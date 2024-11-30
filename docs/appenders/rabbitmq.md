# RabbitMQ Appender

<Banner src="/rabbitmq.svg" height="100" href="https://www.rabbitmq.com/"></Banner>

Push log events to a [RabbitMQ](https://www.rabbitmq.com/).

```bash
npm install --save @tsed/logger-rabitmq
```

If you want to be sure that all messages have been sent before your programme exits, remember to call `logger.shutdown()`.

## Configuration

- `type` - `rabbitmq`
- `layout` - `object` (optional, defaults to `messagePassThroughLayout`) - the layout to use for log events (see [Layouts](/layouts/index.md)).
- `options.host` - `string` (optional, defaults to `127.0.0.1`) - the location of the rabbitmq server
- `options.port` - `integer` (optional, defaults to `5672`) - the port the rabbitmq server is listening on
- `options.username` - `string` (optional, defaults to `guest`) - username to use when authenticating connection to rabbitmq
- `options.password` - `string` (optional, defaults to `guest`) - password to use when authenticating connection to rabbitmq
- `options.routing_key` - `string` (optional, defaults to `logstash`) - rabbitmq message's routing_key
- `options.durable` - `string` (optional, defaults to false) - will that RabbitMQ lose our queue.
- `options.exchange` - `string` (optional, defaults to `log`)- rabbitmq send message's exchange
- `options.mq_type` - `string` (optional, defaults to `direct`) - rabbitmq message's mq_type
- `options.vhost` - `string` (optional, defaults to `/`) - vhost to use
- `options.shutdownTimeout` - `integer` (optional, defaults to `10000`) - maximum time in milliseconds to wait for messages to be sent during log4js shutdown.

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-rabbitmq";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "rabbitmq",
  level: ["info"],
  options: {
    host: "127.0.0.1",
    port: 5672,
    username: "guest",
    password: "guest",
    routing_key: "logstash",
    exchange: "exchange_logs",
    mq_type: "direct",
    durable: true
  }
});
```

This configuration will push log messages to the rabbitmq on `127.0.0.1:5672`.
