import path from "path";
import fs from "fs";

import ts from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";

const pkgPath = path.resolve(__dirname, "../../packages"); // packages path
const distPath = path.resolve(__dirname, "../../dist/node_modules");

export function getPackagesJson(pkgName) {
  const pkgJsonPath = path.join(resolvePackage(pkgName), "package.json");

  const str = fs.readFileSync(pkgJsonPath, "utf-8");
  return JSON.parse(str);
}

export function resolvePackage(pkgName, isDist = false) {
  if (isDist) {
    return path.resolve(distPath, pkgName);
  }
  return path.resolve(pkgPath, pkgName);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)];
}
