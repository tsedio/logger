import {Logger, PatternLayout, StringUtils} from "../common";
import {LayoutReplacer} from "./layouts/LayoutReplacer";
import {format} from "./utils/format";

export * from "../common";
export const $log: Logger = new Logger("default");

$log.appenders.set("console", {type: "console", levels: ["info", "debug", "trace", "fatal", "error", "warn"]});

PatternLayout.LayoutReplacer = LayoutReplacer;
StringUtils.format = format;
