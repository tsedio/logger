import {LogEvent} from "../../core/LogEvent";
import {Layouts} from "../../layouts/class/Layouts";
import {AppenderConfiguration, PartialAppenderConfiguration} from "../interfaces/AppenderConfiguration";

export interface IAppenderOptions {
  name: string;
  defaultLayout?: string;
}

export interface IBaseAppender {
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
 * @ Appender({name: "console2"})
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
 *
 */
export abstract class BaseAppender implements IBaseAppender {
  private _layout: any;
  private appenderOptions: IAppenderOptions = {name: ""};

  [key: string]: any;

  constructor(private _config: AppenderConfiguration) {
    this.configure(_config);

    if (this["build"]) {
      this["build"]();
    }
  }

  get config(): AppenderConfiguration {
    return this._config;
  }

  configure(config: PartialAppenderConfiguration) {
    Object.assign(this._config, config);

    this._layout = Layouts.get(this.appenderOptions.defaultLayout || "colored", this._config);

    if (this._config.layout) {
      this._layout = Layouts.get(this._config.layout.type, this._config.layout);
    }
    return this;
  }

  /**
   *
   * @param args
   */
  layout(...args: any[]): string {
    return this._layout.transform(...args);
  }

  abstract write(loggingEvent: LogEvent): any;
}
