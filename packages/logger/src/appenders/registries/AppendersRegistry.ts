export interface AppenderProvider {
  provide: any;
  instance?: any;
}

export const AppendersRegistry: Map<string, AppenderProvider> = new Map<string, AppenderProvider>();
