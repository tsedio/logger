import {AppendersRegistry} from "../registries/AppendersRegistry";
import {IAppenderOptions} from "../class/BaseAppender";

export function Appender(options: IAppenderOptions) {
  return (target: any) => {
    target.prototype.appenderOptions = options;
    target.$name = options.name;
    AppendersRegistry.set(options.name, {provide: target});
  };
}
