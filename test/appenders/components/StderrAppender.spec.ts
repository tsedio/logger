import {StderrAppender} from "../../../src/appenders/components/StderrAppender";
import {levels, LogEvent} from "../../../src";
import {Sinon} from "../../tools";

describe("StderrAppender", () => {
  let logEvent: any, appender: any;
  before(() => {
    logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
    appender = new StderrAppender({type: "console"});
    Sinon.stub(appender, "log");

    appender.write(logEvent);
  });

  after(() => {
    appender.log.restore();
  });

  it("should log something", () => {
    appender.log.should.have.been.calledOnce;
    appender.log.should.have.been.calledWithMatch("[DEBUG] [test] -");
  });
});
