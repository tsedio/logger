import * as Util from "util";
import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import {removeColors} from "../utils/colorizeUtils";

@Layout({name: "json"})
export class JsonLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    const log: any = {
      startTime: loggingEvent.startTime,
      categoryName: loggingEvent.categoryName,
      level: loggingEvent.level.toString()
    };

    log.data = loggingEvent.data.reduce((data, current) => {
      if (typeof current === "object") {
        Object.assign(log, current);

        if (current.data) {
          return [].concat(data, current.data);
        }

        return data;
      }

      return [...data, removeColors(Util.format(current))];
    }, []);

    return JSON.stringify(log) + (this.config["separator"] || "");
  }
}
