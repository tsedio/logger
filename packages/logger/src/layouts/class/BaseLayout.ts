import {LogEvent} from "../../core/LogEvent";
import {BasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration";

export abstract class BaseLayout {
  constructor(protected config: BasicLayoutConfiguration) {}

  abstract transform(loggingEvent: LogEvent, timezoneOffset?: number): string;
}
