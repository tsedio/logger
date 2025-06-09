import {readFileSync} from "node:fs";
import {basename, dirname, join} from "node:path";

import {globbySync} from "globby";

const root = join(import.meta.dirname, "../../..");

function deps(pkg, pkgs, set = new Set()) {
  Object.keys({
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {})
  }).forEach((name) => {
    if (pkgs.has(name)) {
      deps(pkgs.get(name).pkg, pkgs, set);
    }
  });
  set.add(pkg.name);
}

function findPackages() {
  const pkgs = globbySync(["packages/*/*/package.json", "!**/node_modules/**"], {
    cwd: root,
    absolute: true
  }).map((file) => ({
    path: file,
    name: basename(dirname(file)),
    pkg: JSON.parse(readFileSync(file, {encoding: "utf8"}))
  }));

  const pkgsMap = pkgs.reduce((map, data) => {
    map.set(data.pkg.name, data);
    return map;
  }, new Map());

  const set = new Set();

  pkgs.forEach(({pkg}) => {
    deps(pkg, pkgsMap, set);
  });

  return [...set.keys()].map((mod) => pkgsMap.get(mod));
}

const packages = findPackages();

export const alias = packages
  .filter((pkg) => pkg.path && pkg.pkg.main)
  .reduce((acc, pkg) => {
    return {
      ...acc,
      [pkg.pkg.name]: join(dirname(pkg.path), pkg.pkg.source)
    };
  }, {});
