import {AppendersRegistry} from "../../appenders/registries/AppendersRegistry";
import {BaseAppender} from "../../appenders/class/BaseAppender";
import {LogLevel} from "../../core/LogLevel";
import {IAppenderConfiguration} from "../../appenders/interfaces/AppenderConfiguration";

export interface ILoggerAppender {
  name: string;
  instance: any;
  config: IAppenderConfiguration;
}

export class LoggerAppenders {
  private _appenders: Map<string, ILoggerAppender> = new Map();
  private _lvls: Map<string, any> = new Map<string, any>();

  get size() {
    return this._appenders.size;
  }

  /**
   * The `has() method returns a boolean indicating whether an element with the specified configuration name exists or not.
   * @param name Required. The key of the element to test for presence in the Map object.`
   * @returns {boolean}
   */
  has(name: string): boolean {
    return this._appenders.has(name);
  }

  /**
   * The `get() method returns a specified element from a loggerAppenders.
   * @param name Required. The configuration of the element to return from the Map object.
   * @returns {ILoggerAppender}
   */
  get(name: string): ILoggerAppender {
    return this._appenders.get(name)!;
  }

  /**
   * The `set()` method adds or updates an element with a specified key and value to a loggerAppenders object.
   * @param name Required. The key of the element to add to the loggerAppenders object.
   * @param config Required. The config of the element to add to the loggerAppenders object.
   * @returns {LoggerAppender}
   */
  set(name: string, config: IAppenderConfiguration): LoggerAppenders {
    if (!AppendersRegistry.has(config.type)) {
      const error = new Error(`Appender ${config.type} doesn't exists. Check your configuration:\n${JSON.stringify(config)}\n`);
      error.name = "UNKNOW_APPENDER";
      throw error;
    }

    const klass = AppendersRegistry.get(config.type)!.provide;
    const instance: BaseAppender = new klass(config);

    this._appenders.set(name, {name, instance, config});
    this._lvls.clear();
    return this;
  }

  /**
   * Remove all configuration that match with the `name`.
   * @param name Required. The key of the element to remove from the loggerAppenders object.
   * @returns {boolean} Returns true if an element in the Map object existed and has been removed, or false if the element does not exist.
   */
  delete(name: string): boolean {
    let existed = this._appenders.delete(name);
    if (existed) {
      this._lvls.clear();
    }
    return existed;
  }

  /**
   * The `clear() method removes all elements from a loggerAppenders object.
   */
  clear(): void {
    this._appenders.clear();
    this._lvls.clear();
  }

  /**
   * The `forEach()` method executes a provided function once per each key/value pair in the loggerAppenders object, in insertion order.
   * @param callback Function to execute for each element.
   * @param thisArg Value to use as this when executing callback.
   */
  forEach(callback: (value: ILoggerAppender, key: string, map: Map<string, ILoggerAppender>) => void, thisArg?: any): void {
    this._appenders.forEach(callback, thisArg);
  }

  /**
   *
   * @returns {Array}
   */
  toArray() {
    const array: any[] = [];
    this._appenders.forEach(o => array.push(o));
    return array;
  }

  /**
   * Return all appenders that match with the given loggingLevel.
   * @param loggingLevel
   * @returns {[BaseAppender]}
   */
  byLogLevel(loggingLevel: LogLevel): BaseAppender[] {
    const level = loggingLevel.toString();
    if (this._lvls.has(level)) {
      return this._lvls.get(level);
    }

    const list = this.toArray()
      .filter(appender =>
        appender.config.levels ? appender.config.levels.find((level: string) => level.toUpperCase() === loggingLevel.toString()) : true
      )
      .map(appender => appender.instance);

    this._lvls.set(loggingLevel.toString(), list);

    return list;
  }
}
