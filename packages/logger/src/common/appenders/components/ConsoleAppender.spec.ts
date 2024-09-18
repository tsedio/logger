import {ConsoleAppender} from "./ConsoleAppender";
import {LogEvent} from "../../core/LogEvent";
import {levels} from "../../core/LogLevel";
import "../../layouts/components/ColoredLayout";
import {StringUtils} from "../../layouts/utils/StringUtils";
import {format} from "node:util";

StringUtils.format = format;

describe("ConsoleAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new ConsoleAppender({type: "console", options: {}});
    jest.spyOn(appender, "log");

    appender.write(logEvent);

    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
