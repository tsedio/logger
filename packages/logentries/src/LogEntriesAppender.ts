import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
// @ts-ignore
import LogEntries from "le_node";

@Appender({name: "logentries"})
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
