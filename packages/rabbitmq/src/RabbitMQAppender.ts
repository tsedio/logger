import {$log, Appender, BaseAppender, LogEvent} from "@tsed/logger";
import amqplib, {Connection} from "amqplib";

@Appender({name: "seq"})
export class RabbitMQAppender extends BaseAppender {
  private connection: Connection;
  private messagesToSend: any[] = [];
  private promisesWaiting: number = 0;
  private waitingToConnect: boolean = true;

  get options() {
    return {
      host: "127.0.0.1",
      port: 5672,
      username: "guest",
      password: "guest",
      exchange: "log",
      type: "direct",
      durable: false,
      routingKey: "logstash",
      vhost: "/",
      shutdownTimeout: 10000,
      locale: "en_US",
      ...this.config.options,
      protocol: "amqp",
      frameMax: 0,
      heartbeat: 0
    };
  }

  build() {
    if ($log.level !== "OFF") {
      amqplib
        .connect(this.options)
        .then((c) => {
          this.connection = c;
          this.waitingToConnect = false;
          // debug("Connected.");
          this.publish();
        })
        .catch((e) => {
          // debug("connect failed.");
          this.waitingToConnect = false;
          console.error(e);
        });
    }
  }

  write(loggingEvent: LogEvent) {
    if (loggingEvent.level.toString() !== "OFF") {
      this.publish(this.layout(loggingEvent, this.config.timezoneOffset));
    }
  }

  shutdown(): Promise<any> | void {
    if (this.connection) {
      return new Promise((resolve) => {
        this.waitForPromises(resolve);
      });
    }
  }

  protected waiting() {
    return this.waitingToConnect || this.promisesWaiting > 0 || this.messagesToSend.length > 0;
  }

  protected waitForPromises = (done: Function) => {
    let howLongWaiting = 0;

    const checker = async () => {
      this.publish();
      if (howLongWaiting >= this.options.shutdownTimeout) {
        await this.closeConnection();
        done();
        return;
      }
      if (this.waiting()) {
        howLongWaiting += 50;
        setTimeout(checker, 50);
      } else {
        await this.closeConnection();
        done();
      }
    };

    checker();
  };

  protected publish(message?: string) {
    if (message) {
      this.messagesToSend.push(message);
    }
    if (!this.waitingToConnect && this.connection && this.messagesToSend.length > 0) {
      this.send(this.messagesToSend);
    }
  }

  protected send(messages: string[]) {
    const {exchange, type, routingKey, durable} = this.options;
    const rn = this.connection.createChannel().then((ch) => {
      const ok = ch.assertExchange(exchange, type, {durable: durable});

      return ok.then(() => {
        messages.forEach((message) => {
          ch.publish(exchange, routingKey, Buffer.from(message));
        });
        messages.length = 0;
        return ch.close();
      });
    });

    this.promisesWaiting += 1;

    rn.then(() => {
      this.promisesWaiting -= 1;
    });
  }

  protected async closeConnection() {
    if (this.connection) {
      return this.connection.close();
    }
  }
}
