import {$log, Appender, LogEvent, BaseAppender} from "@tsed/logger";
import Insight from "r7insight_node";

@Appender({name: "insight"})
export class InsightAppender extends BaseAppender {
  private logger: any;

  build() {
    if ($log.level !== "OFF") {
      this.logger = new Insight(this.config.options);
    }
  }

  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off" && this.logger[level]) {
      this.logger[level](this.layout(loggingEvent, this.config.timezoneOffset));
    }
  }
}
