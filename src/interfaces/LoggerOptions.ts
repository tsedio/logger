import WritableStream = NodeJS.WritableStream;

import {ILoggerRepporting} from "./LoggerRepporting";

export interface ILoggerOptions {
    noColors?: boolean;
    printDate?: boolean;
    stderr?: WritableStream;
    stdout?: WritableStream;
    repporting?: ILoggerRepporting
}