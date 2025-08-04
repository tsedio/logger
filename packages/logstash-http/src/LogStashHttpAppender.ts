import {$log, Appender, appender, BaseAppender, LogEvent} from "@tsed/logger";
import axios, {AxiosBasicCredentials} from "axios";
import axiosRetry, {IAxiosRetryConfig} from "axios-retry";
import * as util from "util";
import {v4} from "uuid";

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
  requireAlias?: boolean;
  logType: string;
  logChannel: string;
  auth?: AxiosBasicCredentials;
  timeout?: number;
  delayToFlush?: number;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  retryOptions?: IAxiosRetryConfig;
  debug?: boolean;
  httpsAgent?: any;
}

export class LogStashHttpAppender extends BaseAppender<LogStashHttpOptions> {
  private client: ReturnType<typeof axios.create>;

  #buffer: Record<string, any>[] = [];
  #timer: NodeJS.Timeout;

  build() {
    if ($log.level !== "OFF" && this.config.options) {
      this.client = axios.create({
        baseURL: this.config.options.url,
        auth: this.config.options.auth,
        timeout: this.config.options.timeout || 5000,
        params: this.config.options.params,
        headers: {
          ...(this.config.options.headers || {})
        },
        httpsAgent: this.config.options.httpsAgent
      });

      axiosRetry(this.client, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        ...this.config.options.retryOptions
      });
    }

    if (this.config.options.delayToFlush) {
      this.#timer = setInterval(() => this.flush(), this.config.options.delayToFlush);
    }
  }

  write(loggingEvent: LogEvent) {
    const {logChannel} = this.config.options;
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const {time, ...props} = loggingEvent.getData();

      this.send({
        ...props,
        message: format(loggingEvent.getMessage()),
        context: loggingEvent.context.toJSON(),
        level: loggingEvent.level.level / 100,
        level_name: level,
        channel: logChannel,
        datetime: new Date(time || loggingEvent.startTime).toISOString()
      });
    }
  }

  send(bulk: Record<string, any>) {
    const {bufferMax = 0, delayToFlush = 0} = this.config.options;
    this.#buffer.push(bulk);

    if ((!bufferMax && !delayToFlush) || (bufferMax && bufferMax <= this.#buffer.length)) {
      return this.flush();
    }
  }

  async flush() {
    // send to server
    const buffer = this.#buffer;
    this.#buffer = [];
    if (!buffer.length) {
      return this;
    }

    const {url, application, logType, requireAlias, debug} = this.config.options;
    const _index = typeof application === "function" ? application() : application;

    const bulkData = buffer.flatMap((item) => [
      JSON.stringify({
        index: {
          _index,
          _type: logType,
          require_alias: requireAlias,
          _id: v4()
        }
      }),
      item
    ]);

    try {
      const result = await this.client({
        url: "",
        method: "POST",
        data: this.serializeBulk(bulkData),
        headers: {
          "Content-Type": "application/x-ndjson"
        }
      });

      if (debug) {
        console.debug(`Ts.ED Logger.logstash-http Appender ${url}: ${result.status} - ${JSON.stringify(result.data)}`);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          `Ts.ED Logger.logstash-http Appender error posting to ${url}: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        );
        return;
      }
      console.error(`Ts.ED Logger.logstash-http Appender error: ${error.message}`);
    }
  }

  serializeBulk(array: Array<Record<string, any> | string>): string {
    return array.reduce<string>((ndjson, obj) => {
      const str = typeof obj === "string" ? obj : JSON.stringify(obj);

      return ndjson + str + "\n";
    }, "");
  }

  shutdown() {
    this.#timer && clearInterval(this.#timer);
    return this.flush();
  }
}

appender("logstash-http", LogStashHttpAppender);
