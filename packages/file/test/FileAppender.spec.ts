import {levels, LogEvent} from "@tsed/logger";
import {FileAppender} from "../src";

describe("FileAppender", () => {
  afterEach(() => jest.resetAllMocks());
  it("should log something", async () => {
    // GIVEN
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new FileAppender({type: "console", filename: "log.log"});

    const writeStub = jest.spyOn((appender as any).writer, "write").mockReturnValue(undefined);

    appender.write(logEvent);

    // WHEN
    await appender.shutdown();
    await appender.reopen();

    // THEN
    expect(writeStub).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test]"), "utf8");
  });

  it("Date rolling (should log something)", async () => {
    // GIVEN
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new FileAppender({type: "console", filename: "log.log", pattern: ".yyyy-MM-dd"});

    const writeStub = jest.spyOn((appender as any).writer, "write");

    appender.write(logEvent);

    // WHEN
    await appender.shutdown();
    await appender.reopen();

    // THEN
    expect(writeStub).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test]"), "utf8");
  });
});
