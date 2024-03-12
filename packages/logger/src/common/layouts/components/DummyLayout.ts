import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";

@Layout({name: "dummy"})
export class DummyLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return loggingEvent.data[0];
  }
}
