import "../../layouts/components/ColoredLayout.js";

import {BaseAppender} from "../../appenders/class/BaseAppender.js";
import {Appender} from "../../appenders/decorators/appender.js";
import {LogEvent} from "../../core/LogEvent.js";
import {LogLevel} from "../../core/LogLevel.js";
import {BaseLayout} from "../../layouts/class/BaseLayout.js";
import {Layout} from "../../layouts/decorators/layout.js";
import {Logger} from "./Logger.js";

@Layout({name: "test"})
class TestLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): any {
    return null;
  }
}

const stub = vi.fn();

@Appender({name: "test"})
class TestAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
    stub(loggingEvent);
  }
}

function createLoggerFixture() {
  const logger = new Logger();
  logger.name = "loggerName";
  logger.start();
  logger.appenders.set("custom", {type: "test", layout: {type: "test"}});

  return {logger};
}

describe("Logger", () => {
  afterEach(() => {
    stub.mockReset();
  });
  it("should return logger", () => {
    const {logger} = createLoggerFixture();
    expect(logger.name).toEqual("loggerName");
    expect(logger.context).toBeInstanceOf(Map);
    expect(logger.level).toEqual("ALL");
  });

  describe("debug()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();

      logger.debug("test");

      const arg = stub.mock.calls[0][0];
      expect(stub).toHaveBeenCalledTimes(1);
      expect(arg.categoryName).toEqual("loggerName");
      expect(arg.level).toBeInstanceOf(LogLevel);
      expect(arg.level.toString()).toEqual("DEBUG");
      expect(arg.data).toEqual(["test"]);
      expect(arg.startTime).toBeInstanceOf(Date);
      expect(arg.formattedLevel).toEqual("DEBUG");
      expect(arg.context).toBeInstanceOf(Map);
    });
  });

  describe("info()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();
      logger.info("test");

      const arg = stub.mock.calls[0][0];

      expect(stub).toHaveBeenCalledTimes(1);
      expect(arg.categoryName).toEqual("loggerName");
      expect(arg.level).toBeInstanceOf(LogLevel);
      expect(arg.level.toString()).toEqual("INFO");
      expect(arg.data).toEqual(["test"]);
      expect(arg.startTime).toBeInstanceOf(Date);
      expect(arg.formattedLevel).toEqual("INFO ");
      expect(arg.context).toBeInstanceOf(Map);
    });
  });

  describe("warn()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();
      logger.warn("test");
      const arg = stub.mock.calls[0][0];

      expect(stub).toHaveBeenCalledTimes(1);
      expect(arg.categoryName).toEqual("loggerName");
      expect(arg.level).toBeInstanceOf(LogLevel);
      expect(arg.level.toString()).toEqual("WARN");
      expect(arg.data).toEqual(["test"]);
      expect(arg.startTime).toBeInstanceOf(Date);
      expect(arg.formattedLevel).toEqual("WARN ");
      expect(arg.context).toBeInstanceOf(Map);
    });
  });

  describe("trace()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();
      logger.trace("test");
      const arg = stub.mock.calls[0][0];

      expect(stub).toHaveBeenCalledTimes(1);
      expect(arg.categoryName).toEqual("loggerName");
      expect(arg.level).toBeInstanceOf(LogLevel);
      expect(arg.level.toString()).toEqual("TRACE");
      expect(arg.data).toHaveLength(2);
      expect(arg.startTime).toBeInstanceOf(Date);
      expect(arg.formattedLevel).toEqual("TRACE");
      expect(arg.context).toBeInstanceOf(Map);
    });
  });

  describe("error()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();
      logger.error("test");

      const arg = stub.mock.calls[0][0];

      expect(stub).toHaveBeenCalledTimes(1);
      expect(arg.categoryName).toEqual("loggerName");
      expect(arg.level).toBeInstanceOf(LogLevel);
      expect(arg.level.toString()).toEqual("ERROR");
      expect(arg.data).toEqual(["test"]);
      expect(arg.startTime).toBeInstanceOf(Date);
      expect(arg.formattedLevel).toEqual("ERROR");
      expect(arg.context).toBeInstanceOf(Map);
    });
  });

  describe("fatal()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();
      logger.fatal("test");

      const arg = stub.mock.calls[0][0];

      expect(stub).toHaveBeenCalledTimes(1);
      expect(arg.categoryName).toEqual("loggerName");
      expect(arg.level).toBeInstanceOf(LogLevel);
      expect(arg.level.toString()).toEqual("FATAL");
      expect(arg.data).toEqual(["test"]);
      expect(arg.startTime).toBeInstanceOf(Date);
      expect(arg.formattedLevel).toEqual("FATAL");
      expect(arg.context).toBeInstanceOf(Map);
    });
  });

  describe("stop()", () => {
    beforeAll(() => {
      const {logger} = createLoggerFixture();
      logger.stop();
      logger.fatal("test");
      logger.start();
    });
    afterAll(() => {
      stub.mockReset();
    });

    it("should call layout", () => {
      expect(stub).not.toHaveBeenCalled();
    });
  });

  describe("printTable()", () => {
    it("should call layout", () => {
      const {logger} = createLoggerFixture();
      logger.printTable(
        [
          {
            field1: "Test1",
            field2: "Test2",
            field3: "Test3"
          },

          {
            field1: "Test1",
            field2: "Test2",
            field3: "Test3"
          },

          {
            field1: "Test1",
            field2: "Test2",
            field3: "Test3"
          }
        ],
        {
          padding: 2,
          header: {
            field1: "FIELD 1",
            field2: "FIELD 2"
          }
        }
      );
      expect(stub).toHaveBeenCalled();
    });
  });

  describe("shutdown()", () => {
    it("should stop logger", async () => {
      const logger = new Logger();
      logger.name = "loggerName";
      logger.start();
      logger.appenders.set("custom", {type: "test", layout: {type: "test"}});

      await logger.shutdown();
    });
  });
});
