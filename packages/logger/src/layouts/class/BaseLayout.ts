import {LogEvent} from "../../core/LogEvent";
import {IBasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration";

export abstract class BaseLayout {
  constructor(protected config: IBasicLayoutConfiguration) {}

  abstract transform(loggingEvent: LogEvent, timezoneOffset?: number): string;
}
