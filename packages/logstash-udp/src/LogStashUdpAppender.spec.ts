import {AppendersRegistry, Logger} from "@tsed/logger";
import * as dgram from "dgram";
import {vi} from "vitest";

import {LogStashUdpAppender} from "./LogStashUdpAppender.js";

vi.mock("dgram");

function createLogger(options: Record<string, unknown> = {}) {
  const socket = {
    send: vi.fn(),
    close: vi.fn((cb: () => void) => cb())
  };

  vi.mocked(dgram.createSocket).mockReturnValue(socket as never);

  const logger = new Logger("test");

  logger.appenders.set("logstash", {
    type: "logstash-udp",
    options: {
      host: "localhost",
      port: 5000,
      ...options
    }
  });

  return {logger, socket};
}

function getPayload(socket: {send: ReturnType<typeof vi.fn>}) {
  return JSON.parse(socket.send.mock.calls[0][0].toString());
}

describe("LogStashUdpAppender", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be registered under the logstash-udp name", () => {
    expect(AppendersRegistry.get("logstash-udp")!.provide).toBe(LogStashUdpAppender);
  });

  it("should send a message to the configured host", () => {
    const {logger, socket} = createLogger();

    logger.info("hello");

    expect(dgram.createSocket).toHaveBeenCalledWith("udp4");
    expect(socket.send).toHaveBeenCalledWith(expect.any(Buffer), 0, expect.any(Number), 5000, "localhost", expect.any(Function));
    expect(getPayload(socket)).toMatchObject({
      "@version": 1,
      "@timestamp": expect.any(String),
      level: "INFO",
      category: "test",
      message: expect.stringContaining("hello")
    });
  });

  it("should merge the first object into the payload", () => {
    const {logger, socket} = createLogger();

    logger.error({event: "FAILED", code: 42});

    const payload = getPayload(socket);

    expect(payload).toMatchObject({
      event: "FAILED",
      code: 42,
      level: "ERROR"
    });
    expect(payload.message).toBeUndefined();
  });

  it("should add the second plain object as fields", () => {
    const {logger, socket} = createLogger();

    logger.info("hello", {user: "john"});

    expect(getPayload(socket).fields).toEqual({user: "john"});
  });

  it("should use the given extraDataProvider", () => {
    const {logger, socket} = createLogger({
      extraDataProvider: () => ({application: "my-app"})
    });

    logger.info("hello");

    expect(getPayload(socket).application).toEqual("my-app");
  });

  it("should report a send error", () => {
    const {logger, socket} = createLogger();
    const error = vi.spyOn(console, "error").mockReturnValue(undefined);

    logger.info("hello");
    socket.send.mock.calls[0][5](new Error("unreachable"));

    expect(error).toHaveBeenCalledWith(expect.stringContaining("Ts.ED Logger.logstash-udp - localhost:5000 Error:"));

    error.mockRestore();
  });

  it("should close the socket on shutdown", async () => {
    const {logger, socket} = createLogger();

    await logger.shutdown();

    expect(socket.close).toHaveBeenCalledTimes(1);
  });
});
