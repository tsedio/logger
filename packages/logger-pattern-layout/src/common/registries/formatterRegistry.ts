import {LogEvent} from "@tsed/logger";

import {FormatterOptions} from "../types/FormatterOptions.js";

export const formatterRegistry = new Map<string, (loggingEvent: LogEvent, specifier: string, opts: FormatterOptions) => string>();
