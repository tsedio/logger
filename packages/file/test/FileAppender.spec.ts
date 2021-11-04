import * as Sinon from "sinon";
import {expect} from "chai";
import {levels, LogEvent} from "@tsed/logger";
import {FileAppender} from "../src";

describe("FileAppender", () => {
  it("should log something", () => {
    // GIVEN
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new FileAppender({type: "console", filename: "log.log"});

    const writeStub = Sinon.stub((appender as any).writer, "write");

    appender.write(logEvent);

    // WHEN
    appender.shutdown();
    appender.reopen();

    // THEN
    writeStub.should.have.been.called;
    expect(writeStub.getCall(0).args[0]).to.contains("[DEBUG] [test]");

    writeStub.restore();
  });

  it("Date rolling (should log something)", () => {
    // GIVEN
    const logEvent = new LogEvent("test", levels().DEBUG, [""], new Map() as any);
    const appender = new FileAppender({type: "console", filename: "log.log", pattern: ".yyyy-MM-dd"});

    const writeStub = Sinon.stub((appender as any).writer, "write");

    appender.write(logEvent);

    // WHEN
    appender.shutdown();
    appender.reopen();

    // THEN
    writeStub.should.have.been.called;
    expect(writeStub.getCall(0).args[0]).to.contains("[DEBUG] [test]");

    writeStub.restore();
  });
});
