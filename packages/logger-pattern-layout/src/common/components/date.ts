import {
  ABSOLUTETIME_FORMAT,
  dateFormat as serialize,
  DATETIME_FORMAT,
  ISO8601_FORMAT,
  ISO8601_WITH_TZ_OFFSET_FORMAT,
  LogEvent
} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";
import type {FormatterOptions} from "../types/FormatterOptions.js";

formatter("d", (loggingEvent: LogEvent, specifier: string, {timezoneOffset}: FormatterOptions): string => {
  let format = ISO8601_FORMAT;

  if (specifier) {
    format = specifier;
    // Pick up special cases
    if (format === "ISO8601") {
      format = ISO8601_FORMAT;
    } else if (format === "ISO8601_WITH_TZ_OFFSET") {
      format = ISO8601_WITH_TZ_OFFSET_FORMAT;
    } else if (format === "ABSOLUTE") {
      format = ABSOLUTETIME_FORMAT;
    } else if (format === "DATE") {
      format = DATETIME_FORMAT;
    }
  }
  // Format the date
  return serialize(format, loggingEvent.startTime, timezoneOffset);
});

formatter("r", (loggingEvent: LogEvent, _, {timezoneOffset}): string => {
  return serialize("hh:mm:ss", loggingEvent.startTime, timezoneOffset);
});
