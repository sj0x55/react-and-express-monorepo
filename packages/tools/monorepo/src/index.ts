import fs from 'fs';
import path from 'path';

export const resolvePath = (baseDir: string | null, paths: string | string[], checkIfExists = true) => {
  if (baseDir) {
    const baseRealPath = fs.realpathSync(baseDir);

    return (
      [paths || []]
        .flat()
        .map((relativePath) => path.resolve(baseRealPath, relativePath))
        .find((resolvedPath) => !checkIfExists || fs.existsSync(resolvedPath)) || null
    );
  } else {
    return null;
  }
};
export const validatePaths = <T>(paths: T): string[] => {
  const mapCb = ([key, val]: [string, string | null]): string | null => (val === null ? key : null);

  return Object.entries(paths)
    .map(mapCb)
    .filter((val: string | null): val is string => typeof val === 'string' && !!val);
};

export const getAppPaths = (config: Record<string, string> = {}) => {
  const appDir = config.appDir || process.cwd();
  const publicPath = config.publicPath || '/public';
  const srcPath = resolvePath(appDir, ['src']);
  const outputPath = resolvePath(appDir, ['build']);
  const dotenvFilePath = resolvePath(appDir, ['.env']);
  const indexFilePath = resolvePath(srcPath, ['index.ts', 'index.tsx', 'index.js']);
  const staticPath = resolvePath(appDir, ['static'], false);

  return { appDir, publicPath, srcPath, outputPath, dotenvFilePath, indexFilePath, staticPath };
};

// export const getAppSrcPath = () => '/public';
// export const getAppDistPath = () => '/public';

// const paths: TPaths = {
//   publicPath: '/public',
//   srcPath: resolveAppPath(['src']),
//   outputPath: resolveAppPath(['build']),
//   outputIndexFile: resolveAppPath([`build/${indexFileName}`]),
//   dotenvFilePath: resolveAppPath(['.env']),
//   indexFilePath: resolveAppPath(['src/index.ts', 'src/index.tsx', 'src/index.js']),
//   templateFilePath: resolveAppPath([`public/${indexFileName}`]),
//   staticPath: resolveAppPath(['static'], false),
// };
