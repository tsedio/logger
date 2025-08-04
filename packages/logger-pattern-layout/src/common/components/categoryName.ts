import {LogEvent} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";

formatter("c", (loggingEvent: LogEvent, specifier: string): string => {
  let loggerName = loggingEvent.categoryName;
  if (specifier) {
    const precision = parseInt(specifier, 10);
    const loggerNameBits = loggerName.split(".");
    if (precision < loggerNameBits.length) {
      loggerName = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
    }
  }
  return loggerName;
});
