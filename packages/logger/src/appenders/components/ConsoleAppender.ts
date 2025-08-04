import {LogEvent} from "../../core/LogEvent.js";
import {BaseAppender} from "../class/BaseAppender.js";
import {appender} from "../fn/appender.js";

/**
 * ## Console Appender
 *
 * This appender uses node’s console object to write log events. It can also be used in the browser, if you’re using browserify or something similar. Be aware that writing a high volume of output to the console can make your application use a lot of memory. If you experience this problem, try switching to the stdout appender.
 *
 * ## Configuration
 *
 * * type - console
 * * layout - object (optional, defaults to colouredLayout) - see layouts
 *
 * Note that all log events are output using console.log regardless of the event’s level (so ERROR events will not be logged using console.error)
 *
 * ## Example
 *
 * ```typescript
 * import {Logger} from "@tsed/logger";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders.set("console", {
 *     type: "console",
 *     levels: ["debug", "info", "trace"]
 * });
 * ```
 *
 * @private
 */
export class ConsoleAppender extends BaseAppender {
  private log = console.log.bind(console);

  write(loggingEvent: LogEvent) {
    this.log(this.layout(loggingEvent, this.config.timezoneOffset));
  }
}

appender("console", ConsoleAppender);
