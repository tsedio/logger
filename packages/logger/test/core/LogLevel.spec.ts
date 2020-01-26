import {levels, LogLevel} from "../../src/core/LogLevel";
import {expect} from "chai";

describe("LogLevel", () => {
  it("should define some levels", () => {
    expect(!!levels().ALL).to.true;
    expect(!!levels().TRACE).to.true;
    expect(!!levels().DEBUG).to.true;
    expect(!!levels().INFO).to.true;
    expect(!!levels().WARN).to.true;
    expect(!!levels().ERROR).to.true;
    expect(!!levels().FATAL).to.true;
    expect(!!levels().MARK).to.true;
    expect(!!levels().OFF).to.true;
  });

  describe("isLessThanOrEqualTo()", () => {
    it("should to be true (1)", () => {
      expect(levels().ALL.isLessThanOrEqualTo(levels().TRACE)).to.be.true;
    });

    it("should to be false (2)", () => {
      expect(levels().OFF.isLessThanOrEqualTo(levels().FATAL)).to.be.false;
    });

    it("should to be true (3)", () => {
      expect(levels().ALL.isLessThanOrEqualTo("trace")).to.be.true;
    });
  });

  describe("isGreaterThanOrEqualTo()", () => {
    it("should to be false (1)", () => {
      expect(levels().ALL.isGreaterThanOrEqualTo(levels().TRACE)).to.be.false;
    });

    it("should to be true (2)", () => {
      expect(levels().OFF.isGreaterThanOrEqualTo(levels().TRACE)).to.be.true;
    });

    it("should to be true (3)", () => {
      expect(levels().OFF.isGreaterThanOrEqualTo("fatal")).to.be.true;
    });
  });

  describe("isEqualTo()", () => {
    it("should to be true (1)", () => {
      expect(levels().ALL.isEqualTo(levels().ALL)).to.be.true;
    });

    it("should to be false (2)", () => {
      expect(levels().ALL.isEqualTo(levels().FATAL)).to.be.false;
    });

    it("should to be false (3)", () => {
      expect(levels().ALL.isEqualTo("all")).to.be.true;
    });
  });

  describe("getLevel()", () => {
    it("should return level (1)", () => {
      expect(LogLevel.getLevel(levels().ALL)).to.equal(levels().ALL);
    });

    it("should return level (1)", () => {
      expect(LogLevel.getLevel("all")).to.equal(levels().ALL);
    });

    it("should return level (2)", () => {
      expect(LogLevel.getLevel({toString: () => "all"})).to.equal(levels().ALL);
    });
  });
});
