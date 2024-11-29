import {LogEvent} from "../../common/core/LogEvent.js";
import {Appender} from "../../common/appenders/decorators/appender.js";
import {BaseAppender} from "../../common/appenders/class/BaseAppender.js";

/**
 * ## Standard Output Appender
 *
 * This appender writes all log events to the standard output stream.
 *
 * ## Configuration
 *
 * * type - stderr
 * * layout - object (optional, defaults to colouredLayout) - see layouts
 *
 * ## Example
 *
 * ```typescript
 * import {Logger} from "@tsed/logger";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders.set("log", {
 *     type: "stdout",
 *     levels: ["info", "trace", "debug"]
 * });
 * ```
 *
 * @private
 */
@Appender({name: "stdout"})
export class StdoutAppender extends BaseAppender {
  private log = process.stdout.write.bind(process.stdout);

  write(loggingEvent: LogEvent) {
    this.log(`${this.layout(loggingEvent, this.config.timezoneOffset)}\n`);
  }
}
