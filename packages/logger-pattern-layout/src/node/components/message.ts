import {format} from "node:util";

import {LogEvent} from "@tsed/logger";

import {formatter} from "../../common/index.js";

formatter("m", (loggingEvent: LogEvent): string => {
  return (format as any)(...(loggingEvent.data as any));
});
