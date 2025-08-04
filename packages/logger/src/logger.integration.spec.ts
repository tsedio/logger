import {Logger} from "./index.js";
import {JsonLayout} from "./layouts/components/JsonLayout.js";

describe("Logger integration", () => {
  it("should log only on trace", () => {
    const logger = new Logger("test");

    logger.appenders
      .set("stdout", {
        type: "console",
        layout: JsonLayout,
        level: ["info", "debug"]
      })
      .set("stderr", {
        type: "console",
        layout: JsonLayout,
        level: ["trace", "fatal", "error", "warn"]
      });

    logger.info("===");
  });
});
