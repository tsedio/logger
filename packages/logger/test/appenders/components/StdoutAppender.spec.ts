import {StdoutAppender} from "../../../src/appenders/components/StdoutAppender";
import {levels, LogEvent} from "../../../src";

describe("StdoutAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new StdoutAppender({type: "console"});
    jest.spyOn(appender, "log");

    appender.write(logEvent);

    expect((appender as any).log).toBeCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
