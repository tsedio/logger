import {FileAppender} from "../../../src/appenders/components/FileAppender";
import {levels, LogEvent} from "../../../src";
import {expect, Sinon} from "../../tools";

const streams = require("streamroller");

describe("FileAppender", () => {
  before(() => {
    this.logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
    this.appender = new FileAppender({type: "console", filename: "log.log"});
    this.logStub = Sinon.stub(this.appender.writer, "write");

    this.appender.write(this.logEvent);

    this.appender.shutdown();
    this.appender.reopen();
  });

  after(() => {
    this.logStub.restore();
  });

  it("should log something", () => {
    this.logStub.should.have.been.called;
    expect(this.logStub.getCall(0).args[0]).to.contains("[DEBUG] [test]");
  });

});
