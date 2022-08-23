import {BaseAppender, LogEvent} from "../../../src";
import {levels} from "../../../src/core/LogLevel";

const buildStub = jest.fn();

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

      expect(buildStub).toBeCalledTimes(1);
      expect(testAppender.config).toEqual({type: "console", options: {}});
    });
  });
});
