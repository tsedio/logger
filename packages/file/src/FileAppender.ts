import {Appender, BaseAppender, LogEvent} from "@tsed/logger";
import {normalize} from "path";
import * as Os from "os";
// @ts-ignore
import * as streams from "streamroller";

const eol = Os.EOL || "\n";

/**
 * ## File Appender
 *
 * The file appender writes log events to a file. It supports an optional maximum file size, and will keep a configurable number of backups. When using the file appender, you should also call `logger.shutdown()` when your application terminates, to ensure that any remaining asynchronous writes have finished. Although the file appender uses the streamroller library, this is included as a dependency of ts-log-debug so you do not need to include it yourself.
 *
 * ## Configuration
 *
 * * type - "file"
 * * filename - string - the path of the file where you want your logs written.
 * * maxLogSize - integer (optional) - the maximum size (in bytes) for the log file. If not specified, then no log rolling will happen.
 * * backups - integer (optional, default value = 5) - the number of old log files to keep during log rolling.
 * * layout - (optional, defaults to basic layout) - see layouts
 *
 * Any other configuration parameters will be passed to the underlying streamroller implementation (see also node.js core file streams):
 *
 * * encoding - string (default “utf-8”)
 * * mode - integer (default 0644)
 * * flags - string (default ‘a’)
 * * compress - boolean (default false) - compress the backup files during rolling (backup files will have .gz extension)
 *
 * ## Example
 *
 * ```typescript
 * import {Logger} from "@tsed/logger";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders.set("log-file", {
 *     type: "file",
 *     filename: "all-the-logs.log"
 * });
 * logger.debug('I will be logged in all-the-logs.log');
 * ```
 * > This example will result in a single log file (all-the-logs.log) containing the log messages.
 *
 * ## Example with log rolling (and compressed backups)
 *
 * ```typescript
 * import {Logger} from "@tsed/logger";
 *
 * const logger = new Logger("loggerName");
 *
 * logger.appenders.set("log-file2", {
 *     type: "file",
 *     filename: "all-the-logs.log",
 *     maxLogSize: 10485760,
 *     backups: 3,
 *     compress: true
 * });
 * logger.debug('I will be logged in all-the-logs.log');
 * ```
 *
 * :::
 * This will result in one current log file (all-the-logs.log). When that reaches 10Mb in size, it will be renamed and compressed to all-the-logs.log.1.gz and a new file opened called all-the-logs.log. When all-the-logs.log reaches 10Mb again, then all-the-logs.log.1.gz will be renamed to all-the-logs.log.2.gz, and so on.
 * :::
 *
 * ## Example with date rolling
 *
 * ```typescript
 * import { Logger } from "@tsed/logger";
 * export const logger = new Logger("Log Example");
 *
 * logger.appenders
 * .set('file', {
 *   type: 'file',
 *   filename: `${__dirname}/../logs/myfile.log`,
 *   pattern: '.yyyy-MM-dd'
 * });
 * ```
 *
 */
@Appender({name: "file", defaultLayout: "basic"})
export class FileAppender extends BaseAppender {
  private writer: any;
  private listener: any;

  /**
   *
   */
  public reopen() {
    return this.shutdown().then(() => {
      this.build();
    });
  }

  /**
   *
   */
  public shutdown(): Promise<any> {
    process.removeListener("SIGHUP", this.listener);

    return new Promise((resolve, reject) => {
      this.writer.write("", "utf-8", () => {
        this.writer.end(resolve);
      });
    });
  }

  /**
   *
   * @param loggingEvent
   */
  public write(loggingEvent: LogEvent) {
    this.writer.write(this.layout(loggingEvent, this.config.timezoneOffset) + eol, "utf8");
  }

  private build() {
    let {filename: file, maxLogSize: logSize, backups: numBackups, pattern} = this.config;

    file = normalize(file!);
    numBackups = numBackups === undefined ? 5 : numBackups;
    // there has to be at least one backup if logSize has been specified
    numBackups = numBackups === 0 ? 1 : numBackups;

    this.writer = this.openTheStream(file, logSize, numBackups, pattern, this.config);
    // On SIGHUP, close and reopen all files. This allows this appender to work with
    // logrotate. Note that if you are using logrotate, you should not set
    // `logSize`.
    this.listener = () => this.reopen();

    process.on("SIGHUP", this.listener);
  }

  /**
   *
   * @param file
   * @param fileSize
   * @param numFiles
   * @param pattern
   * @param options
   * @returns {streams.RollingFileStream}
   */
  private openTheStream(file: string, fileSize: number | undefined, numFiles: number, pattern: string | undefined, options: any) {
    let stream = null;
    if (pattern) {
      stream = new streams.DateRollingFileStream(file, pattern, options);
    } else {
      stream = new streams.RollingFileStream(file, fileSize, numFiles, options);
    }
    stream.on("error", (err: any) => {
      console.error("FileAppender - Writing to file %s, error happened ", file, err);
    });
    return stream;
  }
}
