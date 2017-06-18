import {assert, expect} from "../../tools";
import {LoggerAppenders} from "../../../src/logger/class/LoggerAppenders";
import {Appender} from "../../../src";
import {BaseAppender} from "../../../src/appenders/class/BaseAppender";
import {LogEvent} from "../../../src/core/LogEvent";
import {LogLevel} from "../../../src/core/LogLevel";

@Appender({name: "test2"})
class TestAppender extends BaseAppender {
    write(loggingEvent: LogEvent) {

    }
}

describe("LoggerAppenders", () => {
    before(() => {
        this.appenders = new LoggerAppenders();
        this.appenders.push({type: "test2", levels: ["debug"]});
        this.result = this.appenders.byLogLevel(LogLevel.levels().DEBUG);
    });

    describe("when appender exists", () => {
        it("should returns all appenders for a given level", () => {
            expect(this.result).to.be.an("array");
            expect(this.result[0]).instanceof(TestAppender);
        });

        it("should return the appender", () => {
            expect(this.appenders.get("test2")).instanceof(TestAppender);
        });
    });

    describe("when appender doesn't exists", () => {
        it("should throw an error", () => {
            assert.throws(() => this.appenders.push({type: "unknow"}), "");
        });
    });
});