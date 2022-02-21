import {PatternLayout} from "../../../src/layouts/components/PatternLayout";
import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {expect} from "chai";
import * as os from "os";
// @ts-ignore
import * as dateFormat from "date-format";

const EOL = os.EOL || "\n";

describe("PatternLayout", () => {
  let logEvent: any, layout: any, result: any;

  describe("when have data", () => {
    before(() => {
      layout = new PatternLayout({
        type: "pattern",
        pattern: "%d %p %c %x{user} %5.10p - %m%n",
        tokens: {
          user: (logEvent: LogEvent) => {
            return logEvent.context.get("user");
          }
        }
      });

      const context: any = new Map();
      context.set("user", "romain");
      logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      result = layout.transform(logEvent);
    });

    it("should return a formatted string", () => {
      expect(result).to.eq("2017-06-18T22:29:38.234 DEBUG category romain DEBUG - data\n");
    });
  });

  describe("when have an error", () => {
    before(() => {
      layout = new PatternLayout({
        type: "pattern",
        pattern: "%d %p %c %x{user} %5.10p - %m%n",
        tokens: {
          user: (logEvent: LogEvent) => {
            return logEvent.context.get("user");
          }
        }
      });

      const context: any = new Map();
      context.set("user", "romain");
      const logEvent = new LogEvent("multiple.levels.of.tests", levels().DEBUG, [new Error("test")], context);
      (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
      result = layout.transform(logEvent);
    });

    it("should return a formatted string", () => {
      expect(result).to.contain("Error: test");
    });
  });
  describe("layout test", () => {
    let tokens: any, testPattern: any;
    before(() => {
      tokens = {
        testString: "testStringToken",
        testFunction: function () {
          return "testFunctionToken";
        },
        fnThatUsesLogEvent: function (logEvent: any) {
          return logEvent.level.toString();
        }
      };
      const context: any = new Map();
      context.set("user", "romain");
      logEvent = new LogEvent("multiple.levels.of.tests", levels().DEBUG, ["this is a test"], context);
      logEvent._startTime = new Date("2017-06-18 22:29:38.234");

      testPattern = (tokens: any, pattern: any, value: any) => {
        const layout = new PatternLayout({
          type: "pattern",
          pattern,
          tokens
        });

        expect(layout.transform(logEvent)).to.eq(value);
      };
    });

    it("should default to `time logLevel loggerName - message`", () => {
      testPattern(tokens, null, `22:29:38 DEBUG multiple.levels.of.tests - this is a test${EOL}`);
    });

    it("%r should output time only", () => {
      testPattern(tokens, "%r", "22:29:38");
    });

    it("%p should output the log level", () => {
      testPattern(tokens, "%p", "DEBUG");
    });

    it("%j should output the json formatted data", () => {
      testPattern(tokens, "%j", "[\"this is a test\"]");
    });

    it("%c should output the log category", () => {
      testPattern(tokens, "%c", "multiple.levels.of.tests");
    });

    it("%m should output the log data", () => {
      testPattern(tokens, "%m", "this is a test");
    });

    it("%n should output a new line", () => {
      testPattern(tokens, "%n", EOL);
    });

    it("%h should output hostname", () => {
      testPattern(tokens, "%h", os.hostname().toString());
    });

    it("%z should output pid", () => {
      testPattern(tokens, "%z", process.pid.toString());
    });

    it("%c should handle category names like java-style package names", () => {
      testPattern(tokens, "%c{1}", "tests");
      testPattern(tokens, "%c{2}", "of.tests");
      testPattern(tokens, "%c{3}", "levels.of.tests");
      testPattern(tokens, "%c{4}", "multiple.levels.of.tests");
      testPattern(tokens, "%c{5}", "multiple.levels.of.tests");
      testPattern(tokens, "%c{99}", "multiple.levels.of.tests");
    });

    it("%d should output the date in ISO8601 format", () => {
      testPattern(tokens, "%d", "2017-06-18T22:29:38.234");
    });

    it("%d should allow for format specification", () => {
      testPattern(
        tokens,
        "%d{ISO8601_WITH_TZ_OFFSET}",
        dateFormat.asString(dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT, logEvent.startTime, undefined)
      );
      testPattern(tokens, "%d{ISO8601}", "2017-06-18T22:29:38.234");
      testPattern(tokens, "%d{ABSOLUTE}", "22:29:38.234");
      testPattern(tokens, "%d{DATE}", "18 06 2017 22:29:38.234");
      testPattern(tokens, "%d{yy MM dd hh mm ss}", "17 06 18 22 29 38");
      testPattern(tokens, "%d{yyyy MM dd}", "2017 06 18");
      testPattern(tokens, "%d{yyyy MM dd hh mm ss SSS}", "2017 06 18 22 29 38 234");
    });

    it("%% should output %", () => {
      testPattern(tokens, "%%", "%");
    });

    it("should output anything not preceded by % as literal", () => {
      testPattern(tokens, "blah blah blah", "blah blah blah");
    });

    it("should output the original string if no replacer matches the token", () => {
      testPattern(tokens, "%a{3}", "a{3}");
    });

    it("should handle complicated patterns", () => {
      testPattern(tokens, "%m%n %c{2} at %d{ABSOLUTE} cheese %p%n", `this is a test${EOL} of.tests at 22:29:38.234 cheese DEBUG${EOL}`);
    });

    it("should truncate fields if specified", () => {
      testPattern(tokens, "%.4m", "this");
      testPattern(tokens, "%.7m", "this is");
      testPattern(tokens, "%.9m", "this is a");
      testPattern(tokens, "%.14m", "this is a test");
      testPattern(tokens, "%.2919102m", "this is a test");
    });

    it("should pad fields if specified", () => {
      testPattern(tokens, "%10p", "     DEBUG");
      testPattern(tokens, "%8p", "   DEBUG");
      testPattern(tokens, "%6p", " DEBUG");
      testPattern(tokens, "%4p", "DEBUG");
      testPattern(tokens, "%-4p", "DEBUG");
      testPattern(tokens, "%-6p", "DEBUG ");
      testPattern(tokens, "%-8p", "DEBUG   ");
      testPattern(tokens, "%-10p", "DEBUG     ");
    });

    it("%[%r%] should output colored time", () => {
      testPattern(tokens, "%[%r%]", "\x1B[36m22:29:38\x1B[39m");
    });

    it("%x{testString} should output the string stored in tokens", () => {
      testPattern(tokens, "%x{testString}", "testStringToken");
    });

    it("%x{testFunction} should output the result of the function stored in tokens", () => {
      testPattern(tokens, "%x{testFunction}", "testFunctionToken");
    });

    it("%x{doesNotExist} should output the string stored in tokens", () => {
      testPattern(tokens, "%x{doesNotExist}", "null");
    });

    it("%x{fnThatUsesLogEvent} should be able to use the logEvent", () => {
      testPattern(tokens, "%x{fnThatUsesLogEvent}", "DEBUG");
    });

    it("%x should output the string stored in tokens", () => {
      testPattern(tokens, "%x", "null");
    });
  });
});
