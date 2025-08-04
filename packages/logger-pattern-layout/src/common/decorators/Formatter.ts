import {formatter} from "../fn/formatter.js";

/**
 * Decorator to register a formatter for a specific token.
 * This allows the formatter to be used in logging patterns.
 * @param token
 * @constructor
 */
export function Formatter(token: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    formatter(token, (...args: any[]) => new target().format(...args));
  };
}
