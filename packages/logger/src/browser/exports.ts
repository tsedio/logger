import {Logger, PatternLayout} from "../common/index.js";
import {LayoutReplacer} from "./layouts/LayoutReplacer.js";
import {format} from "./utils/format.js";
import {StringUtils} from "../common/layouts/utils/StringUtils.js";

export * from "../common/index.js";
export const $log: Logger = new Logger("default");

$log.appenders.set("console", {type: "console", levels: ["info", "debug", "trace", "fatal", "error", "warn"]});

PatternLayout.LayoutReplacer = LayoutReplacer;
StringUtils.format = format;
