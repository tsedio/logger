import {BaseAppender, LogEvent} from "../../../src";
import {levels} from "../../../src/core/LogLevel";
import * as Sinon from "sinon";
import {expect} from "chai";

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
  let logEvent: any;
  let testAppender: any;
  before(() => {
    logEvent = new LogEvent("test", levels().DEBUG, [""], new Map());
    testAppender = new TestAppender({type: "console"});
    testAppender.write(logEvent);
  });

  describe("build()", () => {
    it("should have been called", () => buildStub.should.have.been.calledOnce);
  });

  describe("config()", () => {
    it("should return configuration", () => {
      expect(testAppender.config).to.deep.eq({type: "console"});
    });
  });
});
