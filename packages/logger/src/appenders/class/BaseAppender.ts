import {LogEvent} from "../../core/LogEvent.js";
import {Layouts} from "../../layouts/class/Layouts.js";
import type {AppenderConfiguration, PartialAppenderConfiguration} from "../interfaces/AppenderConfiguration.js";

export interface AppenderOptions {
  name: string;
  defaultLayout?: string;
}

export interface BaseAppenderMethods {
  write(loggingEvent: LogEvent): any;

  build?(): any;

  reopen?(): any;

  shutdown?(): Promise<any> | any | void;
}

/**
 * ## BaseAppender
 *
 * `@tsed/logger` can load appenders from outside the core appenders. The type config value is used as a require path if no matching appender can be found. For example, the following configuration will create an appender with decorators:
 *
 * ```typescript
 * // consoleAppender.ts
 * import {Appender, BaseAppender, LogEvent} from "@tsed/logger";
 * const consoleLog = console.log.bind(console);
 *
 * @Appender({name: "console2"})
 * export class ConsoleAppender extends BaseAppender {
 *   write(loggingEvent: LogEvent) {
 *       consoleLog(this.layout(loggingEvent, this.config.timezoneOffset));
 *   }
 * }
 * ```
 *
 * This appender can be use like this:
 *
 * ```typescript
 * import {Logger} from "@tsed/logger";
 * import "./consoleAppender.ts"
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .set("console-log", {
 *       type: "console2", level: ["debug", "info", "trace"]
 *   });
 * ```
 *
 */
export abstract class BaseAppender<Opts = any> implements BaseAppenderMethods {
  #layout: any;

  [key: string]: any;

  constructor(public readonly config: AppenderConfiguration<Opts>) {
    this.configure(config);
  }

  get appenderOptions(): AppenderOptions {
    return this.__proto__.constructor.$appenderOptions;
  }

  configure(config: PartialAppenderConfiguration) {
    Object.assign(this.config, config);

    this.#layout = Layouts.get(this.appenderOptions?.defaultLayout || "colored", this.config);

    if (this.config.layout) {
      this.#layout = this.config.layout.type
        ? Layouts.get(this.config.layout.type, this.config.layout)
        : Layouts.get(this.config.layout, {type: this.config.layout.$name});
    }

    return this;
  }

  /**
   *
   * @param args
   */
  layout(...args: any[]): string {
    return this.#layout.transform(...args);
  }

  abstract write(loggingEvent: LogEvent): any;
}
