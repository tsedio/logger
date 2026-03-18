// @ts-ignore

import {LogEvent} from "../../core/LogEvent.js";
import {dateFormat} from "../../utils/dateFormat.js";
import {colorize} from "./colorizeUtils.js";
import {StringUtils} from "./StringUtils.js";

export function timestampLevelAndCategory(loggingEvent: LogEvent, colour: any, timezoneOffset: number | undefined) {
  return colorize(
    StringUtils.format(
      "[%s] [%s] [%s] - ",
      dateFormat(loggingEvent.startTime, timezoneOffset),
      loggingEvent.formattedLevel,
      loggingEvent.categoryName
    ),
    colour
  );
}
