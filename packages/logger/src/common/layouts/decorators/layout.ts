import {LayoutsRegistry} from "../registries/LayoutsRegistry.js";

export function Layout(options: {name: string}) {
  return (target: any) => {
    target.$name = options.name;
    LayoutsRegistry.set(options.name, {provide: target});
  };
}
