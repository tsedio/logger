import {Logger} from "./index.js";

describe("Logger integration", () => {
  it("should log only on trace", () => {
    const logger = new Logger("test");
    const layout = {
      type: "pattern",
      pattern: "[%d{hh:mm:ss}][%p] %m%n"
    };

    logger.appenders
      .set("stdout", {
        type: "stdout",
        layout,
        level: ["info", "debug"]
      })
      .set("stderr", {
        type: "stderr",
        layout,
        level: ["trace", "fatal", "error", "warn"]
      });

    logger.info("===");
  });
});
