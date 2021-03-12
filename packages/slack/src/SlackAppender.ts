import {Appender, BaseAppender, LogEvent} from "@tsed/logger";

const slack = require("slack");

@Appender({name: "slack"})
export class SlackAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
    const {token, channel_id, icon_url, username} = this.config.options;
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const data = {
        token,
        channel: channel_id,
        text: this.layout(loggingEvent, this.config.timezoneOffset),
        icon_url,
        username
      };

      slack.chat.postMessage(data, (err: Error) => {
        if (err) {
          console.error("Ts.ED Logger:slack - Error sending log to slack: ", err);
        }
      });
    }
  }
}
