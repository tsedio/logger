import {Logger} from "@tsed/logger";

import {StderrAppender} from "./appenders/StderrAppender.js";
import {StdoutAppender} from "./appenders/StdoutAppender.js";

describe("Logger integration", () => {
  it("should log only on trace", () => {
    const logger = new Logger("test");

    logger.appenders
      .set("stdout", {
        type: StdoutAppender,
        level: ["info", "debug"]
      })
      .set("stderr", {
        type: StderrAppender,
        level: ["trace", "fatal", "error", "warn"]
      });

    logger.info("===");
  });
});
