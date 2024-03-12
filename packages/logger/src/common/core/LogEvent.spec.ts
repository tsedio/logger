import {LogEvent} from "./LogEvent";
import {levels} from "./LogLevel";
import {LogContext} from "./LogContext";

describe("LogEvent", () => {
  it("should create a new logevent (data)", () => {
    const event = new LogEvent(
      "category",
      levels().INFO,
      [
        {
          test: "test"
        }
      ],
      new LogContext()
    );

    expect(event.getData()).toEqual({
      test: "test"
    });
    expect(event.getMessage()).toBeUndefined();
  });

  it("should create a new logevent (message)", () => {
    const event = new LogEvent("category", levels().INFO, ["message"], new LogContext());

    expect(event.getData()).toEqual({});
    expect(event.getMessage()).toEqual(["message"]);
  });
});
