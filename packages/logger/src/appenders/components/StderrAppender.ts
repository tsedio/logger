/**
 * @module appenders
 */
/** */
import {LogEvent} from "../../core/LogEvent";
import {Appender} from "../decorators/appender";
import {BaseAppender} from "../class/BaseAppender";

/**
 * ## Standard Error Appender
 *
 * This appender writes all log events to the standard error stream.
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
 * logger.appenders.set("log-error", {
 *     type: "stderr",
 *     levels: ["error", "warn", "fatal"]
 * });
 * ```
 *
 * @private
 */
@Appender({name: "stderr"})
export class StderrAppender extends BaseAppender {
  private log = process.stderr.write.bind(process.stderr);

  write(loggingEvent: LogEvent) {
    this.log(`${this.layout(loggingEvent, this.config.timezoneOffset)}\n`);
  }
}
