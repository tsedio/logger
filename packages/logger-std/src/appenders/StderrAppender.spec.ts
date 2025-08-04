import {format} from "node:util";

import {levels, LogEvent, StringUtils} from "@tsed/logger";

import {StderrAppender} from "./StderrAppender.js";

StringUtils.format = format;

describe("StderrAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new StderrAppender({type: "console", options: {}});

    vi.spyOn(appender, "log").mockReturnValue(undefined);

    appender.write(logEvent);

    expect((appender as any).log).toHaveBeenCalledTimes(1);
    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
