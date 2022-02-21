import {Appender, BaseAppender, BaseLayout, Layout, LogEvent, Logger, LogLevel} from "@tsed/logger";
import * as Sinon from "sinon";
import {assert, expect} from "chai";

@Layout({name: "test"})
class TestLayout extends BaseLayout {
  transform(loggingEvent: LogEvent, timezoneOffset?: number): any {
    return null;
  }
}

const stub = Sinon.stub();

@Appender({name: "test"})
class TestAppender extends BaseAppender {
  write(loggingEvent: LogEvent) {
    stub(loggingEvent);
  }
}

describe("Logger", () => {
  let logger: Logger;
  before(() => {
    logger = new Logger();
    logger.name = "loggerName";
    logger.start();
    logger.appenders.set("custom", {type: "test", layout: {type: "test"}});
  });

  it("should return log name", () => {
    expect(logger.name).to.eq("loggerName");
  });

  it("should return context", () => {
    expect(logger.context).instanceof(Map);
  });

  it("should return level", () => {
    expect(logger.level).to.eq("ALL");
  });

  describe("debug()", () => {
    let arg: any;
    before(() => {
      logger.debug("test");
      arg = stub.getCall(0).args[0];
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.have.been.calledOnce;
    });

    it("should have a categoryName", () => {
      expect(arg.categoryName).to.eq("loggerName");
    });

    it("should have a logLevel", () => {
      expect(arg.level).instanceof(LogLevel);
      expect(arg.level.toString()).to.equal("DEBUG");
    });

    it("should have a data", () => {
      expect(arg.data).to.be.an("array").and.to.deep.eq(["test"]);
    });

    it("should have a startTime", () => {
      expect(arg.startTime).instanceof(Date);
    });

    it("should have a formatedLevel", () => {
      expect(arg.formatedLevel).to.eq("DEBUG");
    });

    it("should have a context", () => {
      expect(arg.context).instanceof(Map);
    });
  });

  describe("info()", () => {
    let arg: any;
    before(() => {
      logger.info("test");
      arg = stub.getCall(0).args[0];
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.have.been.calledOnce;
    });

    it("should have a categoryName", () => {
      expect(arg.categoryName).to.eq("loggerName");
    });

    it("should have a logLevel", () => {
      expect(arg.level).instanceof(LogLevel);
      expect(arg.level.toString()).to.equal("INFO");
    });

    it("should have a data", () => {
      expect(arg.data).to.be.an("array").and.to.deep.eq(["test"]);
    });

    it("should have a startTime", () => {
      expect(arg.startTime).instanceof(Date);
    });

    it("should have a formatedLevel", () => {
      expect(arg.formatedLevel).to.eq("INFO ");
    });

    it("should have a context", () => {
      expect(arg.context).instanceof(Map);
    });
  });

  describe("warn()", () => {
    let arg: any;
    before(() => {
      logger.warn("test");
      arg = stub.getCall(0).args[0];
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.have.been.calledOnce;
    });

    it("should have a categoryName", () => {
      expect(arg.categoryName).to.eq("loggerName");
    });

    it("should have a logLevel", () => {
      expect(arg.level).instanceof(LogLevel);
      expect(arg.level.toString()).to.equal("WARN");
    });

    it("should have a data", () => {
      expect(arg.data).to.be.an("array").and.to.deep.eq(["test"]);
    });

    it("should have a startTime", () => {
      expect(arg.startTime).instanceof(Date);
    });

    it("should have a formatedLevel", () => {
      expect(arg.formatedLevel).to.eq("WARN ");
    });

    it("should have a context", () => {
      expect(arg.context).instanceof(Map);
    });
  });

  describe("trace()", () => {
    let arg: any;
    before(() => {
      logger.trace("test");
      arg = stub.getCall(0).args[0];
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.have.been.calledOnce;
    });

    it("should have a categoryName", () => {
      expect(arg.categoryName).to.eq("loggerName");
    });

    it("should have a logLevel", () => {
      expect(arg.level).instanceof(LogLevel);
      expect(arg.level.toString()).to.equal("TRACE");
    });

    it("should have a data", () => {
      expect(arg.data).to.be.an("array").and.length(2);
    });

    it("should have a startTime", () => {
      expect(arg.startTime).instanceof(Date);
    });

    it("should have a formatedLevel", () => {
      expect(arg.formatedLevel).to.eq("TRACE");
    });

    it("should have a context", () => {
      expect(arg.context).instanceof(Map);
    });
  });

  describe("error()", () => {
    let arg: any;
    before(() => {
      logger.error("test");
      arg = stub.getCall(0).args[0];
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.have.been.calledOnce;
    });

    it("should have a categoryName", () => {
      expect(arg.categoryName).to.eq("loggerName");
    });

    it("should have a logLevel", () => {
      expect(arg.level).instanceof(LogLevel);
      expect(arg.level.toString()).to.equal("ERROR");
    });

    it("should have a data", () => {
      expect(arg.data).to.be.an("array").and.to.deep.eq(["test"]);
    });

    it("should have a startTime", () => {
      expect(arg.startTime).instanceof(Date);
    });

    it("should have a formatedLevel", () => {
      expect(arg.formatedLevel).to.eq("ERROR");
    });

    it("should have a context", () => {
      expect(arg.context).instanceof(Map);
    });
  });

  describe("fatal()", () => {
    let arg: any;
    before(() => {
      logger.fatal("test");
      arg = stub.getCall(0).args[0];
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.have.been.calledOnce;
    });

    it("should have a categoryName", () => {
      expect(arg.categoryName).to.eq("loggerName");
    });

    it("should have a logLevel", () => {
      expect(arg.level).instanceof(LogLevel);
      expect(arg.level.toString()).to.equal("FATAL");
    });

    it("should have a data", () => {
      expect(arg.data).to.be.an("array").and.to.deep.eq(["test"]);
    });

    it("should have a startTime", () => {
      expect(arg.startTime).instanceof(Date);
    });

    it("should have a formatedLevel", () => {
      expect(arg.formatedLevel).to.eq("FATAL");
    });

    it("should have a context", () => {
      expect(arg.context).instanceof(Map);
    });
  });

  describe("stop()", () => {
    before(() => {
      logger.stop();
      logger.fatal("test");
      logger.start();
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.not.have.been.called;
    });
  });

  describe("printTable()", () => {
    before(() => {
      logger.printTable(
        [
          {
            field1: "Test1",
            field2: "Test2",
            field3: "Test3"
          },

          {
            field1: "Test1",
            field2: "Test2",
            field3: "Test3"
          },

          {
            field1: "Test1",
            field2: "Test2",
            field3: "Test3"
          }
        ],
        {
          padding: 2,
          header: {
            field1: "FIELD 1",
            field2: "FIELD 2"
          }
        }
      );
    });
    after(() => {
      stub.reset();
    });

    it("should call layout", () => {
      stub.should.been.called;
    });
  });

  describe("shutdown()", () => {
    it("should stop logger", async () => {
      logger = new Logger();
      logger.name = "loggerName";
      logger.start();
      logger.appenders.set("custom", {type: "test", layout: {type: "test"}});

      await logger.shutdown();
    });
  });

  describe("when appender doesn't exists", () => {
    it("should throw an error", () => {
      // @ts-ignore
      assert.throws(() => logger.appenders.push({type: "unknown"}), "");
    });
  });
});
