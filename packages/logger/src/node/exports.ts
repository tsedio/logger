import Os from "os";
import Util from "util";
import {LayoutReplacer, Logger} from "../common/index";
import "./appenders/StdoutAppender";
import "./appenders/StderrAppender";

export const $log: Logger = new Logger("default");

$log.appenders
  .set("stdout", {type: "stdout", levels: ["info", "debug"]})
  .set("stderr", {type: "stderr", levels: ["trace", "fatal", "error", "warn"]});

LayoutReplacer.EOL = Os.EOL || "\n";
LayoutReplacer.HOSTNAME = Os.hostname().toString();
LayoutReplacer.formatter = Util.format;
