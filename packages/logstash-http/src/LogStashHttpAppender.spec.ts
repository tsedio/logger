import {AppendersRegistry, Logger} from "@tsed/logger";
import axios from "axios";
import axiosRetry from "axios-retry";
import {vi} from "vitest";

import {LogStashHttpAppender} from "./LogStashHttpAppender.js";

vi.mock("axios");
vi.mock("axios-retry");

function createLogger(options: Record<string, unknown> = {}) {
  const client = vi.fn().mockResolvedValue({status: 200, data: {errors: false}});

  vi.mocked(axios.create).mockReturnValue(client as never);

  const logger = new Logger("test");

  logger.appenders.set("logstash", {
    type: "logstash-http",
    options: {
      url: "http://localhost:9200/_bulk",
      application: "logstash-test",
      logType: "application",
      logChannel: "node",
      ...options
    }
  });

  return {logger, client};
}

function getLines(client: ReturnType<typeof vi.fn>, call = 0) {
  return client.mock.calls[call][0].data
    .split("\n")
    .filter(Boolean)
    .map((line: string) => JSON.parse(line));
}

describe("LogStashHttpAppender", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should be registered under the logstash-http name", () => {
    expect(AppendersRegistry.get("logstash-http")!.provide).toBe(LogStashHttpAppender);
  });

  it("should create the HTTP client from the options", () => {
    createLogger({
      auth: {username: "user", password: "pass"},
      timeout: 1000,
      params: {pipeline: "main"},
      headers: {"x-api-key": "key"},
      retryOptions: {retries: 5}
    });

    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: "http://localhost:9200/_bulk",
        auth: {username: "user", password: "pass"},
        timeout: 1000,
        params: {pipeline: "main"},
        headers: {"x-api-key": "key"}
      })
    );
    expect(axiosRetry).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({retries: 5}));
  });

  it("should post each log as a bulk request when no buffer is configured", () => {
    const {logger, client} = createLogger();

    logger.info({event: "STARTED"});

    expect(client).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        headers: {"Content-Type": "application/x-ndjson"}
      })
    );

    const [action, document] = getLines(client);

    expect(action.index).toMatchObject({
      _index: "logstash-test",
      _type: "application",
      _id: expect.any(String)
    });
    expect(document).toMatchObject({
      event: "STARTED",
      level_name: "info",
      channel: "node",
      datetime: expect.any(String)
    });
  });

  it("should resolve the index from a function", () => {
    const {logger, client} = createLogger({application: () => "dynamic-index"});

    logger.info("hello");

    expect(getLines(client)[0].index._index).toEqual("dynamic-index");
  });

  it("should wait for bufferMax logs before posting", () => {
    const {logger, client} = createLogger({bufferMax: 2});

    logger.info("first");

    expect(client).not.toHaveBeenCalled();

    logger.info("second");

    expect(client).toHaveBeenCalledTimes(1);
    expect(getLines(client)).toHaveLength(4);
  });

  it("should flush the buffer on shutdown", async () => {
    const {logger, client} = createLogger({bufferMax: 10});

    logger.info("first");

    expect(client).not.toHaveBeenCalled();

    await logger.shutdown();

    expect(client).toHaveBeenCalledTimes(1);
  });

  it("should report a response error", async () => {
    const {logger, client} = createLogger({bufferMax: 10});
    const error = vi.spyOn(console, "error").mockReturnValue(undefined);

    client.mockRejectedValue({response: {status: 500, data: {reason: "failed"}}});

    logger.info("first");
    await logger.shutdown();

    expect(error).toHaveBeenCalledWith(expect.stringContaining('error posting to http://localhost:9200/_bulk: 500 - {"reason":"failed"}'));

    error.mockRestore();
  });

  it("should report a network error", async () => {
    const {logger, client} = createLogger({bufferMax: 10});
    const error = vi.spyOn(console, "error").mockReturnValue(undefined);

    client.mockRejectedValue(new Error("ECONNREFUSED"));

    logger.info("first");
    await logger.shutdown();

    expect(error).toHaveBeenCalledWith("Ts.ED Logger.logstash-http Appender error: ECONNREFUSED");

    error.mockRestore();
  });
});
