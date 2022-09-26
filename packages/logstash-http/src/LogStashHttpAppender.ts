import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import * as util from "util";
import axios, {AxiosBasicCredentials} from "axios";
import axiosRetry, {IAxiosRetryConfig} from "axios-retry";

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

export class LogStashHttpOptions {
  url: string;
  bufferMax: number;
  application: Function | string;
  logType: string;
  logChannel: string;
  auth?: AxiosBasicCredentials;
  timeout?: number;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  retryOptions?: IAxiosRetryConfig;
}

@Appender({name: "logstash-http"})
export class LogStashHttpAppender extends BaseAppender<LogStashHttpOptions> {
  private client: ReturnType<typeof axios.create>;

  #buffer: Record<string, any>[] = [];

  build() {
    if ($log.level !== "OFF" && this.config.options) {
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

      axiosRetry(this.client, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        ...this.config.options.retryOptions
      });
    }
  }

  write(loggingEvent: LogEvent) {
    const {logChannel} = this.config.options;
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const logstashEvent = [
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

      this.send(logstashEvent);
    }
  }

  send(bulk: Record<string, any>) {
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
      const {url} = this.config.options;
      const {application, logType} = this.config.options;

      const header = JSON.stringify({
        index: {
          _index: typeof application === "function" ? application() : application,
          _type: logType
        }
      });

      const bulkData =
        buffer
          .flatMap((obj) => {
            return [header, JSON.stringify(obj)];
          }, [])
          .join("\n") + "\n";

      return this.client.post("", bulkData).catch((error) => {
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
