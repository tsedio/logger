import {format} from "node:util";

import {LogEvent} from "../../core/LogEvent.js";
import {levels} from "../../core/LogLevel.js";
import {StringUtils} from "../utils/StringUtils.js";
import {BasicLayout} from "./BasicLayout.js";

StringUtils.format = format;

describe("BasicLayout", () => {
  it("should return a formated string", () => {
    const layout = new BasicLayout({
      type: "basic"
    });

    const context = new Map();
    context.set("user", "romain");
    const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context as any);
    (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
    const result = layout.transform(logEvent);

    expect(result).toEqual(expect.stringContaining("[2017-06-18T22:29:38.234] [DEBUG] [category] - data"));
  });
});
