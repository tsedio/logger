import {AppendersRegistry} from "../registries/AppendersRegistry";
import {AppenderOptions} from "../class/BaseAppender";

export function Appender(options: AppenderOptions) {
  return (target: any) => {
    target.prototype.appenderOptions = options;
    target.$name = options.name;
    AppendersRegistry.set(options.name, {provide: target});
  };
}
