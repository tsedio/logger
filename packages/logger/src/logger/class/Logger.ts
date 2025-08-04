import {BaseAppender} from "../../appenders/class/BaseAppender.js";
import {LogContext} from "../../core/LogContext.js";
import {LogEvent} from "../../core/LogEvent.js";
import {levels, LogLevel} from "../../core/LogLevel.js";
import {drawTable, ITableSettings} from "../utils/tableUtils.js";
import {LoggerAppenders} from "./LoggerAppenders.js";

export class Logger {
  /**
   *
   */
  constructor(private _name: string = "default") {
    this.level = "all";
  }

  private _appenders: LoggerAppenders = new LoggerAppenders();

  get appenders(): LoggerAppenders {
    return this._appenders;
  }

  private _level: LogLevel;

  get level(): string {
    return this._level.toString();
  }

  set level(level: string) {
    this._level = LogLevel.getLevel(level, "debug");
  }

  /**
   *
   */
  private _context: LogContext = new LogContext();

  get context(): LogContext {
    return this._context;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  /**
   * Create stack trace  the lines of least Logger.
   * @returns {string}
   */
  public static createStack(): string {
    const stack: string = new Error().stack!.replace("Error\n", "");

    return stack
      .split("\n")
      .filter((line, index) => index >= 2)
      .join("\n");
  }

  public isLevelEnabled(otherLevel: string | LogLevel) {
    return this._level.isLessThanOrEqualTo(otherLevel);
  }

  /**
   * Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to util.format()).
   * @param data
   * @returns {any}
   */
  public debug(...data: any[]): Logger {
    return this.write(levels().DEBUG, data);
  }

  /**
   *
   * @param data
   * @returns {any}
   */
  public info(...data: any[]): Logger {
    return this.write(levels().INFO, data);
  }

  /**
   *
   * @param data
   * @returns {any}
   */
  public warn(...data: any[]): Logger {
    return this.write(levels().WARN, data);
  }

  /**
   * Prints to stderr with newline. Multiple arguments can be passed, with the first used as the primary
   * message and all additional used as substitution values similar to printf() (the arguments are all
   * passed to util.format()).
   * @param data
   * @returns {any}
   */
  public error(...data: any[]): Logger {
    return this.write(levels().ERROR, data);
  }

  public fatal(...data: any[]): Logger {
    return this.write(levels().FATAL, data);
  }

  /**
   *
   * @param data
   * @returns {Logger}
   */
  public trace(...data: any[]): Logger {
    const stack = "\n" + Logger.createStack() + "\n";
    data.push(stack);
    return this.write(levels().TRACE, data);
  }

  /**
   *
   */
  public start(): Logger {
    this.level = "ALL";
    return this;
  }

  /**
   *
   */
  public stop(): Logger {
    this.level = "OFF";
    return this;
  }

  /**
   *
   * @returns {Promise<any[]>}
   */
  public shutdown() {
    this.stop();

    const promises = this.appenders
      .toArray()
      .filter((appender) => !!appender.instance.shutdown)
      .map((appender) => appender.instance.shutdown());

    return Promise.all(promises);
  }

  /**
   *
   * @param list
   * @param settings
   */
  public drawTable(list: any[], settings: ITableSettings = {}): string {
    return drawTable(list, settings);
  }

  /**
   *
   * @param list
   * @param settings
   * @returns {Logger}
   */
  public printTable(list: any[], settings: ITableSettings = {}) {
    this.info(`\n${this.drawTable(list, settings)}`);
    return this;
  }

  /**
   *
   * @returns {Logger}
   */
  private write(logLevel: LogLevel, data: any[]): Logger {
    if (!this.isLevelEnabled(logLevel)) return this;

    const logEvent = new LogEvent(this._name, logLevel, data, this._context);

    this.appenders.byLogLevel(logLevel).forEach((appender: BaseAppender) => {
      appender.write(logEvent);
    });

    return this;
  }
}
