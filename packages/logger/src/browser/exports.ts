import {Logger} from "../common";

export * from "../common";
export const $log: Logger = new Logger("default");

$log.appenders.set("console", {type: "console", levels: ["info", "debug", "trace", "fatal", "error", "warn"]});
