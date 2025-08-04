import {BaseAppender} from "../../appenders/class/BaseAppender.js";
import {AppenderConfiguration} from "../../appenders/interfaces/AppenderConfiguration.js";
import {AppendersRegistry} from "../../appenders/registries/AppendersRegistry.js";
import {LogLevel} from "../../core/LogLevel.js";

export interface LoggerAppender {
  name: string;
  instance: any;
  config: AppenderConfiguration;
}

export class LoggerAppenders {
  private _appenders: Map<string, LoggerAppender> = new Map();
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
   * @returns {LoggerAppender}
   */
  get(name: string): LoggerAppender {
    return this._appenders.get(name)!;
  }

  /**
   * The `set()` method adds or updates an element with a specified key and value to a loggerAppenders object.
   * @param name Required. The key of the element to add to the loggerAppenders object.
   * @param config Required. The config of the element to add to the loggerAppenders object.
   * @returns {LoggerAppender}
   */
  set(name: string, config: Omit<AppenderConfiguration, "options"> & {type: string | any; options?: any}): LoggerAppenders {
    const type = typeof config.type === "string" ? config.type : (config.type as any)?.$name;
    const opts = {
      level: ["debug", "info", "trace", "error", "warn", "fatal"],
      ...config,
      type,
      options: config.options || {}
    };

    if (!AppendersRegistry.has(opts.type)) {
      const error = new Error(`Appender ${opts.type} doesn't exists. Check your configuration:\n${JSON.stringify(opts)}\n`);
      error.name = "UNKNOW_APPENDER";
      throw error;
    }

    const klass = AppendersRegistry.get(opts.type)!.provide;
    const instance: BaseAppender = new klass(opts);

    if ("build" in instance) {
      instance.build();
    }

    this._appenders.set(name, {name, instance, config: opts});
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
  forEach(callback: (value: LoggerAppender, key: string, map: Map<string, LoggerAppender>) => void, thisArg?: any): void {
    this._appenders.forEach(callback, thisArg);
  }

  /**
   *
   * @returns {Array}
   */
  toArray() {
    const array: any[] = [];
    this._appenders.forEach((o) => array.push(o));
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
      .filter((appender) =>
        appender.config.levels ? appender.config.levels.find((level: string) => level.toUpperCase() === loggingLevel.toString()) : true
      )
      .map((appender) => appender.instance);

    this._lvls.set(loggingLevel.toString(), list);

    return list;
  }
}
