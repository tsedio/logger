import {BaseLayout} from "../class/BaseLayout.js";
import {LogEvent} from "../../core/LogEvent.js";
import {Layout} from "../decorators/layout.js";
import {logEventToObject} from "../utils/logEventToObject.js";

@Layout({name: "json"})
export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    const log = logEventToObject(loggingEvent);

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}
