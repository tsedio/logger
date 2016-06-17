export interface ILoggerOptions {
    noColors?: boolean;
    printDate?: boolean;
    stderr?: WritableStream;
    stdout?: WritableStream;
    repporting?: ILoggerRepporting
}