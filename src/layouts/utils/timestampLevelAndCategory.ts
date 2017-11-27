/**
 * @module layouts
 */
/** */
import {formatLogData} from "./inspectUtils";
import {colorize} from "./colorizeUtils";
import {LogEvent} from "../../core/LogEvent";

const dateFormat = require("date-format");

export function timestampLevelAndCategory(loggingEvent: LogEvent, colour: any, timezoneOffset: number | undefined) {
    return colorize(
        formatLogData(
            "[%s] [%s] [%s] - ",
            dateFormat.asString(loggingEvent.startTime, timezoneOffset),
            loggingEvent.formatedLevel,
            loggingEvent.categoryName
        ),
        colour
    );
}