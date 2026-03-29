import fs from "fs/promises";
import path from "path";

const folders = [
  "hellpers",
  "argshellper",
  "cevapbekle",
  "zgraupner",
  "nextanother"
];

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

for (const folder of folders) {
  await copyDir(folder, path.join("dist", folder));
}

console.log("✔ files copied to dist");