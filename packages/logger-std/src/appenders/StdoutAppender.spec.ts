import "./StdoutAppender";
import "./StdoutAppender";

import {format} from "node:util";

import {levels, LogEvent, StringUtils} from "@tsed/logger";
import {vi} from "vitest";

import {StdoutAppender} from "./StdoutAppender.js";

StringUtils.format = format;

describe("StdoutAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new StdoutAppender({type: "console", options: {}});
    vi.spyOn(appender, "log");

    appender.write(logEvent);

    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
