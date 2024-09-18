import {LogEvent} from "../../core/LogEvent";
import {removeColors} from "./colorizeUtils";
import {StringUtils} from "./StringUtils";

export function logEventToObject(loggingEvent: LogEvent) {
  const log: any = {
    ...loggingEvent.context.toJSON(),
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

    return [...data, removeColors(StringUtils.format(current))];
  }, []);

  return log;
}
