import {AppenderOptions} from "../class/BaseAppender.js";
import {appender} from "../fn/appender.js";
import {AppendersRegistry} from "../registries/AppendersRegistry.js";

export function Appender(options: AppenderOptions) {
  return (target: any) => {
    appender(options.name, target, options);
  };
}
