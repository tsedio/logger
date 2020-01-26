/**
 * ## Layouts
 *
 * Layouts are functions used by appenders to format log events for output. They take a log event as an argument and return a string. Log4js comes with several appenders built-in, and provides ways to create your own if these are not suitable.
 *
 * For most use cases you will not need to configure layouts - there are some appenders which do not need layouts defined (for example, logFaces-UDP); all the appenders that use layouts will have a sensible default defined.
 *
 * ### Configuration
 *
 * Most appender configuration will take a field called layout, which is an object - typically with a single field type which is the name of a layout defined below. Some layouts require extra configuration options, which should be included in the same object.
 *
 * ### Example
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *       type: "stdout", layout: {type: "basic"}, level: ["debug", "info", "trace"]
 *   });
 * ```
 * > This configuration replaces the stdout appender’s default colored layout with basic layout.
 *
 * ### Built-in Layouts
 * #### Basic
 *
 * * type - basic
 *
 * Basic layout will output the timestamp, level, category, followed by the formatted log event data.
 *
 * #### Example
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *       type: "stdout", layout: {type: "basic"}, level: ["debug", "info", "trace"]
 *   });
 * logger.debug('Log something');
 * ```
 *
 * This will output:
 *
 * ```bash
 * [2017-03-30 07:57:00.113] [DEBUG] [loggerName] - Log something
 *
 *
 * #### Colored
 *
 * - type - colored
 *
 * This layout is the same as basic, except that the timestamp, level and category will be colored according to the log event’s level (if your terminal/file supports it - if you see some weird characters in your output and no color then you should probably switch to basic). The colors used are:
 *
 * * TRACE - `blue`
 * * DEBUG - `cyan`
 * * INFO - `green`
 * * WARN - `yellow`
 * * ERROR - `red`
 * * FATAL - `magenta`
 *
 * #### Message Pass-Through
 *
 * * type - messagePassThrough
 *
 * This layout just formats the log event data, and does not output a timestamp, level or category. It is typically used in appenders that serialise the events using a specific format (e.g. gelf).
 *
 * #### Example
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *       type: "console", layout: {type: "messagePassThrough"}, level: ["debug", "info", "trace"]
 *   });
 * logger.debug('Log something');
 * ```
 *
 * This will output:
 *
 * ```bash
 * Log something
 * ```
 *
 * #### Dummy
 *
 * - type - dummy
 *
 * This layout only outputs the first value in the log event`s data.
 *
 * #### Example
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *       type: "console", layout: {type: "dummy"}, level: ["debug", "info", "trace"]
 *   });
 *
 * logger.debug('Cheese is too ripe! Cheese was: ', cheeseName);
 * ```
 *
 * This will output:
 *
 * ```bash
 * Cheese is too ripe! Cheese was:
 * ```
 *
 * #### Json
 *
 * - type - json
 * - seperator - string - char that separate each line
 *
 * #### Example
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 * .push({
 *      type: "console", layout: {type: "json", separator: ","}, level: ["debug", "info", "trace"]
 *  });
 *
 * logger.info('this is just a test');
 * logger.error('of a custom appender');
 * logger.warn('that outputs json');
 * ```
 * This example outputs the following:
 *
 * ```bash
 * {"startTime":"2017-06-05T22:23:08.479Z","categoryName":"json-test","data":["this is just a test"],"level":"INFO","context":{}},
 * {"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["of a custom appender"],"level":"ERROR","context":{}},
 * {"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["that outputs json"],"level""WARN","context":{}},
 * ```
 *
 * #### Pattern
 *
 * - type - pattern
 * - pattern - string - specifier for the output format, using placeholders as described below
 * - tokens - object (optional) - user-defined tokens to be used in the pattern
 *
 * #### Pattern format
 *
 * The pattern string can contain any characters, but sequences beginning with `%` will be replaced with values taken from the log event, and other environmental values. Format for specifiers is `%[padding].[truncation][field]{[format]} -` padding and truncation are optional, and format only applies to a few tokens (notably, date). e.g. `%5.10p -` left pad the log level by 5 characters, up to a max of 10
 *
 * Fields can be any of:
 *
 * * `%r` time in toLocaleTimeString format
 * * `%p` log level
 * * `%c` log category
 * * `%h` hostname
 * * `%m` log data
 * * `%d` date, formatted - default is `ISO8601`, format options are: `ISO8601`, `ISO8601_WITH_TZ_OFFSET`, `ABSOLUTE`, `DATE`, or any string compatible with the date-format library. e.g. `%d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}`
 * * `%% % -` for when you want a literal % in your output
 * * `%n` newline
 * * `%z` process id (from process.pid)
 * * `%x{<tokenname>}` add dynamic tokens to your log. Tokens are specified in the tokens parameter.
 * * `%X{<tokenname>}` add values from the Logger context. Tokens are keys into the context values.
 * * `%[` start a colored block (color will be taken from the log level, similar to coloredLayout)
 * * `%]` end a colored block
 *
 * #### Tokens
 *
 * User-defined tokens can be either a string or a function. Functions will be passed the log event, and should return a string. For example, you could define a custom token that outputs the log event's context value for `user` like so:
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *        type: "messagePassThrough",
 *        layout: {
 *            type: 'pattern',
 *            pattern: '%d %p %c %x{user} %m%n',
 *            tokens: {
 *                user: (logEvent) => AuthLibrary.currentUser()
 *            }
 *         },
 *         level: ["debug", "info", "trace"]
 *   });
 * logger.info('doing something.');
 * ```
 *
 * This would output:
 *
 * ```bash
 * 2017-06-01 08:32:56.283 INFO default charlie doing something.
 * ```
 *
 * You can also use the Logger context to store tokens (sometimes called Nested Diagnostic Context, or Mapped Diagnostic Context) and use them in your layouts.
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *        type: "messagePassThrough",
 *        layout: {
 *            type: 'pattern',
 *            pattern: '%d %p %c %X{user} %m%n',
 *         },
 *         level: ["debug", "info", "trace"]
 *   });
 * logger.addContext('user', 'charlie')
 * logger.info('doing something.');
 * ```
 *
 * This would output:
 * ```bash
 *  2017-06-01 08:32:56.283 INFO default charlie doing something.
 * ```
 *
 * > Note that you can also add functions to the Logger Context, and they will be passed the logEvent as well.
 *
 * #### Create your own layouts
 *
 * You can add your own layouts with `@Layout()` before pushing a configure to your logger.
 *
 * ```typescript
 * // customLayout.ts
 * import {BaseLayout, LogEvent, Layout} from "ts-log-debug";
 * import {formatLogData} from "ts-log-debug/lib/utils/inpectUtils";
 *
 * @ Layout({name: "customJson"})
 * export class JsonLayout extends BaseLayout {
 *   transform(loggingEvent: LogEvent, timezoneOffset?): string {
 *       const log = {
 *           startTime: loggingEvent.startTime,
 *           categoryName: loggingEvent.categoryName,
 *           level: loggingEvent.level.toString(),
 *           data: loggingEvent.data,
 *           context: loggingEvent.context
 *       };
 *
 *       log.data = log.data.map((data) => formatLogData([data]));
 *
 *       return JSON.stringify(log) + (this.config["separator"] || "");
 *   };
 * }
 * ```
 *
 * This layout can be use like this:
 *
 * ```typescript
 * import {Logger} from "ts-log-debug";
 * import "./customLayout.ts"
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders
 *   .push({
 *       type: "console", layout:{type: "customJson"}, level: ["debug", "info", "trace"]
 *   });
 * logger.info('this is just a test');
 * logger.error('of a custom appender');
 * logger.warn('that outputs json');
 * ```
 *
 * This example outputs the following:
 *
 * ```bash
 * {"startTime":"2017-06-05T22:23:08.479Z","categoryName":"json-test","data":["this is just a test"],"level":"INFO","context":{}},
 * {"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["of a custom appender"],"level":"ERROR","context":{}},
 * {"startTime":"2017-06-05T22:23:08.483Z","categoryName":"json-test","data":["that outputs json"],"level""WARN","context":{}},
 * ```
 *
 * @module layouts
 * @preferred
 */
/** */
export * from "./constants/logColors";
export * from "./class/Layouts";
export * from "./class/BaseLayout";
export * from "./interfaces/BasicLayoutConfiguration";
export * from "./decorators/layout";

import "./components/BasicLayout";
import "./components/ColoredLayout";
import "./components/DummyLayout";
import "./components/MessagePassThroughLayout";
import "./components/PatternLayout";
import "./components/JsonLayout";
