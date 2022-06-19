import {ConsoleAppender} from "../../../src/appenders/components/ConsoleAppender";
import {levels, LogEvent} from "../../../src";

describe("ConsoleAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new ConsoleAppender({type: "console", options: {}});
    jest.spyOn(appender, "log");

    appender.write(logEvent);

    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
