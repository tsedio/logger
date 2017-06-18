/**
 * @module layouts
 */
/** */
import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import {formatLogData} from "../utils/inpectUtils";
/**
 *
 * @private
 */
@Layout({name: "json"})
export class JsonLayout extends BaseLayout {

    transform(loggingEvent: LogEvent, timezoneOffset?): string {
        const log = {
            startTime: loggingEvent.startTime,
            categoryName: loggingEvent.categoryName,
            level: loggingEvent.level.toString(),
            data: loggingEvent.data,
            context: loggingEvent.context
        };

        log.data = log.data.map((data) => formatLogData([data]));

        return JSON.stringify(log) + (this.config["separator"] || "");
    };
}