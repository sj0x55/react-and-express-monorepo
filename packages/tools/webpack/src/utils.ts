import fs from 'fs';
import path from 'path';

export const resolvePath = (baseDir: string, paths: string[], checkIfExists = true) => {
  const baseRealPath = fs.realpathSync(baseDir);

  return (
    paths
      .map((relativePath) => path.resolve(baseRealPath, relativePath))
      .find((resolvedPath) => !checkIfExists || fs.existsSync(resolvedPath)) || null
  );
};
export const validatePaths = <T>(paths: T): string[] => {
  const mapCb = ([key, val]: [string, string | null]): string | null => (val === null ? key : null);

  return Object.entries(paths)
    .map(mapCb)
    .filter((val: string | null): val is string => typeof val === 'string' && !!val);
};
