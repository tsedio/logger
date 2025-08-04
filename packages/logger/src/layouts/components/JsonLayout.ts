import {LogEvent} from "../../core/LogEvent.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {layout} from "../fn/layout.js";
import {logEventToObject} from "../utils/logEventToObject.js";

export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    const log = logEventToObject(loggingEvent);

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}

layout("json", JsonLayout);
