import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import loggly from "node-loggly-bulk";
import * as os from "os";

function isAnyObject(value: any) {
  return value !== null && (typeof value === "object" || typeof value === "function");
}

function numKeys(obj: any) {
  return Object.keys(obj).length;
}

function processTags(msgListArgs: any[]) {
  const msgList = msgListArgs.length === 1 ? [msgListArgs[0]] : msgListArgs;

  return msgList.reduce(
    (accumulate, element) => {
      if (isAnyObject(element) && Array.isArray(element.tags) && numKeys(element) === 1) {
        accumulate.additionalTags = accumulate.additionalTags.concat(element.tags);
      } else {
        accumulate.deTaggedData.push(element);
      }
      return accumulate;
    },
    {deTaggedData: [], additionalTags: []}
  );
}

@Appender({name: "loggly"})
export class LogglyAppender extends BaseAppender {
  private logger: ReturnType<typeof loggly.createClient>;
  private openRequests = 0;
  private shutdownCB?: Function;

  build() {
    if ($log.level !== "OFF") {
      this.logger = loggly.createClient(this.config.options);
    }
  }

  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const result = processTags(loggingEvent.data);
      const deTaggedData = result.deTaggedData;
      const additionalTags = result.additionalTags;

      // Replace the data property with the deTaggedData
      loggingEvent.data = deTaggedData;

      const msg = this.layout(loggingEvent);

      this.openRequests += 1;

      this.logger.log(
        {
          msg: msg,
          level,
          category: loggingEvent.categoryName,
          hostname: os.hostname().toString()
        },
        additionalTags,
        (error) => {
          if (error) {
            console.error("TsLogger.logglyAppender - error occurred: ", error);
          }

          this.openRequests -= 1;

          if (this.shutdownCB && this.openRequests === 0) {
            this.shutdownCB();
            this.shutdownCB = undefined;
          }
        }
      );
    }
  }

  shutdown() {
    if (this.openRequests) {
      return new Promise((resolve) => {
        this.shutdownCB = resolve;
      });
    }
  }
}
