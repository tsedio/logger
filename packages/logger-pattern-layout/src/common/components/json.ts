import {LogEvent} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";

formatter("j", (loggingEvent: LogEvent): string => {
  return JSON.stringify(loggingEvent.data);
});
