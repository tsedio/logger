import {LoggerAppenders} from "../../../src/logger/class/LoggerAppenders";
import {Appender} from "../../../src";
import {BaseAppender} from "../../../src/appenders/class/BaseAppender";
import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {assert, expect} from "chai";

@Appender({name: "test2"})
class TestAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {}
}

describe("LoggerAppenders", () => {
  let appenders: any;
  before(() => {
    appenders = new LoggerAppenders();
    appenders.set("custom", {type: "test2", levels: ["debug"]});
  });

  describe("byLogLevel()", () => {
    let result: any;
    before(() => {
      result = appenders.byLogLevel(levels().DEBUG);
    });

    describe("when appender exists", () => {
      it("should returns all appenders for a given level", () => {
        expect(result).to.be.an("array");
        expect(result[0]).instanceof(TestAppender);
      });
    });

    describe("when appender doesn't exists", () => {
      it("should throw an error", () => {
        assert.throws(() => appenders.set("unknow", {type: "unknow"}), "");
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
        expect(result).to.be.an("array").lengthOf(0);
      });
      it("when deleted should have no appenders", () => {
        cachedAppenders.delete("custom");
        result = cachedAppenders.byLogLevel(levels().DEBUG);
        expect(result).to.be.an("array").lengthOf(0);
      });
      it("when deleted should have no appenders", () => {
        cachedAppenders.set("custom2", {type: "test2", levels: ["debug"]});
        result = cachedAppenders.byLogLevel(levels().DEBUG);
        expect(result).to.be.an("array").lengthOf(2);
      });
    });
  });

  describe("has()", () => {
    it("should return true", () => {
      expect(appenders.has("custom")).to.be.true;
    });
    it("should return false", () => {
      expect(appenders.has("custom2")).to.be.false;
    });
  });

  describe("get()", () => {
    it("should return configuration", () => {
      expect(!!appenders.get("custom")).to.be.true;
    });
    it("should return false", () => {
      expect(!!appenders.get("custom2")).to.be.false;
    });
  });

  describe("forEach()", () => {
    let result: any;
    before(() => {
      result = [];
      appenders.forEach((o: any) => result.push(o));
    });
    it("should return all elements", () => {
      expect(result).to.be.an("array").and.length(1);
    });
  });

  describe("toArray()", () => {
    it("should return all elements", () => {
      expect(appenders.toArray()).to.be.an("array").and.length(1);
    });
  });

  describe("delete()", () => {
    before(() => {
      appenders.set("custom2", {type: "test2", levels: ["debug"]});
    });

    it("should return configuration", () => {
      expect(appenders.delete("custom2")).to.be.true;
    });
  });

  describe("clear()", () => {
    before(() => {
      appenders.clear();
    });

    after(() => {
      appenders.set("custom", {type: "test2", levels: ["debug"]});
    });

    it("should return configuration", () => {
      expect(appenders.size).to.eq(0);
    });
  });
});
