/**
 * @module layouts
 */
/** */
import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {formatLogData} from "../utils/inspectUtils";
import {Layout} from "../decorators/layout";

@Layout({name: "messagePassThrough"})
export class MessagePassThroughLayout extends BaseLayout {

    transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
        return formatLogData(loggingEvent.data);
    }
}