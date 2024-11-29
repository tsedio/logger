import {StderrAppender} from "./StderrAppender.js";
import {levels, LogEvent} from "../../common/index.js";
import {format} from "node:util";
import {StringUtils} from "../../common/layouts/utils/StringUtils.js";

StringUtils.format = format;

describe("StderrAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new StderrAppender({type: "console", options: {}});

    vi.spyOn(appender, "log").mockReturnValue(undefined);

    appender.write(logEvent);

    expect((appender as any).log).toBeCalledTimes(1);
    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
