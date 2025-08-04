import {LogEvent} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";

export const pid = (loggingEvent?: LogEvent): string => {
  return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : "";
};

formatter("z", pid);
