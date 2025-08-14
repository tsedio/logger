import {BasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration.js";
import {LayoutsRegistry} from "../registries/LayoutsRegistry.js";
import {BaseLayout} from "./BaseLayout.js";

function ucfirst(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export class Layouts {
  static get(name: string | any, config: BasicLayoutConfiguration): BaseLayout {
    if (typeof name !== "string") {
      name = name.$name;
    }

    if (!LayoutsRegistry.has(name)) {
      console.warn("Missing " + name + " layout doesn't exists.");

      if (name === "pattern") {
        console.warn(
          `Have you installed the @tsed/logger-pattern-layout package? If not, you can install it using the command: npm install @tsed/logger-pattern-layout`
        );
      } else {
        console.warn(`Have you imported the @tsed/logger/layouts/${ucfirst(name)}Layout module in your code?`);
      }

      name = "colored";
    }

    const layoutKlass: any = LayoutsRegistry.get(name);
    if (!layoutKlass) {
      throw new Error(`Layout "${name}" not found in LayoutsRegistry. Supported layouts: ${Array.from(LayoutsRegistry.keys()).join(", ")}`);
    }

    return new layoutKlass.provide(config);
  }
}
