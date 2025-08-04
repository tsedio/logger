import {BasicLayoutConfiguration} from "../../layouts/interfaces/BasicLayoutConfiguration.js";

export interface AppenderConfiguration<Opts = any> {
  type: string;
  filename?: string;
  layout?: BasicLayoutConfiguration;
  maxLogSize?: number;
  pattern?: string;
  backups?: number;
  levels?: string[];
  options: Opts;

  [key: string]: any;
}

export type PartialAppenderConfiguration<Opts = any> = Partial<AppenderConfiguration<Opts>>;
