import "./appenders/StdoutAppender.js";
import "./appenders/StderrAppender.js";

import {$log, format, StringUtils} from "@tsed/logger";

$log.appenders
  .set("stdout", {type: "stdout", levels: ["info", "debug"]})
  .set("stderr", {type: "stderr", levels: ["trace", "fatal", "error", "warn"]});

StringUtils.format = format;
