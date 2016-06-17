
import WritableStream = NodeJS.WritableStream;

declare interface ILoggerRepporting {
    info?: boolean;
    debug?: boolean;
    trace?: boolean;
    error?: boolean;
    warn?: boolean;
}

declare interface ILoggerOptions {
    noColors?: boolean;
    printDate?: boolean;
    stderr?: WritableStream;
    stdout?: WritableStream;
    repporting?: ILoggerRepporting
}