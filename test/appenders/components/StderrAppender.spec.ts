import {StderrAppender} from "../../../src/appenders/components/StderrAppender";
import {levels, LogEvent} from "../../../src";
import {Sinon} from "../../tools";

describe("StderrAppender", () => {

    before(() => {
        this.logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
        this.appender = new StderrAppender({type: "console"});
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