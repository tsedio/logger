import {LogEvent} from "../../core/LogEvent";
import * as Os from "os";
import {LOG_COLORS} from "../constants/logColors";
import {colorizeEnd, colorizeStart} from "../utils/colorizeUtils";
import {IReplacers} from "../interfaces/Replacers";
import {TokensHandlers} from "../interfaces/BasicLayoutConfiguration";
import * as Util from "util";

/**
 *
 */
const dateFormat = require("date-format");
const eol = Os.EOL || "\n";

export class LayoutReplacer {
  constructor(private tokens: TokensHandlers, private timezoneOffset: number) {}

  /**
   *
   * @param loggingEvent
   * @param specifier
   * @returns {any}
   */
  public categoryName = (loggingEvent: LogEvent, specifier: string): string => {
    let loggerName = loggingEvent.categoryName;
    if (specifier) {
      const precision = parseInt(specifier, 10);
      const loggerNameBits = loggerName.split(".");
      if (precision < loggerNameBits.length) {
        loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
      }
    }
    return loggerName;
  };
  /**
   *
   * @param loggingEvent
   * @param specifier
   * @returns {any}
   */
  public formatAsDate = (loggingEvent: LogEvent, specifier: string): string => {
    let format = dateFormat.ISO8601_FORMAT;
    if (specifier) {
      format = specifier;
      // Pick up special cases
      if (format === "ISO8601") {
        format = dateFormat.ISO8601_FORMAT;
      } else if (format === "ISO8601_WITH_TZ_OFFSET") {
        format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
      } else if (format === "ABSOLUTE") {
        format = dateFormat.ABSOLUTETIME_FORMAT;
      } else if (format === "DATE") {
        format = dateFormat.DATETIME_FORMAT;
      }
    }
    // Format the date
    return dateFormat.asString(format, loggingEvent.startTime, this.timezoneOffset);
  };
  /**
   *
   * @returns {string}
   */
  public hostname = (): string => {
    return Os.hostname().toString();
  };
  /**
   *
   * @param loggingEvent
   * @returns {any}
   */
  public formatMessage = (loggingEvent: LogEvent): string => {
    return (Util.format as any)(...loggingEvent.data);
  };
  /**
   *
   * @returns {string|string}
   */
  public endOfLine = () => {
    return eol;
  };
  /**
   *
   * @param loggingEvent
   * @returns {string}
   */
  public logLevel = (loggingEvent: LogEvent): string => {
    return loggingEvent.level.toString();
  };
  /**
   *
   * @param loggingEvent
   * @returns {any}
   */
  public startTime = (loggingEvent: LogEvent): string => {
    return dateFormat.asString("hh:mm:ss", loggingEvent.startTime, this.timezoneOffset);
  };
  /**
   *
   * @param loggingEvent
   * @returns {string}
   */
  public startColour = (loggingEvent: LogEvent): string => {
    const index: any = loggingEvent.level.toString();
    return colorizeStart(LOG_COLORS[index as keyof typeof LOG_COLORS]);
  };
  /**
   *
   * @param loggingEvent
   * @returns {string}
   */
  public endColour = (loggingEvent: LogEvent): string => {
    const index: any = loggingEvent.level.toString();
    return colorizeEnd(LOG_COLORS[index as keyof typeof LOG_COLORS]);
  };
  /**
   *
   * @returns {string}
   */
  public percent = () => {
    return "%";
  };
  /**
   *
   * @param loggingEvent
   * @returns {string}
   */
  public pid = (loggingEvent?: LogEvent): string => {
    return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
  };
  /**
   *
   * @param loggingEvent
   * @param specifier
   * @returns {any}
   */
  public clusterInfo = (loggingEvent: LogEvent, specifier: string) => {
    if (loggingEvent.cluster && specifier) {
      return specifier
        .replace("%m", loggingEvent.cluster.master)
        .replace("%w", loggingEvent.cluster.worker)
        .replace("%i", loggingEvent.cluster.workerId);
    } else if (loggingEvent.cluster) {
      return `${loggingEvent.cluster.worker}@${loggingEvent.cluster.master}`;
    }

    return this.pid();
  };
  /**
   *
   * @param loggingEvent
   * @param specifier
   * @returns {any}
   */
  public userDefined = (loggingEvent: LogEvent, specifier: string) => {
    if (typeof this.tokens[specifier] !== "undefined") {
      return typeof this.tokens[specifier] === "function" ? this.tokens[specifier](loggingEvent) : this.tokens[specifier];
    }

    return null;
  };

  build(): IReplacers {
    return {
      c: this.categoryName,
      d: this.formatAsDate,
      h: this.hostname,
      m: this.formatMessage,
      n: this.endOfLine,
      p: this.logLevel,
      r: this.startTime,
      "[": this.startColour,
      "]": this.endColour,
      y: this.clusterInfo,
      z: this.pid,
      "%": this.percent,
      x: this.userDefined
    };
  }
}
