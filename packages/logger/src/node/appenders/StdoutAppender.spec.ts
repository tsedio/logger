import {levels, LogEvent} from "../../common";
import {StdoutAppender} from "./StdoutAppender";
import "./StdoutAppender";
import "./StdoutAppender";

describe("StdoutAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new StdoutAppender({type: "console", options: {}});
    jest.spyOn(appender, "log");

    appender.write(logEvent);

    expect((appender as any).log).toBeCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
