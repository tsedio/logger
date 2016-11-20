"use strict";
var LogColors_1 = require("./LogColors");
var util = require('util');
var colors = require('colors/safe');
var Logger = (function () {
    /**
     *
     * @param options
     * @param stderr
     * @param noColors
     */
    function Logger(options, stderr, noColors) {
        /**
         * noColors
         * @type {boolean}
         */
        this.noColors = false;
        /**
         * printDate
         * @type {boolean}
         */
        this.printDate = false;
        /**
         *
         * @type {boolean}
         */
        this.logEnable = true;
        /**
         *
         * @type {{info: boolean, debug: boolean, trace: boolean, error: boolean, warn: boolean}}
         */
        this.repporting = {
            info: true,
            debug: true,
            trace: true,
            error: true,
            warn: true,
        };
        this.setStderr(stderr || process.stderr);
        this.setStdout(process.stdout);
        if (typeof options === "object") {
            if (typeof options.write === "function") {
                var stdout = options;
                this.setStdout(stdout);
            }
            else {
                this.setSettings(options);
            }
        }
        if (noColors !== undefined) {
            this.setNoColors(noColors);
        }
        this.previousStd = this.stdout;
    }
    /**
     * Prints to stdout with newline. Multiple arguments can be passed, with the first used as the primary message and all additional used as substitution values similar to printf() (the arguments are all passed to util.format()).
     * @param args
     * @returns {any}
     */
    Logger.prototype.debug = function (data) {
        //if(!this.repporting.debug) return this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.write(this.stdout, 'DEBUG', data, args);
    };
    /**
     *
     * @param args
     * @returns {any}
     */
    Logger.prototype.info = function (data) {
        //if(!this.repporting.info) return this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.write(this.stdout, 'INFO', data, args);
    };
    /**
     *
     * @param args
     * @returns {any}
     */
    Logger.prototype.warn = function (data) {
        //if(!this.repporting.warn) return this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.write(this.stderr, 'WARN', data, args);
    };
    /**
     * Prints to stderr with newline. Multiple arguments can be passed, with the first used as the primary
     * message and all additional used as substitution values similar to printf() (the arguments are all
     * passed to util.format()).
     * @param args
     * @returns {any}
     */
    Logger.prototype.error = function (data) {
        //if(!this.repporting.error) return this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.write(this.stderr, "ERROR", data, args);
    };
    /**
     *
     * @param data
     * @param args
     * @returns {any}
     */
    Logger.prototype.trace = function (data) {
        //if(!this.repporting.trace) return this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var stack = '\n' + this.colorize(Logger.createStack(), LogColors_1.LOG_COLORS.TRACE) + "\n";
        args.push(stack); //push StackTrace
        return this.write(this.stderr, "TRACE", data, args);
    };
    /**
     *
     * @returns {Logger}
     */
    Logger.prototype.withTrace = function () {
        if (!this.logEnable)
            return this;
        if (this.repporting[this.previousTypeTrace] === false)
            return this;
        this.previousStd.write(this.colorize(Logger.createStack(), "gray") + '\n\n');
        return this;
    };
    /**
     *
     * @returns {Logger}
     */
    Logger.prototype.withLine = function () {
        if (!this.logEnable)
            return this;
        if (this.repporting[this.previousTypeTrace] === false)
            return this;
        var stackTrace = Logger.createStack();
        var stackLine = stackTrace.split('\n')[0];
        /* istanbul ignore else */
        if (stackLine.indexOf('(') > -1) {
            var line = '\tat (' + stackTrace.split('\n')[0].split('(')[1];
        }
        else {
            line = stackLine;
        }
        this.previousStd.write((this.colorize(line, "gray") || line) + '\n\n');
        return this;
    };
    /**
     *
     */
    Logger.prototype.start = function () {
        this.logEnable = true;
        return this;
    };
    /**
     *
     */
    Logger.prototype.stop = function () {
        this.logEnable = false;
        return this;
    };
    /**
     *
     * @param value
     * @returns {Logger}
     */
    Logger.prototype.setNoColors = function (value) {
        this.noColors = value;
        return this;
    };
    /**
     *
     * @param std
     * @returns {Logger}
     */
    Logger.prototype.setStdout = function (std) {
        this.stdout = std;
        return this;
    };
    /**
     *
     * @param std
     * @returns {Logger}
     */
    Logger.prototype.setStderr = function (std) {
        this.stderr = std;
        return this;
    };
    /**
     *
     * @param std
     * @param name
     * @param data
     * @param args
     * @returns {Logger}
     */
    Logger.prototype.write = function (std, name, data, args) {
        this.previousTypeTrace = name.toLocaleLowerCase();
        this.previousStd = std;
        if (this.logEnable === false)
            return this;
        if (this.repporting[this.previousTypeTrace] === false)
            return this;
        var date = '';
        if (this.printDate) {
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            var day = ('0' + (currentDate.getDate())).slice(-2);
            var hours = ('0' + (currentDate.getHours())).slice(-2);
            var minutes = ('0' + (currentDate.getMinutes())).slice(-2);
            var seconds = ('0' + (currentDate.getSeconds())).slice(-2);
            date = "[" + year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds + "]";
        }
        name = this.colorize(date + '[' + (name + ' ').slice(0, 5) + ']', LogColors_1.LOG_COLORS[name]);
        var message = Logger.createMessage(data, args);
        this.previousStd.write(name + message + '\n');
        return this;
    };
    /**
     *
     * @param options
     */
    Logger.prototype.setSettings = function (options) {
        /* istanbul ignore else */
        if (options.noColors !== undefined) {
            this.setNoColors(options.noColors);
        }
        /* istanbul ignore else */
        if (options.printDate !== undefined) {
            this.setPrintDate(options.printDate);
        }
        /* istanbul ignore else */
        if (options.repporting !== undefined) {
            this.setRepporting(options.repporting);
        }
        /* istanbul ignore else */
        if (options.stdout !== undefined) {
            this.setStdout(options.stdout);
        }
        /* istanbul ignore else */
        if (options.stderr !== undefined) {
            this.setStderr(options.stderr);
        }
        return this;
    };
    /**
     *
     * @param print
     * @returns {Logger}
     */
    Logger.prototype.setPrintDate = function (print) {
        this.printDate = !!print;
        return this;
    };
    /**
     * Change error repporting.
     * @param options
     * @returns {Logger}
     */
    Logger.prototype.setRepporting = function (options) {
        for (var key in this.repporting) {
            if (options[key] !== undefined) {
                this.repporting[key] = !!options[key];
            }
        }
        return this;
    };
    /**
     *
     * @param name
     * @param data
     * @param args
     * @returns {string}
     */
    Logger.createMessage = function (data, args) {
        var message = '';
        if (typeof data == 'string') {
            if (data.indexOf('%j') > -1) {
                return ' ' + util.format.apply(util, [data + ' \n'].concat(args));
            }
            else {
                message += ' ' + data;
            }
        }
        else {
            args.unshift(data);
        }
        for (var i = 0; i < args.length; i++) {
            if (typeof args[i] == "object") {
                if (args[i] instanceof Error) {
                    message += ' ' + args[i].toString() + ' ' + args[i].stack.replace(args[i].toString(), '');
                }
                else {
                    message += ' ' + util.format('%j', args[i]) + '\n';
                }
            }
            else {
                message += ' ' + args[i];
            }
        }
        return message;
    };
    /**
     * Create stack trace  the lines of least Logger.
     * @returns {string}
     */
    Logger.createStack = function () {
        var stack = new Error().stack.replace('Error\n', '');
        var array = stack.split('\n');
        /* istanbul ignore else */
        if (array[0].indexOf("Logger.") > -1) {
            array.splice(0, 1);
        }
        /* istanbul ignore else */
        if (array[0].indexOf("Logger.") > -1) {
            array.splice(0, 1);
        }
        return array.join('\n');
    };
    /**
     *
     * @param title
     * @param color
     * @returns {any}
     */
    Logger.prototype.colorize = function (title, color) {
        return this.noColors ? title : colors[color](title);
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map