// scripts/fix-types.mjs
import fs from "fs/promises";

await fs.copyFile(
  "dist/argshellper/src/argsHelperV3.d.ts",
  "dist/argshellper/index.d.ts"
);

console.log("✔ types fixed");