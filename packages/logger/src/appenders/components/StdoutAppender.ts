/**
 * @module appenders
 */
/** */
import {LogEvent} from "../../core/LogEvent";
import {Appender} from "../decorators/appender";
import {BaseAppender} from "../class/BaseAppender";

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
 * import {Logger} from "ts-log-debug";
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
