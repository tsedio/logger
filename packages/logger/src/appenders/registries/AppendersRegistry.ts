export interface AppenderProvider {
  provide: any;
  instance?: any;
  defaultLayout?: string;
}

export const AppendersRegistry: Map<string | any, AppenderProvider> = new Map<string, AppenderProvider>();
