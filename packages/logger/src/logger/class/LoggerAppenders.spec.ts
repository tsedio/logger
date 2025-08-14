import "../../layouts/components/ColoredLayout.js";
import "../../appenders/components/ConsoleAppender.js";

import {BaseAppender} from "../../appenders/class/BaseAppender.js";
import {Appender} from "../../appenders/decorators/appender.js";
import {LogEvent} from "../../core/LogEvent.js";
import {levels} from "../../core/LogLevel.js";
import {LoggerAppenders} from "./LoggerAppenders.js";

@Appender({name: "test2"})
class TestAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {}
}

describe("LoggerAppenders", () => {
  let appenders: any;
  beforeAll(() => {
    appenders = new LoggerAppenders();
    appenders.set("custom", {type: "test2", levels: ["debug"]});
    appenders.set("custom", {type: TestAppender, levels: ["debug"]});
  });

  describe("byLogLevel()", () => {
    let result: any;
    beforeAll(() => {
      result = appenders.byLogLevel(levels().DEBUG);
    });

    describe("when appender exists", () => {
      it("should returns all appenders for a given level", () => {
        expect(Array.isArray(result)).toEqual(true);
        expect(result[0]).toBeInstanceOf(TestAppender);
      });
    });

    describe("when appender doesn't exists", () => {
      it("should throw an error", () => {
        let error: any;
        vi.spyOn(console, "warn").mockReturnValue();
        const options = {type: "unknow"};

        appenders.set("unknow", options);

        expect(console.warn).toHaveBeenCalledWith("Appender unknow doesn't exists. Check your configuration.");
      });
    });

    describe("caching updated", () => {
      let cachedAppenders: any;
      let result: any;
      beforeEach(() => {
        cachedAppenders = new LoggerAppenders();
        cachedAppenders.set("custom", {type: "test2", levels: ["debug"]});
        result = cachedAppenders.byLogLevel(levels().DEBUG);
      });
      it("when cleared should have no appenders", () => {
        cachedAppenders.clear();
        result = cachedAppenders.byLogLevel(levels().DEBUG);
        expect(result).toHaveLength(0);
      });
      it("when deleted should have no appenders", () => {
        cachedAppenders.delete("custom");
        result = cachedAppenders.byLogLevel(levels().DEBUG);
        expect(result).toHaveLength(0);
      });
      it("when deleted should have no appenders(2)", () => {
        cachedAppenders.set("custom2", {type: "test2", levels: ["debug"]});
        result = cachedAppenders.byLogLevel(levels().DEBUG);
        expect(result).toHaveLength(2);
      });
    });
  });

  describe("has()", () => {
    it("should return true", () => {
      expect(appenders.has("custom")).toBe(true);
    });
    it("should return false", () => {
      expect(appenders.has("custom2")).toBe(false);
    });
  });

  describe("get()", () => {
    it("should return configuration", () => {
      expect(!!appenders.get("custom")).toBe(true);
    });
    it("should return false", () => {
      expect(!!appenders.get("custom2")).toBe(false);
    });
  });

  describe("forEach()", () => {
    let result: any;
    beforeAll(() => {
      result = [];
      appenders.forEach((o: any) => result.push(o));
    });
    it("should return all elements", () => {
      expect(result.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("toArray()", () => {
    it("should return all elements", () => {
      expect(appenders.toArray().length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("delete()", () => {
    beforeAll(() => {
      appenders.set("custom2", {type: "test2", levels: ["debug"]});
    });

    it("should return configuration", () => {
      expect(appenders.delete("custom2")).toBe(true);
    });
  });

  describe("clear()", () => {
    beforeAll(() => {
      appenders.clear();
    });

    afterAll(() => {
      appenders.set("custom", {type: "test2", levels: ["debug"]});
    });

    it("should return configuration", () => {
      expect(appenders.size).toEqual(0);
    });
  });
});
