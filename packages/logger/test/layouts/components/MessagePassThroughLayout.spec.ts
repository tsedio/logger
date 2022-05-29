import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {MessagePassThroughLayout} from "../../../src/layouts/components/MessagePassThroughLayout";

describe("MessagePassThroughLayout", () => {
  it("should return a formated string", () => {
    const layout = new MessagePassThroughLayout({
      type: "messagePassThrough"
    });

    const context = new Map();
    context.set("user", "romain");
    const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context as any);
    (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
    const result = layout.transform(logEvent);
    expect(result).toEqual("data");
  });
});
