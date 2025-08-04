import {LogEvent} from "@tsed/logger";

import {formatter} from "../../common/index.js";

formatter("z", (loggingEvent?: LogEvent): string => {
  return loggingEvent && loggingEvent.pid ? loggingEvent.pid.toString() : process.pid.toString();
});
