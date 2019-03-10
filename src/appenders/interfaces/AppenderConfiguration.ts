/**
 * @module appenders
 */
/** */
import {IBasicLayoutConfiguration} from "../../layouts/interfaces/BasicLayoutConfiguration";

export interface IAppenderConfiguration {
  type: string;
  filename?: string;
  layout?: IBasicLayoutConfiguration;
  maxLogSize?: number;
  backups?: number;
  levels?: string[];

  [key: string]: any;
}

export type Partial<T> = {[P in keyof T]?: T[P]};

export type PartialAppenderConfiguration = Partial<IAppenderConfiguration>;
