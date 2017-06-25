import {expect, Sinon} from "../../tools";
import {BaseAppender, LogEvent} from "../../../src";
import {levels} from "../../../src/core/LogLevel";

const buildStub = Sinon.stub();
class TestAppender extends BaseAppender {

    write(loggingEvent: LogEvent) {
        this.layout(loggingEvent);
    }

    build() {
        buildStub();
    }
}

describe("BaseAppender", () => {

    before(() => {
        this.logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
        this.testAppender = new TestAppender({type: "console"});
        this.testAppender.write(this.logEvent);
    });

    describe("build()", () => {
        it("should have been called", () =>
            buildStub.should.have.been.calledOnce
        );
    });


    describe("config()", () => {
        it("should return configuration", () => {
            expect(this.testAppender.config).to.deep.eq({type: "console"});
        });
    });

});