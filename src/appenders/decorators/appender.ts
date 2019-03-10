/**
 * @module appenders
 */
/** */
import {AppendersRegistry} from "../registries/AppendersRegistry";
import {IAppenderOptions} from "../class/BaseAppender";

export function Appender(options: IAppenderOptions) {
  return (target: any) => {
    target.prototype.appenderOptions = options;
    AppendersRegistry.set(options.name, {provide: target});
  };
}
