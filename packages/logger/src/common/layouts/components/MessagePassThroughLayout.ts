import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import * as Util from "util";

@Layout({name: "messagePassThrough"})
export class MessagePassThroughLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return (Util.format as any)(...[].concat(loggingEvent.data as any));
  }
}
