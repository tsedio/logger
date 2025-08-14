import {$log, appender, BaseAppender, LogEvent} from "@tsed/logger";
// @ts-ignore
import LogEntries from "le_node";

export class LogEntriesAppender extends BaseAppender {
  private logger: any;

  build() {
    if ($log.level !== "OFF") {
      this.logger = new LogEntries(this.config.options);
    }
  }

  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off" && this.logger[level]) {
      this.logger[level](this.layout(loggingEvent, this.config.timezoneOffset));
    }
  }
}

appender("logentries", LogEntriesAppender);
