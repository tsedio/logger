import {StderrAppender} from "./StderrAppender";
import {levels, LogEvent, StringUtils} from "../../common";
import {format} from "node:util";

StringUtils.format = format;

describe("StderrAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new StderrAppender({type: "console", options: {}});

    jest.spyOn(appender, "log").mockReturnValue(undefined);

    appender.write(logEvent);

    expect((appender as any).log).toBeCalledTimes(1);
    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
