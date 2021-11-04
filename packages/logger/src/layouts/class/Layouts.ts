import {LayoutsRegistry} from "../registries/LayoutsRegistry";
import {BasicLayoutConfiguration} from "../interfaces/BasicLayoutConfiguration";
import {BaseLayout} from "./BaseLayout";

export class Layouts {
  static get(name: string | any, config: BasicLayoutConfiguration): BaseLayout {
    if (typeof name !== "string") {
      name = name.$name;
    }

    if (!LayoutsRegistry.has(name)) {
      name = "colored";
      console.warn(name + " layout doesn't exists");
    }

    const layoutKlass: any = LayoutsRegistry.get(name);

    return new layoutKlass.provide(config);
  }
}
