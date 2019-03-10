/**
 * @module appenders
 */
/** */
export interface IAppenderProvider {
  provide: any;
  instance?: any;
}

export const AppendersRegistry: Map<string, IAppenderProvider> = new Map<string, IAppenderProvider>();
