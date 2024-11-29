import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import * as util from "util";
import * as dgram from "dgram";
import * as os from "os";

const defaultVersion = 1;

function isObject(o: any) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

function isPlainObject(o: any) {
  let ctor: any, prot: any;

  if (!isObject(o)) {
    return false;
  }

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) {
    return true;
  }

  // If has modified prototype
  prot = ctor.prototype;
  if (!isObject(prot) || !prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

const defaultExtraDataProvider = (loggingEvent: LogEvent) => {
  if (loggingEvent.data.length > 1) {
    const secondEvData = loggingEvent.data[1];
    if (isPlainObject(secondEvData)) {
      return {fields: secondEvData};
    }
  }
  return {};
};

@Appender({name: "logstash-http"})
export class LogStashUdpAppender extends BaseAppender {
  private udp: ReturnType<typeof dgram.createSocket>;
  private extraDataProvider: Function;

  build() {
    if ($log.level !== "OFF") {
      this.udp = dgram.createSocket("udp4");
      this.extraDataProvider =
        typeof this.config.options.extraDataProvider === "function" ? this.config.options.extraDataProvider : defaultExtraDataProvider;
    }
  }

  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const isMessage = loggingEvent.data.length && typeof loggingEvent.data[0] !== "object";
      const oriLogObject = {
        ...(!isMessage ? loggingEvent.data[0] : {}),
        "@version": defaultVersion,
        "@timestamp": new Date(loggingEvent.startTime).toISOString(),
        host: os.hostname(),
        level: loggingEvent.level.levelStr.toUpperCase(),
        category: loggingEvent.categoryName,
        message: isMessage ? this.layout(loggingEvent) : undefined
      };
      const extraLogObject = this.extraDataProvider(loggingEvent) || {};
      const logObject = {...oriLogObject, ...extraLogObject};

      this.sendLog(logObject);
    }
  }

  shutdown(): any {
    return new Promise((resolve) => {
      this.udp.close(() => resolve(undefined));
    });
  }

  protected sendLog(logObject: any) {
    const {host, port} = this.config.options;
    let buffer;
    try {
      buffer = Buffer.from(JSON.stringify(logObject));
    } catch (e) {
      logObject.message.data = [`Event could not be serialised to JSON: ${e.message}`];
      buffer = Buffer.from(JSON.stringify(logObject));
    }

    this.udp.send(buffer as never, 0, buffer.length, port, host, (err: Error) => {
      if (err) {
        console.error(`Ts.ED Logger.logstash-udp - ${host}:${port} Error: ${util.inspect(err)}.`);
      }
    });
  }
}
