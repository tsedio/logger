
require('source-map-support').install();

import {Logger} from "./lib/Logger";
import {ILoggerOptions} from "./interfaces/LoggerOptions";
import {ILoggerRepporting} from "./interfaces/LoggerRepporting";
import {LOG_COLORS} from "./lib/LogColors";


let $log: Logger = new Logger();

export default {
    $log
};

export {$log, Logger, ILoggerOptions, ILoggerRepporting, LOG_COLORS};

