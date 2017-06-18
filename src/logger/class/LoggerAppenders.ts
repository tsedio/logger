/**
 * @module logger
 */
/** */
import {AppendersRegistry} from "../../appenders/registries/AppendersRegistry";
import {BaseAppender} from "../../appenders/class/BaseAppender";
import {LogLevel} from "../../core/LogLevel";
import {IAppenderConfiguration} from "../../appenders/interfaces/AppenderConfiguration";

export class LoggerAppenders {

    private _appenders: { instance: BaseAppender, config: IAppenderConfiguration }[] = [];

    /**
     *
     * @param config
     * @returns {LoggerAppenders}
     */
    push(config: IAppenderConfiguration) {

        if (!AppendersRegistry.has(config.type)) {
            const error = new Error(`Appender ${config.type} doesn't exists. Check your configuration:\n${JSON.stringify(config)}\n`);
            error.name = "UNKNOW_APPENDER";
            throw(error);
        }

        const klass = (AppendersRegistry.get(config.type).provide);
        const instance: BaseAppender = new klass(config);

        this._appenders.push({instance, config});
        return this;
    }

    remove(type: string) {

    }

    /**
     *
     * @param type
     * @returns {undefined|{instance: BaseAppender, config: IAppenderConfiguration}}
     */
    get(type: string): BaseAppender {
        return this._appenders.find((appender) => appender.config.type === type).instance;
    }

    /**
     *
     * @param loggingLevel
     * @returns {[BaseAppender,BaseAppender,BaseAppender,BaseAppender,BaseAppender]}
     */
    byLogLevel(loggingLevel: LogLevel): BaseAppender[] {
        return this._appenders
            .filter((appender) =>
                appender.config.levels
                    ?
                    appender.config.levels.find(
                        (level) => level.toUpperCase() === loggingLevel.toString()
                    )
                    :
                    true
            )
            .map(appender => appender.instance);
    }
}