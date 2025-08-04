import {WebClient} from "@slack/web-api";
import {appender, BaseAppender, LogEvent} from "@tsed/logger";

export class SlackAppender extends BaseAppender {
  async write(loggingEvent: LogEvent) {
    try {
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
        await web.chat.postMessage(data);
      }
    } catch (err) {
      console.error("Ts.ED Logger:slack - Error sending log to slack: ", err);
    }
  }
}

appender("slack", SlackAppender);
