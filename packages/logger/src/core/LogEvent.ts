/**
 * @module core
 */
/** */
import {LogLevel} from "./LogLevel";

export class LogEvent {
  /**
   * Models a logging event.
   * @constructor
   * @param {String} _categoryName name of category
   * @param {LogLevel} _level level of message
   * @param {Array} _data objects to log
   * @param _context
   */
  constructor(private _categoryName: string, private _level: LogLevel, private _data: any[], private _context: any) {}

  private _startTime = new Date();

  get startTime(): Date {
    return this.data && this.data[0] && this.data[0].time ? this.data[0].time : this._startTime;
  }

  public get categoryName(): string {
    return this._categoryName;
  }

  public get level(): LogLevel {
    return this._level;
  }

  public get formatedLevel(): string {
    return (this.level.toString() + "     ").slice(0, 5);
  }

  public get data(): any[] {
    return this._data;
  }

  public get context(): Map<string, any> {
    return this._context;
  }

  public get cluster(): any {
    return {};
  }

  public get pid() {
    return this.context.get("pid");
  }
}
