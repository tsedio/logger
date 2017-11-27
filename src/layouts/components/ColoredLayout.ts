/**
 * @module layouts
 */
/** */
import {formatLogData} from "../utils/inspectUtils";
import {LogEvent} from "../../core/LogEvent";
import {timestampLevelAndCategory} from "../utils/timestampLevelAndCategory";
import {LOG_COLORS} from "../constants/logColors";
import {Layout} from "../decorators/layout";
import {BaseLayout} from "../class/BaseLayout";

@Layout({name: "colored"})
export class ColoredLayout extends BaseLayout {
    /**
     * colouredLayout - taken from masylum's fork.
     * same as basicLayout, but with colours.
     */
    transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
        const index: any = loggingEvent.level.toString();
        return timestampLevelAndCategory(
            loggingEvent,
            LOG_COLORS[index],
            timezoneOffset
        ) + formatLogData(loggingEvent.data);
    }
}