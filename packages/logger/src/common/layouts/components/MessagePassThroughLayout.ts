import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import {format} from "../utils/StringUtils";

@Layout({name: "messagePassThrough"})
export class MessagePassThroughLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    // @ts-ignore
    return format(...[].concat(loggingEvent.data as any));
  }
}
