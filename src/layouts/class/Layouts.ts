/**
 * @module layouts
 */
/** */
import {LayoutsRegistry} from "../registries/LayoutsRegistry";
import {IBasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration";

export class Layouts {
  static get(name: string, config: IBasicLayoutConfiguration) {
    name = name.replace(/layout/gi, "");

    if (!LayoutsRegistry.has(name)) {
      name = "colored";
      console.warn(name + " layout doesn't exists");
    }

    const layoutKlass: any = LayoutsRegistry.get(name.replace(/layout/gi, ""));

    return new layoutKlass.provide(config);
  }
}
