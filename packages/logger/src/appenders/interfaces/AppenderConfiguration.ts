import {BasicLayoutConfiguration} from "../../layouts/interfaces/BasicLayoutConfiguration";

export interface AppenderConfiguration {
  type: string;
  filename?: string;
  layout?: BasicLayoutConfiguration;
  maxLogSize?: number;
  pattern?: string;
  backups?: number;
  levels?: string[];

  [key: string]: any;
}

export type Partial<T> = {[P in keyof T]?: T[P]};

export type PartialAppenderConfiguration = Partial<AppenderConfiguration>;
