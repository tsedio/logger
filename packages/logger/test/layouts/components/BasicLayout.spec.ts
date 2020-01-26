import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {BasicLayout} from "../../../src/layouts/components/BasicLayout";
import {expect} from "chai";

describe("BasicLayout", () => {
  it("should return a formated string", () => {
    const layout = new BasicLayout({
      type: "basic"
    });

    const context = new Map();
    context.set("user", "romain");
    const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
    (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
    const result = layout.transform(logEvent);

    expect(result).to.contain("[2017-06-18T22:29:38.234] [DEBUG] [category] - data");
  });
});
