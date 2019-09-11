import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {expect} from "../../tools";
import {ColoredLayout} from "../../../src/layouts/components/ColoredLayout";

describe("ColoredLayout", () => {
  it("should return a formated string", () => {
    const layout = new ColoredLayout({
      type: "colored"
    });

    const context = new Map();
    context.set("user", "romain");
    const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
    (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
    const result = layout.transform(logEvent);

    expect(result).to.contain("[36m[2017-06-18T22:29:38.234] [DEBUG] [category] - [39mdata");
  });
});
