import {Appender, BaseAppender, BaseLayout, Layouts, LogEvent, MessagePassThroughLayout, PartialAppenderConfiguration} from "@tsed/logger";

const mailer = require("nodemailer");
const os = require("os");

function getTransportOptions(config: any) {
  let options: any = {};
  if (config.SMTP) {
    options = config.SMTP;
  } else if (config.transport) {
    options = config.transport.options || {};
    options.transport = config.transport.plugin || "smtp";
  }
  return options;
}

/**
 * SMTP Appender. Sends logging events using SMTP protocol.
 * It can either send an email on each event or group several
 * logging events gathered during specified interval.
 *
 * @param _config appender configuration data
 *    config.sendInterval time between log emails (in seconds), if 0
 *    then every event sends an email
 *    config.shutdownTimeout time to give up remaining emails (in seconds; defaults to 5).
 * @param _layout a function that takes a logevent and returns a string (defaults to basicLayout).
 */
@Appender({name: "smtp"})
export class SmtpAppender extends BaseAppender {
  private subjectLayout: BaseLayout;
  private sendInterval: any;
  private shutdownTimeout: any;
  private transport: any;
  private logEventBuffer: any[] = [];
  private unsentCount: number = 0;
  private sendTimer: any;

  configure(config: PartialAppenderConfiguration): this {
    super.configure(config);

    this.subjectLayout = Layouts.get(MessagePassThroughLayout, this.config);

    if (!this.config.attachment) {
      this.config.attachment = {};
    }

    this.config.attachment.enable = !!this.config.attachment.enable;
    this.config.attachment.message = this.config.attachment.message || "See logs as attachment";
    this.config.attachment.filename = this.config.attachment.filename || "default.log";

    this.sendInterval = this.config.sendInterval * 1000 || 0;
    this.shutdownTimeout = ("shutdownTimeout" in config ? config.shutdownTimeout : 5) * 1000;

    return this;
  }

  build() {
    this.transport = mailer.createTransport(getTransportOptions(this.config));
  }

  write(loggingEvent: LogEvent) {
    this.unsentCount += 1;
    this.logEventBuffer.push(loggingEvent);
    if (this.sendInterval > 0) {
      this.scheduleSend();
    } else {
      this.sendBuffer();
    }
  }

  shutdown(complete: any): any {
    const {sendTimer, unsentCount} = this;
    if (sendTimer) {
      clearTimeout(sendTimer);
    }

    this.sendBuffer();

    let timeout = this.shutdownTimeout;
    (function checkDone() {
      if (unsentCount > 0 && timeout >= 0) {
        timeout -= 100;
        setTimeout(checkDone, 100);
      } else {
        complete();
      }
    })();
  }

  protected sendBuffer() {
    const {config, logEventBuffer, layout, subjectLayout, transport} = this;

    if (logEventBuffer.length > 0) {
      const firstEvent = logEventBuffer[0];
      let body = "";
      const count = logEventBuffer.length;
      while (logEventBuffer.length > 0) {
        body += `${layout(logEventBuffer.shift(), config.timezoneOffset)}\n`;
      }

      const msg: any = {
        to: config.recipients,
        subject: config.subject || subjectLayout.transform(firstEvent),
        headers: {Hostname: os.hostname()},
        cc: config.cc,
        bcc: config.bcc
      };

      if (config.attachment.enable === true) {
        msg[config.html ? "html" : "text"] = config.attachment.message;
        msg.attachments = [
          {
            filename: config.attachment.filename,
            contentType: "text/x-log",
            content: body
          }
        ];
      } else {
        msg[config.html ? "html" : "text"] = body;
      }

      if (config.sender) {
        msg.from = config.sender;
      }
      transport.sendMail(msg, (error: any) => {
        if (error) {
          console.error("logger.smtpAppender - Error happened", error); // eslint-disable-line
        }
        transport.close();
        this.unsentCount -= count;
      });
    }
  }

  protected scheduleSend() {
    if (!this.sendTimer) {
      this.sendTimer = setTimeout(() => {
        this.sendTimer = null;
        this.sendBuffer();
      }, this.sendInterval);
    }
  }
}
