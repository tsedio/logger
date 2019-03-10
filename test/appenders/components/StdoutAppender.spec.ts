import {StdoutAppender} from "../../../src/appenders/components/StdoutAppender";
import {levels, LogEvent} from "../../../src";
import {Sinon} from "../../tools";

describe("StdoutAppender", () => {
  before(() => {
    this.logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
    this.appender = new StdoutAppender({type: "console"});
    this.logStub = Sinon.stub(this.appender, "log");

    this.appender.write(this.logEvent);
  });

  after(() => {
    this.logStub.restore();
  });

  it("should log something", () => {
    this.logStub.should.have.been.calledOnce;
    this.logStub.should.have.been.calledWithMatch("[DEBUG] [test] -");
  });
});
