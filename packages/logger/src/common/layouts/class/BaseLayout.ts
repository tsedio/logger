import {LogEvent} from "../../core/LogEvent.js";
import {BasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration.js";

export abstract class BaseLayout {
  constructor(protected config: BasicLayoutConfiguration) {}

  abstract transform(loggingEvent: LogEvent, timezoneOffset?: number): string;
}
