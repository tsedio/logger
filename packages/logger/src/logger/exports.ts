import {Logger} from "./class/Logger";

export const $log: Logger = new Logger("default");

$log.appenders
  .set("stdout", {type: "stdout", levels: ["info", "debug"]})
  .set("stderr", {type: "stderr", levels: ["trace", "fatal", "error", "warn"]});
