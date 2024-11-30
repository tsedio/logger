import "./appenders/StdoutAppender.js";
import "./appenders/StderrAppender.js";

import {format} from "node:util";

import {Logger, PatternLayout} from "../common/index.js";
import {StringUtils} from "../common/layouts/utils/StringUtils.js";
import {LayoutReplacer} from "./layouts/LayoutReplacer.js";

export const $log: Logger = new Logger("default");

$log.appenders
  .set("stdout", {type: "stdout", levels: ["info", "debug"]})
  .set("stderr", {type: "stderr", levels: ["trace", "fatal", "error", "warn"]});

PatternLayout.LayoutReplacer = LayoutReplacer;
StringUtils.format = format;
