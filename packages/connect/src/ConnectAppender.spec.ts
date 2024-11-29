import {Logger} from "@tsed/logger";
import {vi} from "vitest";

import {ConnectAppender} from "./ConnectAppender.js";

describe("ConnectAppender", () => {
  it("should log something (from class)", () => {
    const externalLogger = {
      debug: vi.fn(),
      error: vi.fn(),
      fatal: vi.fn(),
      info: vi.fn(),
      trace: vi.fn(),
      warn: vi.fn()
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
      debug: vi.fn(),
      error: vi.fn(),
      fatal: vi.fn(),
      info: vi.fn(),
      trace: vi.fn(),
      warn: vi.fn()
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
