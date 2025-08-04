import {LogEvent} from "@tsed/logger";

import type {FormatterOptions} from "./FormatterOptions.js";

export type FormatterHandler = (loggingEvent: LogEvent, specifier: string, opts: FormatterOptions) => string;
