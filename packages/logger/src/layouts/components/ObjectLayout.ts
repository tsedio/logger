import {LogEvent} from "../../core/LogEvent.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {Layout} from "../decorators/layout.js";
import {layout} from "../fn/layout.js";
import {logEventToObject} from "../utils/logEventToObject.js";

@Layout({name: "object"})
export class ObjectLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return logEventToObject(loggingEvent);
  }
}

layout("object", ObjectLayout);
