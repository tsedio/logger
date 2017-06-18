/**
 * @module layouts
 */
/** */
import {LayoutsRegistry} from "../registries/LayoutsRegistry";
export function Layout(options: { name: string }) {
    return (target) => {
        LayoutsRegistry.set(options.name, {provide: target});
    };
}