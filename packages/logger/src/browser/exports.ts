import {Logger, PatternLayout} from "../common";
import {LayoutReplacer} from "./layouts/LayoutReplacer";
import {format} from "./utils/format";
import {StringUtils} from "../common/layouts/utils/StringUtils";

export * from "../common";
export const $log: Logger = new Logger("default");

$log.appenders.set("console", {type: "console", levels: ["info", "debug", "trace", "fatal", "error", "warn"]});

PatternLayout.LayoutReplacer = LayoutReplacer;
StringUtils.format = format;
