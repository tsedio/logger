import {LOG_COLORS} from "./LogColors";
import {ILoggerOptions} from "./interfaces/LoggerOptions";
import {ILoggerRepporting} from "./interfaces/LoggerRepporting";
import WritableStream = NodeJS.WritableStream;

const util = require('util');
const colors = require('colors/safe');

export class Logger {
    /**
     * noColors
     * @type {boolean}
     */
    private noColors: boolean = false;
    /**
     * printDate
     * @type {boolean}
     */
    private printDate: boolean = false;
    /**
     *
     */
    private stderr: WritableStream;
    /**
     *
     */
    private stdout: WritableStream;
    /**
     *
     */
    private previousStd: WritableStream;
    /**
     *
     */
    private previousTypeTrace: string;
    /**
     *
     * @type {boolean}
     */
    private logEnable: boolean = true;
    /**
     *
     * @type {{info: boolean, debug: boolean, trace: boolean, error: boolean, warn: boolean}}
     */
    private repporting: ILoggerRepporting = {
        info: true,
        debug: true,
        trace: true,
        error: true,
        warn: true,
    };

    /**
     *
     * @param options
     * @param stderr
     * @param noColors
     */
    constructor(options?: WritableStream | ILoggerOptions, stderr?: WritableStream, noColors?: boolean){

        this.setStderr(stderr || process.stderr);
        this.setStdout(process.stdout);

        if (typeof options === "object") {

            if (typeof (<any>options).write === "function") {
                let stdout: WritableStream = <WritableStream> options;
                this.setStdout(stdout);
            } else {
                this.setSettings(<ILoggerOptions> options);
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
    public debug(data, ...args): Logger {
        //if(!this.repporting.debug) return this;

        return this.write(this.stdout, 'DEBUG', data, args);
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public info(data, ...args): Logger {
        //if(!this.repporting.info) return this;

        return this.write(this.stdout, 'INFO', data, args);
    }

    /**
     *
     * @param args
     * @returns {any}
     */
    public warn(data, ...args): Logger {
        //if(!this.repporting.warn) return this;

        return this.write(this.stderr, 'WARN', data, args);
    }

    /**
     * Prints to stderr with newline. Multiple arguments can be passed, with the first used as the primary
     * message and all additional used as substitution values similar to printf() (the arguments are all
     * passed to util.format()).
     * @param args
     * @returns {any}
     */
    public error(data, ...args): Logger {
        //if(!this.repporting.error) return this;

        return this.write(this.stderr, "ERROR", data, args);
    }

    /**
     *
     * @param data
     * @param args
     * @returns {any}
     */
    public trace(data, ...args): Logger {
        //if(!this.repporting.trace) return this;

        var stack = '\n' + this.colorize(Logger.createStack(), LOG_COLORS.TRACE) + "\n";

        args.push(stack); //push StackTrace

        return this.write(this.stderr, "TRACE", data, args);
    }

    /**
     *
     * @returns {Logger}
     */
    public withTrace(): Logger {
        if(!this.logEnable) return this;
        if(this.repporting[this.previousTypeTrace] === false) return this;

        this.previousStd.write(this.colorize(Logger.createStack(), "gray") + '\n\n');

        return this;
    }

    /**
     *
     * @returns {Logger}
     */
    public withLine(): Logger {
        if (!this.logEnable) return this;
        if (this.repporting[this.previousTypeTrace] === false) return this;

        var stackTrace = Logger.createStack();
        var stackLine = stackTrace.split('\n')[0];

        /* istanbul ignore else */
        if(stackLine.indexOf('(') > -1){
            var line = '\tat (' + stackTrace.split('\n')[0].split('(')[1];
        } else {
            line = stackLine;
        }

        this.previousStd.write((this.colorize(line, "gray") || line) + '\n\n');

        return this;
    }
    /**
     *
     */
    public start(): Logger {
        this.logEnable = true;
        return this;
    }

    /**
     *
     */
    public stop(): Logger {
        this.logEnable = false;
        return this;
    }

    /**
     *
     * @param value
     * @returns {Logger}
     */
    public setNoColors(value: boolean): Logger {
        this.noColors = value;
        return this;
    }

    /**
     *
     * @param std
     * @returns {Logger}
     */
    public setStdout(std: WritableStream): Logger {
        this.stdout = std;
        return this;
    }

    /**
     *
     * @param std
     * @returns {Logger}
     */
    public setStderr(std: WritableStream):Logger{
        this.stderr = std;
        return this;
    }

    /**
     *
     * @param std
     * @param name
     * @param data
     * @param args
     * @returns {Logger}
     */
    private write(std: WritableStream, name: string, data: any, args: any[]): Logger {

        this.previousTypeTrace = name.toLocaleLowerCase();
        this.previousStd = std;

        if (this.logEnable === false) return this;
        if (this.repporting[this.previousTypeTrace] === false) return this;

        let date: string = '';

        if (this.printDate) {
            let currentDate: Date = new Date();
            let year: number = currentDate.getFullYear();
            let month: string = ('0' + (currentDate.getMonth()+1)).slice(-2);
            let day: string = ('0' + (currentDate.getDate())).slice(-2);
            let hours: string = ('0' + (currentDate.getHours())).slice(-2);
            let minutes: string = ('0' + (currentDate.getMinutes())).slice(-2);
            let seconds: string = ('0' + (currentDate.getSeconds())).slice(-2);

            date = `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}]`;

        }

        name = this.colorize(date + '['+ (name + ' ').slice(0, 5) +']', LOG_COLORS[name]);

        var message = Logger.createMessage(data, args);

        this.previousStd.write(name + message + '\n');

        return this;
    }

    /**
     *
     * @param options
     */
    public setSettings(options: ILoggerOptions): Logger {

        /* istanbul ignore else */
        if (options.noColors !== undefined) {
            this.setNoColors(options.noColors);
        }

        /* istanbul ignore else */
        if (options.printDate !== undefined){
            this.setPrintDate(options.printDate);
        }

        /* istanbul ignore else */
        if (options.repporting !== undefined) {
            this.setRepporting(options.repporting);
        }

        /* istanbul ignore else */
        if (options.stdout !== undefined){
            this.setStdout(options.stdout);
        }

        /* istanbul ignore else */
        if (options.stderr !== undefined){
            this.setStderr(options.stderr);
        }

        return this;

    }

    /**
     *
     * @param print
     * @returns {Logger}
     */
    public setPrintDate(print: boolean): Logger {

        this.printDate = !!print;

        return this;
    }

    /**
     * Change error repporting.
     * @param options
     * @returns {Logger}
     */
    public setRepporting(options: ILoggerRepporting): Logger {

        for(let key in this.repporting) {
            if(options[key] !== undefined) {
                this.repporting[key] = !!options[key];
            }
        }

        return this;
    }
    /**
     *
     * @param name
     * @param data
     * @param args
     * @returns {string}
     */
    private static createMessage(data:any, args:any[]):string{

        var message = '';

        if(typeof data == 'string'){
            if(data.indexOf('%j') >-1){
                return ' ' + util.format.apply(util, [data + ' \n'].concat(args));
            }else{
                message += ' ' + data;
            }
        }else{
            args.unshift(data);
        }

        for(var i = 0; i < args.length; i++) {

            if(typeof args[i] == "object"){
                if(args[i] instanceof Error){
                    message += ' ' + args[i].toString() + ' ' + args[i].stack.replace(args[i].toString(), '');
                }else{
                    message += ' ' + util.format('%j', args[i]) + '\n';
                }
            }else {
                message += ' ' + args[i];
            }
        }


        return message;
    }

    /**
     * Create stack trace  the lines of least Logger.
     * @returns {string}
     */
    public static createStack(): string {
        var stack:string = new Error().stack.replace('Error\n','');
        var array:string[] = stack.split('\n');

        /* istanbul ignore else */
        if(array[0].indexOf("Logger.") > -1){ //remove current function
            array.splice(0, 1);
        }

        /* istanbul ignore else */
        if(array[0].indexOf("Logger.") > -1){ //remove caller
            array.splice(0, 1);
        }

        return array.join('\n');
    }

    /**
     *
     * @param title
     * @param color
     * @returns {any}
     */
    private colorize(title, color){
        return this.noColors ? title : colors[color](title);
    }
}