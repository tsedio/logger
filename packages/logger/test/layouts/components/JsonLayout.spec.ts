import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {JsonLayout} from "../../../src/layouts/components/JsonLayout";
import {expect} from "chai";

describe("JsonLayout", () => {
  describe("when separator is given", () => {
    it("should return a formatted string", () => {
      const layout = new JsonLayout({
        type: "json",
        separator: ","
      });

      const context = new Map();
      context.set("user", "romain");
      const logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      // @ts-ignore
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      const result = layout.transform(logEvent);

      // @ts-ignore
      expect(result).to.eq(
        JSON.stringify({
          startTime: logEvent.startTime,
          categoryName: "category",
          level: "DEBUG",
          data: ["data"]
        }) + ","
      );
    });
    it("should return a formatted object", () => {
      const layout = new JsonLayout({
        type: "json",
        separator: ","
      });

      const context = new Map();
      context.set("user", "romain");
      const logEvent = new LogEvent("category", levels().DEBUG, [{
        test: "test",
        data: ["hello"]
      }], context);
      // @ts-ignore
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      const result = layout.transform(logEvent);

      // @ts-ignore
      expect(result).to.eq(
        JSON.stringify({
          startTime: logEvent.startTime,
          categoryName: "category",
          level: "DEBUG",
          test: "test",
          data: ["hello"]
        }) + ","
      );
    });
  });

  describe("when separator isn't given", () => {
    let logEvent: any, layout: any, result: any;
    before(() => {
      layout = new JsonLayout({
        type: "json"
      });

      const context = new Map();
      context.set("user", "romain");
      logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      result = layout.transform(logEvent);
    });

    it("should return a formated string", () => {
      expect(result).to.eq(
        JSON.stringify({
          startTime: logEvent._startTime,
          categoryName: "category",
          level: "DEBUG",
          data: ["data"]
        })
      );
    });
  });
});
