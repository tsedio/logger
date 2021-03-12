import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import * as util from "util";
import * as dgram from "dgram";
import * as os from "os";

const _ = require("lodash");

const defaultVersion = 1;

const defaultExtraDataProvider = (loggingEvent: LogEvent) => {
  if (loggingEvent.data.length > 1) {
    const secondEvData = loggingEvent.data[1];
    if (_.isPlainObject(secondEvData)) {
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
      this.extraDataProvider = _.isFunction(this.config.options.extraDataProvider)
        ? this.config.options.extraDataProvider
        : defaultExtraDataProvider;
    }
  }

  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const oriLogObject = {
        "@version": defaultVersion,
        "@timestamp": (new Date(loggingEvent.startTime)).toISOString(),
        "host": os.hostname(),
        "level": loggingEvent.level.levelStr.toUpperCase(),
        "category": loggingEvent.categoryName,
        "message": this.layout(loggingEvent)
      };
      const extraLogObject = this.extraDataProvider(loggingEvent) || {};
      const logObject = _.assign(oriLogObject, extraLogObject);

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

    this.udp.send(buffer, 0, buffer.length, port, host, (err: Error) => {
      if (err) {
        console.error(`Ts.ED Logger.logstash-udp - ${host}:${port} Error: ${util.inspect(err)}.`);
      }
    });
  }
}
