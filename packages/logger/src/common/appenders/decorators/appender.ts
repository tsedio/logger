import {AppendersRegistry} from "../registries/AppendersRegistry.js";
import {AppenderOptions} from "../class/BaseAppender.js";

export function Appender(options: AppenderOptions) {
  return (target: any) => {
    target.$appenderOptions = options;
    target.$name = options.name;

    AppendersRegistry.set(options.name, {provide: target});
  };
}
