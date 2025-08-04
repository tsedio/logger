import "@tsed/logger-std";

import {Logger} from "@tsed/logger";

import {PatternLayout} from "./node/index.js";

describe("Logger integration", () => {
  it("should log only on trace", () => {
    const logger = new Logger("test");
    const layout = {
      type: PatternLayout,
      pattern: "[%d{hh:mm:ss}][%p] %m%n"
    };

    logger.appenders
      .set("console", {
        type: "stdout",
        layout,
        level: ["info", "debug"]
      })
      .set("console", {
        type: "stderr",
        layout,
        level: ["trace", "fatal", "error", "warn"]
      });

    logger.info("===");
  });
});
