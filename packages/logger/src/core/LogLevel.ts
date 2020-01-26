/**
 * @module core
 */
/** */

export class LogLevel {
  constructor(private level: number, private levelStr: string) {
    this.level = level;
    this.levelStr = levelStr;
  }

  static getLevel(sArg: any | string | LogLevel, defaultLevel?: string | LogLevel): LogLevel {
    if (sArg instanceof LogLevel) {
      return sArg;
    }

    if (typeof sArg === "string") {
      const index: any = sArg.toUpperCase();
      return (DEFAULT_LOG_LEVELS as any)[index] || defaultLevel;
    }

    return this.getLevel(sArg.toString());
  }

  toString() {
    return this.levelStr;
  }

  isLessThanOrEqualTo(otherLevel: LogLevel | string) {
    if (typeof otherLevel === "string") {
      otherLevel = LogLevel.getLevel(otherLevel);
    }
    return this.level <= (otherLevel as LogLevel).level;
  }

  isGreaterThanOrEqualTo(otherLevel: LogLevel | string) {
    if (typeof otherLevel === "string") {
      otherLevel = LogLevel.getLevel(otherLevel);
    }
    return this.level >= (otherLevel as LogLevel).level;
  }

  isEqualTo(otherLevel: LogLevel | string) {
    if (typeof otherLevel === "string") {
      otherLevel = LogLevel.getLevel(otherLevel);
    }
    return this.level === (otherLevel as LogLevel).level;
  }
}

const DEFAULT_LOG_LEVELS = {
  ALL: new LogLevel(Number.MIN_VALUE, "ALL"),
  TRACE: new LogLevel(5000, "TRACE"),
  DEBUG: new LogLevel(10000, "DEBUG"),
  INFO: new LogLevel(20000, "INFO"),
  WARN: new LogLevel(30000, "WARN"),
  ERROR: new LogLevel(40000, "ERROR"),
  FATAL: new LogLevel(50000, "FATAL"),
  MARK: new LogLevel(9007199254740992, "MARK"), // 2^53
  OFF: new LogLevel(Number.MAX_VALUE, "OFF")
};

export function levels() {
  return DEFAULT_LOG_LEVELS;
}
