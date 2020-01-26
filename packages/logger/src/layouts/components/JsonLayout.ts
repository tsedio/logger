import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import * as Util from "util";

/**
 *
 * @private
 */
@Layout({name: "json"})
export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    const log = {
      startTime: loggingEvent.startTime,
      categoryName: loggingEvent.categoryName,
      level: loggingEvent.level.toString(),
      data: loggingEvent.data,
      context: loggingEvent.context
    };

    log.data = log.data.map(data => (Util.format as any)(...[].concat(data as any)));

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}
