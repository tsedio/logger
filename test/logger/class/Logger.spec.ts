import {assert, expect, Sinon} from "../../tools";
import {Layout, Logger} from "../../../src/index";
import {Appender} from "../../../src/appenders/decorators/appender";
import {BaseAppender} from "../../../src/appenders/class/BaseAppender";
import {BaseLayout} from "../../../src/layouts/class/BaseLayout";
import {LogEvent} from "../../../src/core/LogEvent";
import {LogLevel} from "../../../src/core/LogLevel";

@Layout({name: "test"})
class TestLayout extends BaseLayout {
    transform(loggingEvent: LogEvent, timezoneOffset?): string {

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

    before(() => {
        this.logger = new Logger();
        this.logger.name = "loggerName";
        this.logger.start();
        this.logger.appenders.push({type: "test", layout: {type: "test"}});
        this.transformStub = stub;
    });

    after(() => {

    });

    it("should return log name", () => {
        expect(this.logger.name).to.eq("loggerName");
    });

    it("should return context", () => {
        expect(this.logger.context).instanceof(Map);
    });

    it("should return level", () => {
        expect(this.logger.level).to.eq("ALL");
    });

    describe("debug()", () => {
        before(() => {
            this.logger.debug("test");
            this.arg = this.transformStub.getCall(0).args[0];
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.have.been.calledOnce;
        });

        it("should have a categoryName", () => {
            expect(this.arg.categoryName).to.eq("loggerName");
        });

        it("should have a logLevel", () => {
            expect(this.arg.level).instanceof(LogLevel);
            expect(this.arg.level.toString()).to.equal("DEBUG");
        });

        it("should have a data", () => {
            expect(this.arg.data).to.be.an("array").and.to.deep.eq(["test"]);
        });

        it("should have a startTime", () => {
            expect(this.arg.startTime).instanceof(Date);
        });

        it("should have a formatedLevel", () => {
            expect(this.arg.formatedLevel).to.eq("DEBUG");
        });

        it("should have a context", () => {
            expect(this.arg.context).instanceof(Map);
        });
    });

    describe("info()", () => {
        before(() => {
            this.logger.info("test");
            this.arg = this.transformStub.getCall(0).args[0];
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.have.been.calledOnce;
        });

        it("should have a categoryName", () => {
            expect(this.arg.categoryName).to.eq("loggerName");
        });

        it("should have a logLevel", () => {
            expect(this.arg.level).instanceof(LogLevel);
            expect(this.arg.level.toString()).to.equal("INFO");
        });

        it("should have a data", () => {
            expect(this.arg.data).to.be.an("array").and.to.deep.eq(["test"]);
        });

        it("should have a startTime", () => {
            expect(this.arg.startTime).instanceof(Date);
        });

        it("should have a formatedLevel", () => {
            expect(this.arg.formatedLevel).to.eq("INFO ");
        });

        it("should have a context", () => {
            expect(this.arg.context).instanceof(Map);
        });
    });

    describe("warn()", () => {
        before(() => {
            this.logger.warn("test");
            this.arg = this.transformStub.getCall(0).args[0];
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.have.been.calledOnce;
        });

        it("should have a categoryName", () => {
            expect(this.arg.categoryName).to.eq("loggerName");
        });

        it("should have a logLevel", () => {
            expect(this.arg.level).instanceof(LogLevel);
            expect(this.arg.level.toString()).to.equal("WARN");
        });

        it("should have a data", () => {
            expect(this.arg.data).to.be.an("array").and.to.deep.eq(["test"]);
        });

        it("should have a startTime", () => {
            expect(this.arg.startTime).instanceof(Date);
        });

        it("should have a formatedLevel", () => {
            expect(this.arg.formatedLevel).to.eq("WARN ");
        });

        it("should have a context", () => {
            expect(this.arg.context).instanceof(Map);
        });
    });

    describe("trace()", () => {
        before(() => {
            this.logger.trace("test");
            this.arg = this.transformStub.getCall(0).args[0];
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.have.been.calledOnce;
        });

        it("should have a categoryName", () => {
            expect(this.arg.categoryName).to.eq("loggerName");
        });

        it("should have a logLevel", () => {
            expect(this.arg.level).instanceof(LogLevel);
            expect(this.arg.level.toString()).to.equal("TRACE");
        });

        it("should have a data", () => {
            expect(this.arg.data).to.be.an("array").and.length(2);
        });

        it("should have a startTime", () => {
            expect(this.arg.startTime).instanceof(Date);
        });

        it("should have a formatedLevel", () => {
            expect(this.arg.formatedLevel).to.eq("TRACE");
        });

        it("should have a context", () => {
            expect(this.arg.context).instanceof(Map);
        });
    });

    describe("error()", () => {
        before(() => {
            this.logger.error("test");
            this.arg = this.transformStub.getCall(0).args[0];
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.have.been.calledOnce;
        });

        it("should have a categoryName", () => {
            expect(this.arg.categoryName).to.eq("loggerName");
        });

        it("should have a logLevel", () => {
            expect(this.arg.level).instanceof(LogLevel);
            expect(this.arg.level.toString()).to.equal("ERROR");
        });

        it("should have a data", () => {
            expect(this.arg.data).to.be.an("array").and.to.deep.eq(["test"]);
        });

        it("should have a startTime", () => {
            expect(this.arg.startTime).instanceof(Date);
        });

        it("should have a formatedLevel", () => {
            expect(this.arg.formatedLevel).to.eq("ERROR");
        });

        it("should have a context", () => {
            expect(this.arg.context).instanceof(Map);
        });
    });

    describe("fatal()", () => {
        before(() => {
            this.logger.fatal("test");
            this.arg = this.transformStub.getCall(0).args[0];
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.have.been.calledOnce;
        });

        it("should have a categoryName", () => {
            expect(this.arg.categoryName).to.eq("loggerName");
        });

        it("should have a logLevel", () => {
            expect(this.arg.level).instanceof(LogLevel);
            expect(this.arg.level.toString()).to.equal("FATAL");
        });

        it("should have a data", () => {
            expect(this.arg.data).to.be.an("array").and.to.deep.eq(["test"]);
        });

        it("should have a startTime", () => {
            expect(this.arg.startTime).instanceof(Date);
        });

        it("should have a formatedLevel", () => {
            expect(this.arg.formatedLevel).to.eq("FATAL");
        });

        it("should have a context", () => {
            expect(this.arg.context).instanceof(Map);
        });
    });

    describe("stop()", () => {
        before(() => {
            this.logger.stop();
            this.logger.fatal("test");
            this.logger.start();
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.not.have.been.called;
        });
    });

    describe("printTable()", () => {
        before(() => {
            this.logger.printTable([
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
            ], {
                padding: 2,
                header: {
                    field1: "FIELD 1",
                    field2: "FIELD 2"
                }
            });
        });
        after(() => {
            this.transformStub.reset();
        });

        it("should call layout", () => {
            this.transformStub.should.been.called;
        });
    });

    describe("when appender doesn't exists", () => {
        it("should throw an error", () => {
            assert.throws(() => this.logger.appenders.push({type: "unknow"}), "");
        });
    });

});