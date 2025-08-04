import "../../layouts/components/ColoredLayout.js";

import {format} from "node:util";

import {vi} from "vitest";

import {LogEvent} from "../../core/LogEvent.js";
import {levels} from "../../core/LogLevel.js";
import {StringUtils} from "../../layouts/utils/StringUtils.js";
import {ConsoleAppender} from "./ConsoleAppender.js";

StringUtils.format = format;

describe("ConsoleAppender", () => {
  it("should log something", () => {
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new ConsoleAppender({type: "console", options: {}} as never);
    vi.spyOn(appender, "log");

    appender.write(logEvent);

    expect((appender as any).log).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] [test] -"));
  });
});
