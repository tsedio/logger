import {$log, Appender, LogEvent, BaseAppender} from "@tsed/logger";
import {createLogger} from "bunyan";
import {createStream} from "bunyan-seq";

@Appender({name: "seq"})
export class SeqAppender extends BaseAppender {
  private logger: any;

  build() {
    if ($log.level !== "OFF") {
      this.logger = createLogger({
        name: $log.name,
        streams: [
          createStream({
            ...this.config.options,
            level: $log.level,
          }),
        ],
      });
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
