import {Appender, BaseAppender, LogEvent} from "@tsed/logger";

export interface ConnectLogger {
  debug?(log: any): any;

  info?(log: any): any;

  warn?(log: any): any;

  error?(log: any): any;

  fatal?(log: any): any;

  trace?(log: any): any;
}

export interface ConnectAppenderOpts {
  logger: ConnectLogger;
}

@Appender({name: "connect", defaultLayout: "object"})
export class ConnectAppender extends BaseAppender<ConnectAppenderOpts> {
  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();
    const {logger} = this.config.options;

    if ((logger as any)[level]) {
      (logger as any)[level](this.layout(loggingEvent, this.config.timezoneOffset));
    }
  }
}
