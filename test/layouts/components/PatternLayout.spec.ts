import {PatternLayout} from "../../../src/layouts/components/PatternLayout";
import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";
import {expect} from "../../tools";

const os = require("os");
const semver = require("semver");
const dateFormat = require("date-format");

const EOL = os.EOL || "\n";

describe("PatternLayout", () => {

  describe("when have data", () => {

    before(() => {

      this.layout = new PatternLayout({
        type: "pattern",
        pattern: "%d %p %c %x{user} %5.10p - %m%n",
        tokens: {
          user: (logEvent: LogEvent) => {
            return logEvent.context.get("user");
          }
        }
      });

      const context = new Map();
      context.set("user", "romain");
      this.logEvent = new LogEvent("category", levels().DEBUG, ["data"], context);
      this.logEvent._startTime = new Date("2017-06-18 22:29:38.234");
      this.result = this.layout.transform(this.logEvent);
    });


    it("should return a formated string", () => {
      expect(this.result).to.eq("2017-06-18T22:29:38.234 DEBUG category romain DEBUG - data\n");
    });
  });

  describe("when have an error", () => {
    before(() => {

      this.layout = new PatternLayout({
        type: "pattern",
        pattern: "%d %p %c %x{user} %5.10p - %m%n",
        tokens: {
          user: (logEvent: LogEvent) => {
            return logEvent.context.get("user");
          }
        }
      });

      const context = new Map();
      context.set("user", "romain");
      const logEvent = new LogEvent("multiple.levels.of.tests", levels().DEBUG, [new Error("test")], context);
      (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
      this.result = this.layout.transform(logEvent);
    });


    it("should return a formated string", () => {
      expect(this.result).to.contain("Error: test");
    });
  });

  describe("layout test", () => {
    before(() => {
      this.tokens = {
        testString: "testStringToken",
        testFunction: function () {
          return "testFunctionToken";
        },
        fnThatUsesLogEvent: function (logEvent: any) {
          return logEvent.level.toString();
        }
      };
      const context = new Map();
      context.set("user", "romain");
      this.logEvent = new LogEvent("multiple.levels.of.tests", levels().DEBUG, ["this is a test"], context);
      this.logEvent._startTime = new Date("2017-06-18 22:29:38.234");

      this.testPattern = (tokens: any, pattern: any, value: any) => {

        const layout = new PatternLayout({
          type: "pattern",
          pattern,
          tokens
        });

        expect(layout.transform(this.logEvent)).to.eq(value);
      };

    });


    it("should default to \"time logLevel loggerName - message\"", () => {
      this.testPattern(this.tokens, null, `22:29:38 DEBUG multiple.levels.of.tests - this is a test${EOL}`);
    });

    it("%r should output time only", () => {
      this.testPattern(this.tokens, "%r", "22:29:38");
    });

    it("%p should output the log level", () => {
      this.testPattern(this.tokens, "%p", "DEBUG");
    });

    it("%c should output the log category", () => {
      this.testPattern(this.tokens, "%c", "multiple.levels.of.tests");
    });

    it("%m should output the log data", () => {
      this.testPattern(this.tokens, "%m", "this is a test");
    });

    it("%n should output a new line", () => {
      this.testPattern(this.tokens, "%n", EOL);
    });

    it("%h should output hostname", () => {
      this.testPattern(this.tokens, "%h", os.hostname().toString());
    });

    it("%z should output pid", () => {
      this.testPattern(this.tokens, "%z", process.pid.toString());
    });

    it("%c should handle category names like java-style package names", () => {
      this.testPattern(this.tokens, "%c{1}", "tests");
      this.testPattern(this.tokens, "%c{2}", "of.tests");
      this.testPattern(this.tokens, "%c{3}", "levels.of.tests");
      this.testPattern(this.tokens, "%c{4}", "multiple.levels.of.tests");
      this.testPattern(this.tokens, "%c{5}", "multiple.levels.of.tests");
      this.testPattern(this.tokens, "%c{99}", "multiple.levels.of.tests");
    });

    it("%d should output the date in ISO8601 format", () => {
      this.testPattern(this.tokens, "%d", "2017-06-18T22:29:38.234");
    });

    it("%d should allow for format specification", () => {
      this.testPattern(this.tokens, "%d{ISO8601_WITH_TZ_OFFSET}", dateFormat.asString(dateFormat.ISO8601_WITH_TZ_OFFSET_FORMAT, this.logEvent.startTime, this.timezoneOffset));
      this.testPattern(this.tokens, "%d{ISO8601}", "2017-06-18T22:29:38.234");
      this.testPattern(this.tokens, "%d{ABSOLUTE}", "22:29:38.234");
      this.testPattern(this.tokens, "%d{DATE}", "18 06 2017 22:29:38.234");
      this.testPattern(this.tokens, "%d{yy MM dd hh mm ss}", "17 06 18 22 29 38");
      this.testPattern(this.tokens, "%d{yyyy MM dd}", "2017 06 18");
      this.testPattern(this.tokens, "%d{yyyy MM dd hh mm ss SSS}", "2017 06 18 22 29 38 234");
    });

    it("%% should output %", () => {
      this.testPattern(this.tokens, "%%", "%");
    });

    it("should output anything not preceded by % as literal", () => {
      this.testPattern(this.tokens, "blah blah blah", "blah blah blah");
    });

    it("should output the original string if no replacer matches the token", () => {
      this.testPattern(this.tokens, "%a{3}", "a{3}");
    });

    it("should handle complicated patterns", () => {
      this.testPattern(this.tokens,
        "%m%n %c{2} at %d{ABSOLUTE} cheese %p%n",
        `this is a test${EOL} of.tests at 22:29:38.234 cheese DEBUG${EOL}`
      );
    });

    it("should truncate fields if specified", () => {
      this.testPattern(this.tokens, "%.4m", "this");
      this.testPattern(this.tokens, "%.7m", "this is");
      this.testPattern(this.tokens, "%.9m", "this is a");
      this.testPattern(this.tokens, "%.14m", "this is a test");
      this.testPattern(this.tokens, "%.2919102m", "this is a test");
    });

    it("should pad fields if specified", () => {
      this.testPattern(this.tokens, "%10p", "     DEBUG");
      this.testPattern(this.tokens, "%8p", "   DEBUG");
      this.testPattern(this.tokens, "%6p", " DEBUG");
      this.testPattern(this.tokens, "%4p", "DEBUG");
      this.testPattern(this.tokens, "%-4p", "DEBUG");
      this.testPattern(this.tokens, "%-6p", "DEBUG ");
      this.testPattern(this.tokens, "%-8p", "DEBUG   ");
      this.testPattern(this.tokens, "%-10p", "DEBUG     ");
    });

    it("%[%r%] should output colored time", () => {
      this.testPattern(this.tokens, "%[%r%]", "\x1B[36m22:29:38\x1B[39m");
    });

    it("%x{testString} should output the string stored in tokens", () => {
      this.testPattern(this.tokens, "%x{testString}", "testStringToken");
    });

    it("%x{testFunction} should output the result of the function stored in tokens", () => {
      this.testPattern(this.tokens, "%x{testFunction}", "testFunctionToken");
    });

    it("%x{doesNotExist} should output the string stored in tokens", () => {
      this.testPattern(this.tokens, "%x{doesNotExist}", "null");
    });

    it("%x{fnThatUsesLogEvent} should be able to use the logEvent", () => {
      this.testPattern(this.tokens, "%x{fnThatUsesLogEvent}", "DEBUG");
    });

    it("%x should output the string stored in tokens", () => {
      this.testPattern(this.tokens, "%x", "null");
    });
  });


});
