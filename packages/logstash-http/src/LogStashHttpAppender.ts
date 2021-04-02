import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import * as util from "util";
import axios from "axios";

function wrapErrorsWithInspect(items: any[]) {
  return items.map((item) => {
    if ((item instanceof Error) && item.stack) {
      return {
        inspect: function () {
          return `${util.format(item)}\n${item.stack}`;
        }
      };
    }

    return item;
  });
}

function format(logData: any) {
  return util.format.apply(util, wrapErrorsWithInspect(logData));
}

@Appender({name: "logstash-http"})
export class LogStashHttpAppender extends BaseAppender {
  private client: ReturnType<typeof axios.create>;

  build() {
    if ($log.level !== "OFF") {
      this.client = axios.create({
        baseURL: this.config.options.url,
        auth: this.config.options.auth,
        timeout: this.config.options.timeout || 5000,
        params: this.config.params,
        headers: {
          ...this.config.options.headers || {},
          "Content-Type": "application/x-ndjson"
        },
        withCredentials: true,
      });
    }
  }

  write(loggingEvent: LogEvent) {
    const {url, application, logType, logChannel} = this.config.options;
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const logstashEvent = [
        {
          index: {
            _index: typeof application === "function" ? application() : application,
            _type: logType,
          },
        },
        {
          message: format(loggingEvent.data),
          context: loggingEvent.context.toJSON(),
          level: loggingEvent.level.level / 100,
          level_name: level,
          channel: logChannel,
          datetime: (new Date(loggingEvent.startTime)).toISOString(),
          extra: {},
        },
      ];

      const logstashJSON = `${JSON.stringify(logstashEvent[0])}\n${JSON.stringify(logstashEvent[1])}\n`;

      // send to server
      this.client.post("", logstashJSON)
        .catch((error) => {
          if (error.response) {
            console.error(`Ts.ED Logger.logstash-http Appender error posting to ${url}: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            return;
          }
          console.error(`Ts.ED Logger.logstash-http Appender error: ${error.message}`);
        });
    }
  }
}
