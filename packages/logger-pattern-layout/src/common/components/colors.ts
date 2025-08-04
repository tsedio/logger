import {colorizeEnd, colorizeStart, LOG_COLORS, LogEvent} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";

// start
formatter("[", (loggingEvent: LogEvent): string => {
  const index: any = loggingEvent.level.toString();
  return colorizeStart(LOG_COLORS[index as keyof typeof LOG_COLORS]);
});

// end
formatter("]", (loggingEvent: LogEvent): string => {
  const index: any = loggingEvent.level.toString();
  return colorizeEnd(LOG_COLORS[index as keyof typeof LOG_COLORS]);
});
