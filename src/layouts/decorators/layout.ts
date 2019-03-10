import {LayoutsRegistry} from "../registries/LayoutsRegistry";

export function Layout(options: {name: string}) {
  return (target: any) => {
    LayoutsRegistry.set(options.name, {provide: target});
  };
}
