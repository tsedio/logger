import {timestampLevelAndCategory} from "../utils/timestampLevelAndCategory";
import {BaseLayout} from "../class/BaseLayout";
import {LogEvent} from "../../core/LogEvent";
import {Layout} from "../decorators/layout";
import {StringUtils} from "../utils/StringUtils";

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
