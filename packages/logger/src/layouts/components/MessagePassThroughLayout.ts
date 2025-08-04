import {LogEvent} from "../../core/LogEvent.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {Layout} from "../decorators/layout.js";
import {layout} from "../fn/layout.js";
import {StringUtils} from "../utils/StringUtils.js";

export class MessagePassThroughLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    // @ts-ignore
    return StringUtils.format(...[].concat(loggingEvent.data as any));
  }
}

layout("messagePassThrough", MessagePassThroughLayout);
