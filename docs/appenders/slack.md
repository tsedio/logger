# Slack Appender

<Banner src="/slack.svg" height="100" href="https://slack.com/"></Banner>

Sends log events to a [slack](https://slack.com) channel.

```bash
npm install --save @tsed/logger-slack
```

## Configuration

- `type` - `slack`
- `options.token` - `string` - your Slack API token (see the (slack web api docs)[https://slack.dev/node-slack-sdk/web-api])
- `options.channel_id` - `string` - the channel to send log messages
- `options.icon_url` - `string` (optional) - the icon to use for the message
- `options.username` - `string` - the username to display with the message

## Example

```typescript
import {Logger} from "@tsed/logger";
import "@tsed/logger-slack";

const logger = new Logger("loggerName");

logger.appenders.set("stdout", {
  type: "slack",
  level: ["error"],
  options: {
    token: "xoxb-xxxx-xxxx-xxxx",
    channel_id: "prod-alerts",
    username: "our_application"
  }
});
```
