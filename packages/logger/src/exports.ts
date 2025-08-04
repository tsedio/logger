import {ConsoleAppender} from "./appenders/components/ConsoleAppender.js";
import {ColoredLayout} from "./layouts/components/ColoredLayout.js";
import {Logger} from "./logger/class/Logger.js";

export const $log: Logger = new Logger("default");

$log.appenders.set("stdout", {
  type: ConsoleAppender,
  layout: {type: ColoredLayout},
  levels: ["info", "debug", "trace", "fatal", "error", "warn"]
});
