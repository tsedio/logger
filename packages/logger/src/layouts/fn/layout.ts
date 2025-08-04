import {LayoutsRegistry} from "../registries/LayoutsRegistry.js";

export function layout(name: string, target: any) {
  target.$name = name;

  LayoutsRegistry.set(name, {provide: target});
}
