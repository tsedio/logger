import {Appender, BaseAppender, LogEvent} from "@tsed/logger";

import {WebClient} from "@slack/web-api";

@Appender({name: "slack"})
export class SlackAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
    const {token, channel_id, icon_url, username} = this.config.options;
    const level = loggingEvent.level.toString().toLowerCase();
    const web = new WebClient(token);

    if (level !== "off") {
      const data = {
        token,
        channel: channel_id,
        text: this.layout(loggingEvent, this.config.timezoneOffset),
        icon_url,
        username
      };

      (async () => {
        try { await web.chat.postMessage(data); }
        catch (err) {
          console.error("Ts.ED Logger:slack - Error sending log to slack: ", err);
        }
      }
      )();
    }
  }
}
