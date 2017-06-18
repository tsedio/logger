/**
 * @module layouts
 */
/** */
export interface IReplacers {
    "c"(loggingEvent?, specifier?): string;
    "d"(loggingEvent?, specifier?): string;
    "h"(loggingEvent?, specifier?): string;
    "m"(loggingEvent?, specifier?): string;
    "n"(loggingEvent?, specifier?): string;
    "p"(loggingEvent?, specifier?): string;
    "r"(loggingEvent?, specifier?): string;
    "["(loggingEvent?, specifier?): string;
    "]"(loggingEvent?, specifier?): string;
    "y"(loggingEvent?, specifier?): string;
    "z"(loggingEvent?, specifier?): string;
    "%"(loggingEvent?, specifier?): string;
    "x"(loggingEvent?, specifier?): string;
}