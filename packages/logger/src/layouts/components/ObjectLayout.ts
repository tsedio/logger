import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import {logEventToObject} from "../utils/logEventToObject";

@Layout({name: "object"})
export class ObjectLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return logEventToObject(loggingEvent);
  }
}
