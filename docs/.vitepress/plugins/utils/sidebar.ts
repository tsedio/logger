import {join} from "node:path";

import {mapApiReferences} from "@tsed/vitepress-theme/composables/api/mappers/mapApiReferences.js";
import type {ApiResponse, ApiSymbol} from "@tsed/vitepress-theme/composables/api/interfaces/Api.js";
import fsExtra from "fs-extra";

import api from "../../../public/api.json" with {type: "json"};

const {writeFile} = fsExtra;
const apiReferences = mapApiReferences(api) as ApiResponse;

export interface ApiSidebarOptions {
  coreModulePattern?: RegExp;
  coreModules?: string[];
}

interface SidebarItem {
  collapsed?: boolean;
  items?: SidebarItem[];
  link?: string;
  text: string;
}

export async function buildReferenceSidebar(docsRoot: string, options?: ApiSidebarOptions) {
  const sidebarPath = join(docsRoot, "public/reference-sidebar.json");
  await writeFile(sidebarPath, JSON.stringify(getSidebar(options), null, 2));
}

export function getSidebar({coreModulePattern, coreModules = []}: ApiSidebarOptions = {}) {
  const coreItems: SidebarItem[] = coreModules.map((text) => ({text}));
  const plugins: SidebarItem[] = [];

  Object.entries(apiReferences.modules).forEach(([module, {symbols}]) => {
    const item: SidebarItem = {
      text: module,
      collapsed: true,
      items: symbols.map((symbol: ApiSymbol) => {
        return {
          text: symbol.symbolName,
          link: symbol.path ?? ""
        };
      })
    };

    if (coreModulePattern?.test(module)) {
      coreItems.push(item);
    } else {
      plugins.push(item);
    }
  });

  return [
    {
      text: "Core",
      items: coreItems.sort((a, b) => a.text.localeCompare(b.text))
    },
    {
      text: "Plugins",
      items: plugins.sort((a, b) => a.text.localeCompare(b.text))
    }
  ];
}

export function getApiReferenceLinks() {
  return Object.entries(apiReferences.modules)
    .sort(([moduleA], [moduleB]) => moduleA.localeCompare(moduleB))
    .map(([module, {symbols}]) => {
      const links = symbols
        .filter((symbol: ApiSymbol) => symbol.path)
        .sort((symbolA: ApiSymbol, symbolB: ApiSymbol) => symbolA.symbolName.localeCompare(symbolB.symbolName))
        .map((symbol: ApiSymbol) => `- [${symbol.symbolName}](${symbol.path}.md)`)
        .join("\n");

      return `## ${module}\n\n${links}`;
    })
    .join("\n\n");
}
