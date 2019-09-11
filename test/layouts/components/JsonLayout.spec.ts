import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {expect} from "../../tools";
import {JsonLayout} from "../../../src/layouts/components/JsonLayout";

describe("JsonLayout", () => {
  describe("when seperator is given", () => {
    let logEvent: any, layout: any, result: any;
    before(() => {
      layout = new JsonLayout({
        type: "json",
        separator: ","
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
          data: ["data"],
          context: {}
        }) + ","
      );
    });
  });

  describe("when seperator isn't given", () => {
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
          data: ["data"],
          context: {}
        })
      );
    });
  });
});
