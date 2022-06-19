import {Logger} from "@tsed/logger";
import {ConnectAppender} from "./ConnectAppender";

describe("ConnectAppender", () => {
  it("should log something (from class)", () => {
    const externalLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
      info: jest.fn(),
      trace: jest.fn(),
      warn: jest.fn()
    };

    const logger = new Logger("test");
    logger.appenders.set("connect", {
      type: ConnectAppender,
      options: {
        logger: externalLogger
      }
    });

    logger.debug({test: "test"});
    logger.error({test: "test"});
    logger.fatal({test: "test"});
    logger.info({test: "test"});
    logger.trace({test: "test"});
    logger.warn({test: "test"});

    expect(externalLogger.debug).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "DEBUG",
        test: "test"
      })
    );
    expect(externalLogger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "ERROR",
        test: "test"
      })
    );
    expect(externalLogger.fatal).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "FATAL",
        test: "test"
      })
    );
    expect(externalLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "INFO",
        test: "test"
      })
    );
    expect(externalLogger.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "WARN",
        test: "test"
      })
    );
  });
  it("should log something (from name)", () => {
    const externalLogger = {
      debug: jest.fn(),
      error: jest.fn(),
      fatal: jest.fn(),
      info: jest.fn(),
      trace: jest.fn(),
      warn: jest.fn()
    };

    const logger = new Logger("test");
    logger.appenders.set("connect", {
      type: "connect",
      options: {
        logger: externalLogger
      }
    });

    logger.debug({test: "test"});
    logger.error({test: "test"});
    logger.fatal({test: "test"});
    logger.info({test: "test"});
    logger.trace({test: "test"});
    logger.warn({test: "test"});

    expect(externalLogger.debug).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "DEBUG",
        test: "test"
      })
    );
    expect(externalLogger.error).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "ERROR",
        test: "test"
      })
    );
    expect(externalLogger.fatal).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "FATAL",
        test: "test"
      })
    );
    expect(externalLogger.info).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "INFO",
        test: "test"
      })
    );
    expect(externalLogger.warn).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryName: "test",
        data: [],
        level: "WARN",
        test: "test"
      })
    );
  });
});
