import {LogLevel} from "./LogLevel";
import {LogContext} from "./LogContext";

export class LogEvent {
  /**
   * Models a logging event.
   * @constructor
   * @param categoryName
   * @param level
   * @param data
   * @param context
   */
  constructor(
    public readonly categoryName: string,
    public readonly level: LogLevel,
    public data: any[],
    public readonly context: LogContext
  ) {}

  private _startTime = new Date();

  get startTime(): Date {
    return this.data && this.data[0] && this.data[0].time ? this.data[0].time : this._startTime;
  }

  /**
   * @deprecated
   */
  public get formatedLevel(): string {
    return this.formattedLevel;
  }

  public get formattedLevel(): string {
    return (this.level.toString() + "     ").slice(0, 5);
  }

  public get cluster(): any {
    return {};
  }

  public get pid() {
    return this.context.get("pid");
  }

  public isMessage() {
    return this.data.length && typeof this.data[0] !== "object";
  }

  public getData() {
    return !this.isMessage() ? this.data[0] : {};
  }

  public getMessage() {
    return this.isMessage() ? this.data : undefined;
  }
}
