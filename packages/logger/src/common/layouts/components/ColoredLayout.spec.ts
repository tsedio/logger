import {LogEvent} from "../../core/LogEvent";
import {levels} from "../../core/LogLevel";
import {ColoredLayout} from "./ColoredLayout";

describe("ColoredLayout", () => {
  it("should return a formatted string", () => {
    const layout = new ColoredLayout({
      type: "colored"
    });

    const context = new Map();
    context.set("user", "romain");

    const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context as any);
    (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");

    const result = layout.transform(logEvent);

    expect(result).toEqual(expect.stringContaining("[36m[2017-06-18T22:29:38.234] [DEBUG] [category] - [39mdata"));
  });
});
