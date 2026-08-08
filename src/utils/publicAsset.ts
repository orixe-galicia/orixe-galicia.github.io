import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicDir = fileURLToPath(new URL("../../public", import.meta.url));

export function hasPublicAsset(assetPath: string | undefined) {
  if (!assetPath) {
    return false;
  }

  const normalizedPath = assetPath.replace(/^\/+/, "");
  return existsSync(path.join(publicDir, normalizedPath));
}
