import {ConsoleAppender} from "../../../src/appenders/components/ConsoleAppender";
import {levels, LogEvent} from "../../../src";
import {Sinon} from "../../tools";

describe("ConsoleAppender", () => {

    before(() => {
        this.logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
        this.appender = new ConsoleAppender({type: "console"});
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