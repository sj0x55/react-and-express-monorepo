import fs from 'fs';
import path from 'path';

export const resolveExistsPath = (baseDir: string | null, paths: string | string[]) => {
  try {
    if (baseDir) {
      const getRelativePath = getExistingPath(baseDir);

      return (
        [paths || []]
          .flat()
          .map((relativePath) => getRelativePath(relativePath))
          .find(Boolean) || null
      );
    }
  } catch (err) {
    console.log(err);
  }

  return null;
};

export const getSrcPath = (baseDir: string | null = null) => {
  return path.join(baseDir || process.cwd(), 'src');
};

export const getStandardPackagePaths = (baseDir: string | null = null) => {
  baseDir = baseDir || process.cwd();

  const srcPath = getSrcPath(baseDir);
  const outputPath = path.join(baseDir, 'build');
  const staticPath = path.join(baseDir, 'static');
  const publicPath = path.join(baseDir, 'public');

  return { srcPath, outputPath, publicPath, staticPath };
};

export const getStandardPackageFiles = (baseDir: string | null = null) => {
  baseDir = baseDir || process.cwd();

  const dotenvFilePath = resolveExistsPath(baseDir, '.env');
  const indexFilePath = resolveExistsPath(getSrcPath(baseDir), ['index.ts', 'index.tsx', 'index.js']);

  return { indexFilePath, dotenvFilePath };
};

export const getPath = (baseDir: string) => (relativePath: string) => path.resolve(baseDir, relativePath);
export const getExistingPath = (baseDir: string) => (relativePath: string) => {
  const existingPath = getPath(baseDir)(relativePath);

  return fs.existsSync(existingPath) ? existingPath : null;
};

export const checkExistingPaths = (paths: Record<string, string | null>) => {
  Object.entries(paths).forEach(([key, value]) => {
    paths[key] = value && fs.existsSync(value) ? value : null;
  });

  return paths;
};
