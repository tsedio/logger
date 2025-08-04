import {LogEvent} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";

const logLevel = (loggingEvent: LogEvent): string => {
  return loggingEvent.level.toString();
};

formatter("p", logLevel);
