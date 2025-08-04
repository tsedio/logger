import {LogEvent, StringUtils} from "@tsed/logger";

import {formatter} from "../fn/formatter.js";

export const message = (loggingEvent: LogEvent): string => {
  return (StringUtils.format as any)(...(loggingEvent.data as any));
};

formatter("m", message);
