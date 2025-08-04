import {LogEvent} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";
import type {FormatterOptions} from "../types/FormatterOptions.js";

formatter("x", (loggingEvent: LogEvent, specifier: string, {tokens}: FormatterOptions) => {
  if (typeof tokens[specifier] !== "undefined") {
    return typeof tokens[specifier] === "function" ? tokens[specifier](loggingEvent) : tokens[specifier];
  }

  return null;
});
