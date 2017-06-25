/**
 * @module appenders
 */
/** */
import {LogEvent} from "../../core/LogEvent";
import {Layouts} from "../../layouts/class/Layouts";
import {IAppenderConfiguration, PartialAppenderConfiguration} from "../interfaces/AppenderConfiguration";

export interface IAppenderOptions {
    name: string;
    defaultLayout?: string;
}

export interface IBaseAppender {
    write(loggingEvent: LogEvent);
    build?();
    reopen?();
    shutdown?(complete);
}

/**
 * ## BaseAppender
 *
 * ts-log-debug can load appenders from outside the core appenders. The type config value is used as a require path if no matching appender can be found. For example, the following configuration will create an appender with decorators:
 *
 * ```typescript
 * // consoleAppender.ts
 * import {Appender, BaseAppender, LogEvent} from "ts-log-debug";
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
 * import {Logger} from "ts-log-debug";
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
    private _layout;
    private appenderOptions: IAppenderOptions = {name: ""};

    constructor(private _config: IAppenderConfiguration) {

        this.configure(_config);

        if (this["build"]) {
            this["build"]();
        }
    }

    configure(config: PartialAppenderConfiguration) {
        Object.assign(this._config, config);

        this._layout = Layouts.get(this.appenderOptions.defaultLayout || "colored", this._config);

        if (this._config.layout) {
            this._layout = Layouts.get(this._config.layout.type, this._config.layout);
        }
        return this;
    }

    get config(): IAppenderConfiguration {
        return this._config;
    }

    /**
     *
     * @param args
     */
    layout(...args): string {
        return this._layout.transform(...args);
    }

    abstract write(loggingEvent: LogEvent);
}