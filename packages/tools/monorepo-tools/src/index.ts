import fs from 'fs';
import path from 'path';
import glob from 'glob';

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

function loadJsonFileSync(filePath: string) {
  const data = new TextDecoder().decode(fs.readFileSync(filePath));

  return JSON.parse(data);
}

const findPackages = (packageSpecs: string[], rootDir: string) =>
  packageSpecs.reduce((pkgDirs: string[], pkgGlob: string) => {
    const packages = glob.hasMagic(pkgGlob)
      ? glob
          .sync(pkgGlob, {
            cwd: rootDir,
            // absolute: true,
          })
          .filter((item) => fs.lstatSync(item).isDirectory())
      : [path.join(rootDir, pkgGlob)];

    return [...pkgDirs, ...packages];
  }, []);

export const getPackages = (rootDir: string) => {
  const lernaJsonPath = path.join(rootDir, 'lerna.json');
  const pkgJsonPath = path.join(rootDir, 'package.json');

  if (fs.existsSync(lernaJsonPath)) {
    const lernaJson = loadJsonFileSync(lernaJsonPath);

    if (!lernaJson.useWorkspaces) {
      return findPackages(lernaJson.packages, rootDir);
    }
  }

  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = loadJsonFileSync(pkgJsonPath);
    const workspaces = pkgJson.workspaces;

    if (workspaces) {
      if (Array.isArray(workspaces)) {
        return findPackages(workspaces, rootDir);
      } else if (Array.isArray(workspaces.packages)) {
        return findPackages(workspaces.packages, rootDir);
      }
    }
  }

  return [];
};
