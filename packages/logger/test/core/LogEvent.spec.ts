import {LogEvent} from "../../src/core/LogEvent";
import {levels, LogContext} from "@tsed/logger";
import {expect} from "chai";

describe("LogEvent", () => {
  it("should create a new logevent (data)", () => {
    const event = new LogEvent(
      "category",
      levels().INFO,
      [{
        test: "test"
      }],
      new LogContext()
    );

    expect(event.getData()).to.deep.eq({
      "test": "test"
    });
    expect(event.getMessage()).to.deep.eq(undefined);
  });

  it("should create a new logevent (message)", () => {
    const event = new LogEvent(
      "category",
      levels().INFO,
      ["message"],
      new LogContext()
    );

    expect(event.getData()).to.deep.eq({});
    expect(event.getMessage()).to.deep.eq(["message"]);
  });
});
