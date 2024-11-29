import {LogEvent} from "../../core/LogEvent.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {Layout} from "../decorators/layout.js";

@Layout({name: "dummy"})
export class DummyLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return loggingEvent.data[0];
  }
}
