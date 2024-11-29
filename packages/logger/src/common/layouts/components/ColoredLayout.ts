import {LogEvent} from "../../core/LogEvent.js";
import {timestampLevelAndCategory} from "../utils/timestampLevelAndCategory.js";
import {LOG_COLORS} from "../constants/logColors.js";
import {Layout} from "../decorators/layout.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {StringUtils} from "../utils/StringUtils.js";

@Layout({name: "colored"})
export class ColoredLayout extends BaseLayout {
  /**
   * colouredLayout - taken from masylum's fork.
   * same as basicLayout, but with colours.
   */
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    const index: any = loggingEvent.level.toString();
    const color = LOG_COLORS[index as keyof typeof LOG_COLORS];
    return (
      timestampLevelAndCategory(loggingEvent, color, timezoneOffset) + (StringUtils.format as any)(...[].concat(loggingEvent.data as any))
    );
  }
}
