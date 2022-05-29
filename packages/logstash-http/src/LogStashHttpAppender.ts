import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import * as util from "util";
import axios from "axios";

function wrapErrorsWithInspect(items: any[]) {
  return items.map((item) => {
    if (item instanceof Error && item.stack) {
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
  return logData ? util.format(...wrapErrorsWithInspect(logData)) : logData;
}

@Appender({name: "logstash-http"})
export class LogStashHttpAppender extends BaseAppender {
  private client: ReturnType<typeof axios.create>;

  #buffer: string[] = [];

  build() {
    if ($log.level !== "OFF") {
      this.client = axios.create({
        baseURL: this.config.options.url,
        auth: this.config.options.auth,
        timeout: this.config.options.timeout || 5000,
        params: this.config.options.params,
        headers: {
          ...(this.config.options.headers || {}),
          "Content-Type": "application/x-ndjson"
        },
        withCredentials: true
      });
    }
  }

  write(loggingEvent: LogEvent) {
    const {application, logType, logChannel} = this.config.options;
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const logstashEvent = [
        {
          index: {
            _index: typeof application === "function" ? application() : application,
            _type: logType
          }
        },
        {
          ...loggingEvent.getData(),
          message: format(loggingEvent.getMessage()),
          context: loggingEvent.context.toJSON(),
          level: loggingEvent.level.level / 100,
          level_name: level,
          channel: logChannel,
          datetime: new Date(loggingEvent.startTime).toISOString()
        }
      ];

      this.send(`${JSON.stringify(logstashEvent[0])}\n${JSON.stringify(logstashEvent[1])}`);
    }
  }

  send(bulk: string) {
    const {bufferMax = 0} = this.config.options;
    this.#buffer.push(bulk);

    if (bufferMax <= this.#buffer.length) {
      this.#buffer.push(bulk);
      return this.flush();
    }
  }

  flush() {
    // send to server
    const buffer = this.#buffer;
    this.#buffer = [];

    if (buffer.length) {
      const bulk = buffer.join("\n");
      const {url} = this.config.options;

      return this.client.post("", bulk + "\n").catch((error) => {
        if (error.response) {
          console.error(
            `Ts.ED Logger.logstash-http Appender error posting to ${url}: ${error.response.status} - ${JSON.stringify(error.response.data)}`
          );
          return;
        }
        console.error(`Ts.ED Logger.logstash-http Appender error: ${error.message}`);
      });
    }
  }

  shutdown() {
    return this.flush();
  }
}
