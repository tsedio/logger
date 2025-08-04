import {BasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration.js";
import {LayoutsRegistry} from "../registries/LayoutsRegistry.js";
import {BaseLayout} from "./BaseLayout.js";

export class Layouts {
  static get(name: string | any, config: BasicLayoutConfiguration): BaseLayout {
    if (typeof name !== "string") {
      name = name.$name;
    }

    if (!LayoutsRegistry.has(name)) {
      name = "colored";
      console.trace(name + " layout doesn't exists");
    }

    const layoutKlass: any = LayoutsRegistry.get(name);
    if (!layoutKlass) {
      throw new Error(`Layout "${name}" not found in LayoutsRegistry. Supported layouts: ${Array.from(LayoutsRegistry.keys()).join(", ")}`);
    }

    return new layoutKlass.provide(config);
  }
}
