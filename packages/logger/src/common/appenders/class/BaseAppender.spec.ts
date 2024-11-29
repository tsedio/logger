import "../../layouts/components/ColoredLayout.js";
import "../../layouts/components/DummyLayout.js";

import {vi} from "vitest";

import {LogEvent} from "../../core/LogEvent.js";
import {levels} from "../../core/LogLevel.js";
import {BaseAppender} from "./BaseAppender.js";

const buildStub = vi.fn();

class TestAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
    this.layout(loggingEvent);
  }

  build() {
    buildStub();
  }
}

describe("BaseAppender", () => {
  describe("config()", () => {
    it("should return configuration", () => {
      const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
      const testAppender = new TestAppender({type: "console", options: {}});
      testAppender.build();
      testAppender.write(logEvent);

      expect(buildStub).toHaveBeenCalledTimes(1);
      expect(testAppender.config).toEqual({type: "console", options: {}});
    });
  });
});
