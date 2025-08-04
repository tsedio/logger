import {AppenderOptions} from "../class/BaseAppender.js";
import {AppendersRegistry} from "../registries/AppendersRegistry.js";

export function appender(name: string, target: any, options: Omit<AppenderOptions, "name"> = {}) {
  target.$appenderOptions = {
    ...options,
    name
  };
  target.$name = name;

  AppendersRegistry.set(name, {provide: target});
}
