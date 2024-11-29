import {timestampLevelAndCategory} from "../utils/timestampLevelAndCategory.js";
import {BaseLayout} from "../class/BaseLayout.js";
import {LogEvent} from "../../core/LogEvent.js";
import {Layout} from "../decorators/layout.js";
import {StringUtils} from "../utils/StringUtils.js";

@Layout({name: "basic"})
export class BasicLayout extends BaseLayout {
  /**
   * BasicLayout is a simple layouts for storing the logs. The logs are stored
   * in following format:
   * <pre>
   * [startTime] [logLevel] categoryName - message\n
   * </pre>
   *
   * @author Stephan Strittmatter
   */
  transform(loggingEvent: LogEvent, timezoneOffset?: number): string {
    return (
      timestampLevelAndCategory(loggingEvent, undefined, timezoneOffset) +
      (StringUtils.format as any)(...[].concat(loggingEvent.data as any))
    );
  }
}
