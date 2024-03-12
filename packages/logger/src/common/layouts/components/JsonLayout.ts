import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import {logEventToObject} from "../utils/logEventToObject";

@Layout({name: "json"})
export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    const log = logEventToObject(loggingEvent);

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}
