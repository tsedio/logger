import {LogEvent} from "../../../src/core/LogEvent";
import {LogLevel} from "../../../src/core/LogLevel";
import {expect} from "../../tools";
import {JsonLayout} from "../../../src/layouts/components/JsonLayout";

describe("JsonLayout", () => {

    describe("when seperator is given", () => {
        before(() => {

            this.layout = new JsonLayout({
                type: "json",
                separator: ","
            });

            const context = new Map();
            context.set("user", "romain");
            this.logEvent = new LogEvent("category", LogLevel.levels().DEBUG, ["data"], context);
            this.logEvent._startTime = new Date("2017-06-18 22:29:38.234");
            this.result = this.layout.transform(this.logEvent);
        });


        it("should return a formated string", () => {
            expect(this.result).to.eq(JSON.stringify({
                    "startTime": this.logEvent._startTime,
                    "categoryName": "category",
                    "level": "DEBUG",
                    "data": ["data"],
                    "context": {}
                }) + ",");
        });
    });

    describe("when seperator isn't given", () => {
        before(() => {

            this.layout = new JsonLayout({
                type: "json"
            });

            const context = new Map();
            context.set("user", "romain");
            this.logEvent = new LogEvent("category", LogLevel.levels().DEBUG, ["data"], context);
            this.logEvent._startTime = new Date("2017-06-18 22:29:38.234");
            this.result = this.layout.transform(this.logEvent);
        });


        it("should return a formated string", () => {
            expect(this.result).to.eq(JSON.stringify({
                "startTime": this.logEvent._startTime,
                "categoryName": "category",
                "level": "DEBUG",
                "data": ["data"],
                "context": {}
            }));
        });
    });
});