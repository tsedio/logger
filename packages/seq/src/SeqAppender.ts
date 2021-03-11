import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import seq, {SeqEvent, SeqLogLevel} from "seq-logging";

const LEVEL_NAMES: Record<string, SeqLogLevel> = {
  ALL: "Verbose",
  TRACE: "Verbose",
  DEBUG: "Debug",
  INFO: "Information",
  WARN: "Warning",
  ERROR: "Error",
  FATAL: "Fatal",
};

@Appender({name: "seq"})
export class SeqAppender extends BaseAppender {
  private logger: seq.Logger;

  build() {
    if ($log.level !== "OFF") {
      this.logger = new seq.Logger({
        onError(e) {
          console.error("[Seq] Log batch failed\n", e);
        },
        ...this.config.options,
      });
    }
  }

  write(loggingEvent: LogEvent) {
    const level = loggingEvent.level.toString().toLowerCase();

    if (level !== "off") {
      const [current, ...data] = loggingEvent.data;

      const additionalProps = [...loggingEvent.context.entries()].reduce((props, [key, value]) => {
        return {
          ...props,
          [key]: value,
        };
      }, {});

      const seqEntry: SeqEvent = {
        timestamp: loggingEvent.startTime,
        level: LEVEL_NAMES[loggingEvent.level.toString()] || "Information",
        properties: {
          ...(this.config.options.additionalProps || {}),
          ...additionalProps,
          data,
        },
      };

      if (typeof current === "string") {
        seqEntry.messageTemplate = current.replace(/\[1m|\[22m/g, "");
      } else {
        let {message, msg, err, error, stack, v, ...props} = data[0];

        // Get the properties from the error
        let {message: errMessage, stack: errStack, ...errorProps} = err || error || {};

        seqEntry.messageTemplate = msg || message || errMessage;
        seqEntry.properties = {
          ...seqEntry.properties,
          ...errorProps,
          ...props,
        };

        seqEntry.exception = stack ? stack : errStack;
      }

      try {
        this.logger.emit(seqEntry);
      } catch (err) {
        console.error(err, seqEntry);
      }
    }
  }

  shutdown() {
    return this.logger.close();
  }
}
