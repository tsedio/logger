import {format} from "node:util";
import {Logger, PatternLayout} from "../common/index";
import "./appenders/StdoutAppender";
import "./appenders/StderrAppender";
import {LayoutReplacer} from "./layouts/LayoutReplacer";
import {StringUtils} from "../common/layouts/utils/StringUtils";

export const $log: Logger = new Logger("default");

$log.appenders
  .set("stdout", {type: "stdout", levels: ["info", "debug"]})
  .set("stderr", {type: "stderr", levels: ["trace", "fatal", "error", "warn"]});

PatternLayout.LayoutReplacer = LayoutReplacer;
StringUtils.format = format;
