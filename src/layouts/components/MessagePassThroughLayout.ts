/**
 * @module layouts
 */
/** */
import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {formatLogData} from "../utils/inpectUtils";
import {Layout} from "../decorators/layout";

@Layout({name: "messagePassThrough"})
export class MessagePassThroughLayout extends BaseLayout {

    transform(loggingEvent: LogEvent, timezoneOffset?): string {
        return formatLogData(loggingEvent.data);
    };
}