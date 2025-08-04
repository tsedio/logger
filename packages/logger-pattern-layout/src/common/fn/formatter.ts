import {formatterRegistry} from "../registries/formatterRegistry.js";
import type {FormatterHandler} from "../types/FormatterHandler.js";

export function formatter(token: string, fn: FormatterHandler): void {
  // Register the formatter function in the registry
  formatterRegistry.set(token, fn);
}
