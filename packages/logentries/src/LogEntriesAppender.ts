import {$log, Appender, LogEvent, BaseAppender} from "@tsed/logger";
const LogEntries = require("le_node");

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

    if (level !== "OFF" && this.logger[level]) {
      const data = loggingEvent.data;
      if (typeof data[0] === "string") {
        data[0] = data[0].replace(/\[1m|\[22m/g, "");
      }
      this.logger[level](...data);
    }
  }
}
