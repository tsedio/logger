import {LogEvent} from "@tsed/logger";
// @ts-ignore
import * as dateFormat from "date-format";

import {formatter} from "../fn/formatter.js";
import type {FormatterOptions} from "../types/FormatterOptions.js";

formatter("d", (loggingEvent: LogEvent, specifier: string, {timezoneOffset}: FormatterOptions): string => {
  let format = dateFormat.ISO8601_FORMAT;
  if (specifier) {
    format = specifier;
    // Pick up special cases
    if (format === "ISO8601") {
      format = dateFormat.ISO8601_FORMAT;
    } else if (format === "ISO8601_WITH_TZ_OFFSET") {
      format = dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT;
    } else if (format === "ABSOLUTE") {
      format = dateFormat.ABSOLUTETIME_FORMAT;
    } else if (format === "DATE") {
      format = dateFormat.DATETIME_FORMAT;
    }
  }
  // Format the date
  return dateFormat.asString(format, loggingEvent.startTime, timezoneOffset);
});

formatter("r", (loggingEvent: LogEvent, _, {timezoneOffset}): string => {
  return dateFormat.asString("hh:mm:ss", loggingEvent.startTime, timezoneOffset);
});
