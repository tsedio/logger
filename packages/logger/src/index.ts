/**
 * @preferred
 *
 * @fileoverview ts-log-debug is a library to log in TypeScript.
 *
 * <h3>Example:</h3>
 * <pre>
 * import {$log} from "ts-log-debug";
 * $log.level = "debug";
 * $log.name = "APP";
 * $log.debug("Some debug messages");
 * </pre>
 *
 * @author Lenzotti Romain
 * @since 2017-06-18
 * @static
 * Website:
 */
export * from "./core";
export * from "./appenders";
export * from "./layouts";
export * from "./logger";

import {Logger} from "./logger/class/Logger";

let $log: Logger = new Logger("default");

$log.appenders
  .set("stdout", {type: "stdout", levels: ["info", "debug"]})
  .set("stderr", {type: "stderr", levels: ["trace", "fatal", "error", "warn"]});

export default {
  $log
};

export {$log};
