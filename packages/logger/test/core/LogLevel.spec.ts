import {levels, LogLevel} from "../../src/core/LogLevel";

describe("LogLevel", () => {
  it("should define some levels", () => {
    expect(!!levels().ALL).toBe(true);
    expect(!!levels().TRACE).toBe(true);
    expect(!!levels().DEBUG).toBe(true);
    expect(!!levels().INFO).toBe(true);
    expect(!!levels().WARN).toBe(true);
    expect(!!levels().ERROR).toBe(true);
    expect(!!levels().FATAL).toBe(true);
    expect(!!levels().MARK).toBe(true);
    expect(!!levels().OFF).toBe(true);
  });

  describe("isLessThanOrEqualTo()", () => {
    it("should to be true (1)", () => {
      expect(levels().ALL.isLessThanOrEqualTo(levels().TRACE)).toBe(true);
    });

    it("should to be false (2)", () => {
      expect(levels().OFF.isLessThanOrEqualTo(levels().FATAL)).toBe(false);
    });

    it("should to be true (3)", () => {
      expect(levels().ALL.isLessThanOrEqualTo("trace")).toBe(true);
    });
  });

  describe("isGreaterThanOrEqualTo()", () => {
    it("should to be false (1)", () => {
      expect(levels().ALL.isGreaterThanOrEqualTo(levels().TRACE)).toBe(false);
    });

    it("should to be true (2)", () => {
      expect(levels().OFF.isGreaterThanOrEqualTo(levels().TRACE)).toBe(true);
    });

    it("should to be true (3)", () => {
      expect(levels().OFF.isGreaterThanOrEqualTo("fatal")).toBe(true);
    });
  });

  describe("isEqualTo()", () => {
    it("should to be true (1)", () => {
      expect(levels().ALL.isEqualTo(levels().ALL)).toBe(true);
    });

    it("should to be false (2)", () => {
      expect(levels().ALL.isEqualTo(levels().FATAL)).toBe(false);
    });

    it("should to be false (3)", () => {
      expect(levels().ALL.isEqualTo("all")).toBe(true);
    });
  });

  describe("getLevel()", () => {
    it("should return level (1)", () => {
      expect(LogLevel.getLevel(levels().ALL)).toEqual(levels().ALL);
    });

    it("should return level (1)", () => {
      expect(LogLevel.getLevel("all")).toEqual(levels().ALL);
    });

    it("should return level (2)", () => {
      expect(LogLevel.getLevel({toString: () => "all"})).toEqual(levels().ALL);
    });
  });
});
