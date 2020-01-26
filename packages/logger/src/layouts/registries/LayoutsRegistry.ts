export interface ILayoutProvider {
  provide: any;
  instance?: any;
}

export const LayoutsRegistry: Map<string, ILayoutProvider> = new Map<string, ILayoutProvider>();
