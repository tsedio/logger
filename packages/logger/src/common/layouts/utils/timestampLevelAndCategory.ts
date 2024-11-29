// @ts-ignore
import * as dateFormat from "date-format";
import {colorize} from "./colorizeUtils.js";
import {LogEvent} from "../../core/LogEvent.js";
import {StringUtils} from "./StringUtils.js";

export function timestampLevelAndCategory(loggingEvent: LogEvent, colour: any, timezoneOffset: number | undefined) {
  return colorize(
    StringUtils.format(
      "[%s] [%s] [%s] - ",
      dateFormat.asString(loggingEvent.startTime, timezoneOffset),
      loggingEvent.formattedLevel,
      loggingEvent.categoryName
    ),
    colour
  );
}
