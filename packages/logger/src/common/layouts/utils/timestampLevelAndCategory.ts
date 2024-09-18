// @ts-ignore
import * as dateFormat from "date-format";
import {colorize} from "./colorizeUtils";
import {LogEvent} from "../../core/LogEvent";
import {format} from "./StringUtils";

export function timestampLevelAndCategory(loggingEvent: LogEvent, colour: any, timezoneOffset: number | undefined) {
  return colorize(
    format(
      "[%s] [%s] [%s] - ",
      dateFormat.asString(loggingEvent.startTime, timezoneOffset),
      loggingEvent.formattedLevel,
      loggingEvent.categoryName
    ),
    colour
  );
}
