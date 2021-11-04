export interface LayoutProvider {
  provide: any;
  instance?: any;
}

export const LayoutsRegistry: Map<string, LayoutProvider> = new Map<string, LayoutProvider>();
