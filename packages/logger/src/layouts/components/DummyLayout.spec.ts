import {LogEvent} from "../../core/LogEvent.js";
import {levels} from "../../core/LogLevel.js";
import {DummyLayout} from "./DummyLayout.js";

describe("DummyLayout", () => {
  it("should return a formated string", () => {
    const layout = new DummyLayout({
      type: "dummy"
    });

    const context = new Map();
    context.set("user", "romain");
    const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context as any);
    (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
    const result = layout.transform(logEvent);

    expect(result).toEqual("data");
  });
});
