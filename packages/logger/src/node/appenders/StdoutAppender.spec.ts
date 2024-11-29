import "./StdoutAppender";
import "./StdoutAppender";

import {format} from "node:util";

import {vi} from "vitest";

import {levels, LogEvent} from "../../common/index.js";
import {StringUtils} from "../../common/layouts/utils/StringUtils.js";
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
