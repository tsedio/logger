import {mapApiReferences} from "@tsed/vitepress-theme/composables/api/mappers/mapApiReferences.js";
import api from "../public/api.json";

const IS_CORES = /@tsed\/logger$/;

export function getSidebar() {
  const coreModules = [];
  const thirdParties = [];

  Object.entries(mapApiReferences(api).modules)
    .forEach(([module, {symbols}]) => {
      const item = {
        text: module,
        collapsed: true,
        items: symbols.map((symbol) => {
          return {
            text: symbol.symbolName,
            link: symbol.path
          };
        })
      };


      if (IS_CORES.test(module)) {
        coreModules.push(item);
      } else {
        thirdParties.push(item);
      }
    });

  return [
    {
      text: "Core",
      items: coreModules.sort((a, b) => a.text.localeCompare(b.text))
    },
    {
      text: "Third parties",
      items: thirdParties.sort((a, b) => a.text.localeCompare(b.text))
    }
  ];
}

