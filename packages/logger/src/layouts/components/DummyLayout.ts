import {LogEvent} from "../../core/LogEvent.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {layout} from "../fn/layout.js";

export class DummyLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return loggingEvent.data[0];
  }
}

layout("dummy", DummyLayout);
