import {assert, expect} from "../../tools";
import {LoggerAppenders} from "../../../src/logger/class/LoggerAppenders";
import {Appender} from "../../../src";
import {BaseAppender} from "../../../src/appenders/class/BaseAppender";
import {LogEvent} from "../../../src/core/LogEvent";
import {levels} from "../../../src/core/LogLevel";

@Appender({name: "test2"})
class TestAppender extends BaseAppender {
    write(loggingEvent: LogEvent) {

    }
}

describe("LoggerAppenders", () => {
    before(() => {
        this.appenders = new LoggerAppenders();
        this.appenders = new LoggerAppenders();
        this.appenders.set("custom", {type: "test2", levels: ["debug"]});
    });

    describe("byLogLevel()", () => {
        before(() => {
            this.result = this.appenders.byLogLevel(levels().DEBUG);
        });

        describe("when appender exists", () => {
            it("should returns all appenders for a given level", () => {
                expect(this.result).to.be.an("array");
                expect(this.result[0]).instanceof(TestAppender);
            });
        });

        describe("when appender doesn't exists", () => {
            it("should throw an error", () => {
                assert.throws(() => this.appenders.set("unknow", {type: "unknow"}), "");
            });
        });
    });


    describe("has()", () => {
        it("should return true", () => {
            expect(this.appenders.has("custom")).to.be.true;
        });
        it("should return false", () => {
            expect(this.appenders.has("custom2")).to.be.false;
        });
    });

    describe("get()", () => {
        it("should return configuration", () => {
            expect(!!this.appenders.get("custom")).to.be.true;
        });
        it("should return false", () => {
            expect(!!this.appenders.get("custom2")).to.be.false;
        });
    });

    describe("forEach()", () => {
        before(() => {
            this.result = [];
            this.appenders.forEach(o => this.result.push(o));
        });
        it("should return all elements", () => {
            expect(this.result).to.be.an("array").and.length(1);
        });
    });

    describe("toArray()", () => {
        it("should return all elements", () => {
            expect(this.appenders.toArray()).to.be.an("array").and.length(1);
        });
    });

    describe("delete()", () => {
        before(() => {
            this.appenders.set("custom2", {type: "test2", levels: ["debug"]});
        });

        it("should return configuration", () => {
            expect(this.appenders.delete("custom2")).to.be.true;
        });
    });

    describe("clear()", () => {
        before(() => {
            this.appenders.clear();
        });

        after(() => {
            this.appenders.set("custom", {type: "test2", levels: ["debug"]});
        });

        it("should return configuration", () => {
            expect(this.appenders.size).to.eq(0);
        });
    });


});