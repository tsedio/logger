/**
 * @module layouts
 */
/** */
import {LogEvent} from "../../core/LogEvent";

export type TokenHandler = (loggingEvent: LogEvent) => string

export interface IBasicLayoutConfiguration {
    type: string;
    pattern?: string;
    tokens?: {
        [key: string]: any | TokenHandler
    };
    [key: string]: any;
}