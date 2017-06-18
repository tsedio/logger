import {LogEvent} from "../../../src/core/LogEvent";
import {LogLevel} from "../../../src/core/LogLevel";
import {expect} from "../../tools";
import {DummyLayout} from "../../../src/layouts/components/DummyLayout";

describe("DummyLayout", () => {

    before(() => {

        this.layout = new DummyLayout({
            type: "dummy"
        });

        const context = new Map();
        context.set("user", "romain");
        const logEvent = new LogEvent("category", LogLevel.levels().DEBUG, ["data"], context);
        (logEvent as any)._startTime = new Date("2017-06-18 22:29:38.234");
        this.result = this.layout.transform(logEvent);
    });


    it("should return a formated string", () => {
        expect(this.result).to.eq("data");
    });


});